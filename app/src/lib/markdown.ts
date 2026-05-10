import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = join(process.cwd(), 'src', 'content');

export function readContentFile(slug: string): string {
  return readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8');
}

// Minimal markdown renderer for the small set of legal pages.
// Handles: headings (#, ##, ###), bold (**), italics (*),
// inline code (`), unordered lists, blockquotes, paragraphs.
export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let inUl = false;
  let inP = false;
  let inBlockquote = false;
  const closeP = () => {
    if (inP) {
      out.push('</p>');
      inP = false;
    }
  };
  const closeUl = () => {
    if (inUl) {
      out.push('</ul>');
      inUl = false;
    }
  };
  const closeBq = () => {
    if (inBlockquote) {
      out.push('</blockquote>');
      inBlockquote = false;
    }
  };

  const inline = (s: string): string =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      closeP();
      closeUl();
      closeBq();
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      closeP();
      closeUl();
      closeBq();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      closeP();
      closeBq();
      if (!inUl) {
        out.push('<ul>');
        inUl = true;
      }
      out.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ''))}</li>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      closeP();
      closeUl();
      if (!inBlockquote) {
        out.push('<blockquote>');
        inBlockquote = true;
      }
      out.push(`<p>${inline(line.replace(/^>\s?/, ''))}</p>`);
      continue;
    }
    closeUl();
    closeBq();
    if (!inP) {
      out.push('<p>');
      inP = true;
    } else {
      out.push(' ');
    }
    out.push(inline(line));
  }
  closeP();
  closeUl();
  closeBq();
  return out.join('\n');
}
