import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(".");
const ignored = new Set([".git", "node_modules"]);
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function localTargetExists(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:)/.test(clean)) return true;
  const target = clean.startsWith("/") ? clean.slice(1) : clean;
  if (!target) return existsSync(join(root, "index.html"));
  return (
    existsSync(join(root, target)) ||
    existsSync(join(root, target, "index.html")) ||
    existsSync(join(root, `${target}.html`))
  );
}

for (const file of walk(root).filter((path) => extname(path) === ".html")) {
  const html = readFileSync(file, "utf8");
  const label = relative(root, file);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${label}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${label}: missing meta description`);
  if (label !== "404.html" && !/<link rel="canonical" href="https:\/\/internetostrava\.cz\//.test(html)) {
    errors.push(`${label}: missing internetostrava.cz canonical`);
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${label}: expected exactly one h1`);
  if (/\bTODO\b|\bPLACEHOLDER_COPY\b/i.test(html)) errors.push(`${label}: contains unfinished copy`);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    if (!localTargetExists(match[1])) errors.push(`${label}: broken local href ${match[1]}`);
  }
}

for (const required of ["index.html", "robots.txt", "sitemap.xml", "assets/styles.css", "assets/main.js"]) {
  if (!existsSync(join(root, required))) errors.push(`missing required file: ${required}`);
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const [, loc] of sitemap.matchAll(/<loc>https:\/\/internetostrava\.cz\/([^<]*)<\/loc>/g)) {
  if (!localTargetExists(`/${loc}`)) errors.push(`sitemap points to missing route: /${loc}`);
}

if (errors.length) {
  console.error(`Site check failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Site check passed: metadata, internal links, required files, and sitemap routes look good.");
