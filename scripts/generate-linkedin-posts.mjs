import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const postsDir = path.join(repoRoot, 'LinkedInPosts');
const publicPostsDir = path.join(repoRoot, 'public', 'LinkedInPosts');
const outputFile = path.join(repoRoot, 'src', 'data', 'linkedin-posts.generated.json');

function slugify(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'linkedin-post';
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) {
    return {};
  }

  const frontmatter = {};
  for (const rawLine of match[1].split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const sep = line.indexOf(':');
    if (sep <= 0) {
      continue;
    }

    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function getLines(text) {
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function isNoiseLine(line) {
  const normalized = line.toLowerCase();
  const exactNoise = new Set([
    'edit article',
    'view post',
    'view stats',
    'see translation',
    'for business',
    'messaging',
    'notifications',
  ]);

  if (exactNoise.has(normalized)) {
    return true;
  }

  if (/^(home|my network|jobs|messaging|notifications|me)$/i.test(line)) {
    return true;
  }

  if (/^\d+\s+\w+\s+\d+\s+\w+$/i.test(line)) {
    return true;
  }

  return false;
}

function getMeaningfulLines(text) {
  return getLines(text).filter((line) => !isNoiseLine(line));
}

function deriveTitle(text, fallback) {
  const lines = getMeaningfulLines(text);
  const firstLine = lines.find((line) => line.length >= 8 && line.length <= 140);
  return firstLine || fallback;
}

function deriveExcerpt(text, maxLength = 200) {
  const compact = getMeaningfulLines(text).join(' ').replace(/\s+/g, ' ').trim();
  if (!compact) {
    return '';
  }

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength).trimEnd()}...`;
}

function parsePdfDate(rawDate) {
  if (!rawDate || typeof rawDate !== 'string') {
    return null;
  }

  const normalized = rawDate.startsWith('D:') ? rawDate.slice(2) : rawDate;
  const match = normalized.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return `${year}-${month}-${day}`;
}

function parseTextDate(text) {
  const match = text.match(
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})/i,
  );
  if (!match) {
    return null;
  }

  const monthMap = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12',
  };

  const month = monthMap[match[1].toLowerCase()];
  const day = match[2].padStart(2, '0');
  const year = match[3];

  return `${year}-${month}-${day}`;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function extractFromPdf(pdfPath) {
  const pdfBuffer = await fs.readFile(pdfPath);
  const parser = new PDFParse({ data: pdfBuffer });

  try {
    const textResult = await parser.getText();
    const infoResult = await parser.getInfo({ parsePageInfo: false });

    const text = textResult?.text || '';
    const title = deriveTitle(text, 'PLACEHOLDER: Add sidecar title');
    const excerpt = deriveExcerpt(text) || 'PLACEHOLDER: Add sidecar excerpt';
    const postDate =
      parseTextDate(text) ||
      parsePdfDate(infoResult?.info?.CreationDate) ||
      parsePdfDate(infoResult?.info?.ModDate) ||
      null;

    return { title, excerpt, postDate };
  } finally {
    await parser.destroy();
  }
}

async function getLinkedInPost(fileName) {
  const pdfPath = path.join(postsDir, fileName);
  const sidecarCandidates = [
    path.join(postsDir, fileName.replace(/\.pdf$/i, '.md')),
    path.join(postsDir, `${slugify(fileName)}.md`),
  ];
  const fallbackTitle = fileName.replace(/\.pdf$/i, '');

  let source = 'pdf-extraction';
  let sidecar = {};

  for (const candidate of sidecarCandidates) {
    if (await exists(candidate)) {
      const sidecarContent = await fs.readFile(candidate, 'utf8');
      sidecar = parseFrontmatter(sidecarContent);
      break;
    }
  }

  let pdfData = { title: '', excerpt: '', postDate: null };
  if (!sidecar.title || !sidecar.excerpt || !sidecar.date) {
    try {
      pdfData = await extractFromPdf(pdfPath);
    } catch {
      pdfData = {
        title: 'PLACEHOLDER: Add sidecar title',
        excerpt: 'PLACEHOLDER: Unable to extract PDF text. Add sidecar excerpt.',
        postDate: null,
      };
    }
  }

  const hasSidecarOverride = Boolean(sidecar.title || sidecar.excerpt || sidecar.date);
  if (hasSidecarOverride) {
    source = 'sidecar';
  }

  return {
    slug: slugify(fileName),
    pdfFile: fileName,
    pdfUrl: `/LinkedInPosts/${encodeURIComponent(fileName)}`,
    title: sidecar.title || pdfData.title || fallbackTitle,
    excerpt: sidecar.excerpt || pdfData.excerpt || 'PLACEHOLDER: Add sidecar excerpt',
    postDate: sidecar.date || sidecar.postDate || sidecar.published || pdfData.postDate || null,
    source,
  };
}

async function main() {
  const entries = await fs.readdir(postsDir, { withFileTypes: true });
  const pdfFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const posts = await Promise.all(pdfFiles.map((fileName) => getLinkedInPost(fileName)));

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(
    outputFile,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), posts }, null, 2)}\n`,
    'utf8',
  );

  const sidecarCount = posts.filter((post) => post.source === 'sidecar').length;
  const extractedCount = posts.length - sidecarCount;

  // Copy PDFs to public/ so Astro serves them as static assets
  await fs.mkdir(publicPostsDir, { recursive: true });
  await Promise.all(
    pdfFiles.map((fileName) =>
      fs.copyFile(path.join(postsDir, fileName), path.join(publicPostsDir, fileName)),
    ),
  );

  console.log(`Generated ${posts.length} LinkedIn post cards.`);
  console.log(`- Sidecar-backed: ${sidecarCount}`);
  console.log(`- PDF-extracted: ${extractedCount}`);
  console.log(`- PDFs copied to public/LinkedInPosts/`);
  console.log(`Output: ${outputFile}`);
}

main().catch((error) => {
  console.error('Failed to generate LinkedIn posts metadata.', error);
  process.exit(1);
});
