const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);
const SKIP_TEXT_TAGS = new Set(["script", "style", "noscript", "template"]);

function padId(prefix, value) {
  return `${prefix}${String(value).padStart(4, "0")}`;
}

export function decodeEntities(value) {
  const named = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
    ndash: "–", mdash: "—", hellip: "…", laquo: "«", raquo: "»",
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (full, entity) => {
    if (entity[0] === "#") {
      const hex = entity[1]?.toLowerCase() === "x";
      const number = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : full;
    }
    return named[entity.toLowerCase()] ?? full;
  });
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function attributesFromTag(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<")) continue;
    attributes[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function setAttribute(tag, name, value) {
  const escaped = escapeAttribute(value);
  const pattern = new RegExp(`\\s${name}\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, "i");
  if (pattern.test(tag)) return tag.replace(pattern, ` ${name}="${escaped}"`);
  return tag.replace(/\s*\/?\s*>$/, (end) => ` ${name}="${escaped}"${end}`);
}

function removeAttribute(tag, name) {
  return tag.replace(new RegExp(`\\s${name}\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, "gi"), "");
}

function stackText(stack) {
  return stack
    .map((item) => `${item.tag}#${item.attrs.id || ""}.${item.attrs.class || ""}`)
    .join(" ")
    .toLowerCase();
}

function classifyText(tag, stack, rawText) {
  const context = stackText(stack);
  const normalized = decodeEntities(rawText).replace(/\s+/g, " ").trim();
  if (/logo|brand|marca/.test(context) && normalized.length < 50) return "brand";
  if (tag === "button" || tag === "a") return /nav|menu|navbar|header/.test(context) ? "nav" : "button";
  if (/^h[1-6]$/.test(tag)) return "heading";
  if (tag === "p" || normalized.split(/\s+/).length > 8) return "paragraph";
  if (/nav|menu|navbar|header/.test(context) && normalized.length < 50) return "nav";
  if (normalized.length < 34) return "label";
  return "other";
}

function classifyImage(attrs, stack) {
  const context = `${stackText(stack)} ${attrs.class || ""} ${attrs.id || ""} ${attrs.alt || ""} ${attrs.src || ""}`.toLowerCase();
  const width = Number.parseInt(attrs.width || "", 10);
  const height = Number.parseInt(attrs.height || "", 10);
  if (/logo|brand|marca|navbar/.test(context)) return "logo";
  if (/hero|banner|cover|portada|masthead/.test(context)) return "hero";
  if (/icon|favicon|sprite/.test(context) || (width > 0 && height > 0 && width <= 96 && height <= 96)) return "icon";
  return "content";
}

function classifyLink(attrs, stack) {
  const context = `${stackText(stack)} ${attrs.class || ""} ${attrs.href || ""}`.toLowerCase();
  if ((attrs.href || "").startsWith("mailto:")) return "email";
  if ((attrs.href || "").startsWith("tel:")) return "phone";
  if (/nav|menu|navbar|header/.test(context)) return "nav";
  if (/button|btn|cta/.test(context)) return "cta";
  return "link";
}

function tokenize(html) {
  return html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g) ?? [];
}

function popTag(stack, token) {
  const tag = token.match(/^<\/\s*([\w:-]+)/)?.[1]?.toLowerCase();
  if (!tag) return;
  const matchIndex = stack.map((item) => item.tag).lastIndexOf(tag);
  if (matchIndex >= 0) stack.splice(matchIndex);
}

