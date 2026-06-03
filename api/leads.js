const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL || "terc@poda.cz";
const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "InternetOstrava.cz <leady@internetostrava.cz>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
      subject: `Overeni internetu: ${lead.address || "nova adresa"}`,
      html: buildEmailHtml(lead)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${response.status} ${errorText}`);
  }

  return { configured: true };
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

    if (!lead.address || !lead.phone || !isValidPhone(lead.phone)) {
      return response.status(400).json({ ok: false, error: "invalid_required_fields" });
    }

    let mail;
    try {
      mail = await sendResendEmail(lead);
    } catch (error) {
      console.error(error);
      return response.status(202).json({ ok: true, configured: false, fallback: "mailto", delivery: "resend_failed" });
    }

    if (!mail.configured) {
      return response.status(202).json({ ok: true, configured: false, fallback: "mailto" });
    }

    return response.status(200).json({ ok: true, configured: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ ok: false, error: "lead_submit_failed" });
  }
};
