const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL || "terc@obchod.poda.cz";
const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "InternetOstrava.cz <leady@internetostrava.cz>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const N8N_LEAD_WEBHOOK = process.env.N8N_LEAD_WEBHOOK;
const N8N_LEAD_TOKEN = process.env.N8N_LEAD_TOKEN;

function cleanText(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidPhone(value) {
  return /^[+\d][\d\s().-]{6,24}$/.test(value);
}

function escapeHtml(value) {
  return cleanText(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function buildEmailHtml(lead) {
  const row = (label, value) => `<tr><th align="left" style="padding:6px 10px;background:#f2f4f7">${label}</th><td style="padding:6px 10px">${escapeHtml(value) || "-"}</td></tr>`;
  return `
    <h2>Novy lead z InternetOstrava.cz</h2>
    <table cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${row("Typ", lead.type === "callback" ? "Zpetne zavolani" : lead.type === "order" ? "Nezavazna objednavka" : "Overeni dostupnosti")}
      ${row("Tarif", lead.tarif)}
      ${row("Adresa", lead.address)}
      ${row("Telefon", lead.phone)}
      ${row("E-mail", lead.email)}
      ${row("Poznamka", lead.note)}
      ${row("Stranka", lead.sourcePage)}
      ${row("UTM source", lead.utmSource)}
      ${row("UTM medium", lead.utmMedium)}
      ${row("UTM campaign", lead.utmCampaign)}
      ${row("Cas", lead.createdAt)}
    </table>
  `;
}

async function sendResendEmail(lead) {
  if (!RESEND_API_KEY) return { configured: false };

  const subject = lead.type === "callback"
    ? `Zpetne zavolani: ${lead.phone || "novy kontakt"}`
    : lead.type === "order"
    ? `Nezavazna objednavka: ${lead.tarif || lead.address || "novy lead"}`
    : `Overeni internetu: ${lead.address || "nova adresa"}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL,
      to: [LEAD_TO_EMAIL],
      reply_to: lead.email || undefined,
      subject,
      html: buildEmailHtml(lead)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${response.status} ${errorText}`);
  }

  return { configured: true };
}

async function forwardLeadToN8n(lead) {
  if (!N8N_LEAD_WEBHOOK || !N8N_LEAD_TOKEN) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  const leadLabel = lead.type === "callback"
    ? "Zpětné volání"
    : lead.type === "order"
    ? "Nezávazná objednávka"
    : "Ověření dostupnosti";
  const message = [
    lead.tarif ? `Tarif: ${lead.tarif}` : "",
    lead.note,
    lead.utmSource ? `UTM source: ${lead.utmSource}` : "",
    lead.utmMedium ? `UTM medium: ${lead.utmMedium}` : "",
    lead.utmCampaign ? `UTM campaign: ${lead.utmCampaign}` : ""
  ].filter(Boolean).join("\n");
  const sourcePath = lead.sourcePage
    ? `/${lead.sourcePage.replace(/^\/+/, "")}`
    : "";

  try {
    const response = await fetch(N8N_LEAD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lead-Token": N8N_LEAD_TOKEN
      },
      body: JSON.stringify({
        source: "internetostrava.cz",
        name: `${leadLabel} – ${lead.phone}`,
        email: lead.email || null,
        phone: lead.phone,
        address: lead.address,
        message,
        pageUrl: `https://internetostrava.cz${sourcePath}`,
        website: ""
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`n8n returned ${response.status}`);
    }
  } catch (error) {
    console.warn("[leads] n8n forwarding failed (ignored):", error instanceof Error ? error.message : "unknown error");
  } finally {
    clearTimeout(timeout);
  }
}

function parsePayload(body) {
  if (!body) return {};
  if (Buffer.isBuffer(body)) return JSON.parse(body.toString("utf8") || "{}");
  if (typeof body === "string") return JSON.parse(body || "{}");
  return body;
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    let payload;
    try {
      payload = parsePayload(request.body);
    } catch (error) {
      return response.status(400).json({ ok: false, error: "invalid_json" });
    }

    if (cleanText(payload.website, 200)) {
      return response.status(200).json({ ok: true, ignored: true });
    }

    const lead = {
      type: cleanText(payload.lead_type || payload.type, 40) || "availability",
      tarif: cleanText(payload.tarif, 160),
      address: cleanText(payload.adresa || payload.address, 220),
      phone: cleanText(payload.telefon || payload.phone, 80),
      email: cleanText(payload.email, 160),
      note: cleanText(payload.poznamka || payload.note, 1000),
      sourcePage: cleanText(payload.source_page, 300),
      utmSource: cleanText(payload.utm_source, 120),
      utmMedium: cleanText(payload.utm_medium, 120),
      utmCampaign: cleanText(payload.utm_campaign, 160),
      createdAt: new Date().toISOString()
    };

    const callbackLead = lead.type === "callback";
    if (!lead.phone || !isValidPhone(lead.phone) || (!callbackLead && !lead.address)) {
      return response.status(400).json({ ok: false, error: "invalid_required_fields" });
    }

    const [mailResult] = await Promise.allSettled([
      sendResendEmail(lead),
      forwardLeadToN8n(lead)
    ]);

    if (mailResult.status === "rejected") {
      console.error(mailResult.reason);
      return response.status(202).json({ ok: true, configured: false, fallback: "mailto", delivery: "resend_failed" });
    }

    const mail = mailResult.value;
    if (!mail.configured) {
      return response.status(202).json({ ok: true, configured: false, fallback: "mailto" });
    }

    return response.status(200).json({ ok: true, configured: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ ok: false, error: "lead_submit_failed" });
  }
};