export function inspectHtml(html) {
  const texts = [];
  const images = [];
  const links = [];
  const stack = [];
  let textIndex = 0;
  let imageIndex = 0;
  let linkIndex = 0;

  for (const token of tokenize(html)) {
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;
    if (token.startsWith("</")) {
      popTag(stack, token);
      continue;
    }
    if (token.startsWith("<") && !token.startsWith("<!--") && !token.startsWith("<!")) {
      const tag = token.match(/^<\s*([\w:-]+)/)?.[1]?.toLowerCase();
      if (!tag) continue;
      const attrs = attributesFromTag(token);
      if (tag === "img") {
        imageIndex += 1;
        images.push({
          id: padId("i", imageIndex), role: classifyImage(attrs, stack), src: attrs.src || "",
          alt: attrs.alt || "", className: attrs.class || "", width: attrs.width || null,
          height: attrs.height || null, context: stackText(stack).slice(-280),
        });
      }
      if (tag === "a") {
        linkIndex += 1;
        links.push({
          id: padId("l", linkIndex), role: classifyLink(attrs, stack), href: attrs.href || "",
          className: attrs.class || "", context: stackText(stack).slice(-280),
        });
      }
      if (!VOID_TAGS.has(tag) && !token.endsWith("/>")) stack.push({ tag, attrs });
      continue;
    }
    if (stack.some((item) => SKIP_TEXT_TAGS.has(item.tag))) continue;
    const normalized = decodeEntities(token).replace(/\s+/g, " ").trim();
    if (!normalized || normalized.length > 700 || !/[\p{L}\p{N}]/u.test(normalized)) continue;
    textIndex += 1;
    const currentTag = stack.at(-1)?.tag || "body";
    texts.push({
      id: padId("t", textIndex), kind: classifyText(currentTag, stack, normalized), tag: currentTag,
      text: normalized, chars: normalized.length, context: stackText(stack).slice(-280),
    });
  }
  return { texts, images, links };
}

export function transformHtml(html, { texts = {}, images = {}, links = {} }) {
  const output = [];
  const stack = [];
  let textIndex = 0;
  let imageIndex = 0;
  let linkIndex = 0;
  let changedTexts = 0;
  let changedImages = 0;
  let changedLinks = 0;

  for (let token of tokenize(html)) {
    if (token.startsWith("<!--") || token.startsWith("<!")) {
      output.push(token);
      continue;
    }
    if (token.startsWith("</")) {
      popTag(stack, token);
      output.push(token);
      continue;
    }
    if (token.startsWith("<") && !token.startsWith("<!--") && !token.startsWith("<!")) {
      const tag = token.match(/^<\s*([\w:-]+)/)?.[1]?.toLowerCase();
      if (!tag) {
        output.push(token);
        continue;
      }
      const attrs = attributesFromTag(token);
      if (tag === "img") {
        imageIndex += 1;
        const value = images[padId("i", imageIndex)];
        if (value?.src) {
          token = setAttribute(token, "src", value.src);
          token = removeAttribute(removeAttribute(token, "srcset"), "sizes");
          if (value.alt != null) token = setAttribute(token, "alt", value.alt);
          changedImages += 1;
        }
      }
      if (tag === "a") {
        linkIndex += 1;
        const href = links[padId("l", linkIndex)];
        if (href) {
          token = setAttribute(token, "href", href);
          changedLinks += 1;
        }
      }
      output.push(token);
      if (!VOID_TAGS.has(tag) && !token.endsWith("/>")) stack.push({ tag, attrs });
      continue;
    }
    if (!stack.some((item) => SKIP_TEXT_TAGS.has(item.tag))) {
      const normalized = decodeEntities(token).replace(/\s+/g, " ").trim();
      if (normalized && normalized.length <= 700 && /[\p{L}\p{N}]/u.test(normalized)) {
        textIndex += 1;
        const replacement = texts[padId("t", textIndex)];
        if (replacement != null && String(replacement).trim() && String(replacement).trim() !== normalized) {
          const prefix = token.match(/^\s*/)?.[0] ?? "";
          const suffix = token.match(/\s*$/)?.[0] ?? "";
          token = `${prefix}${escapeHtml(String(replacement).trim())}${suffix}`;
          changedTexts += 1;
        }
      }
    }
    output.push(token);
  }
  return { html: output.join(""), changedTexts, changedImages, changedLinks };
}

export function parseCliArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const name = item.slice(2);
    const next = argv[index + 1];
    values[name] = next && !next.startsWith("--") ? argv[++index] : true;
  }
  return values;
}
