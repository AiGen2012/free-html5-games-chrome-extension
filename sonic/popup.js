/* global EXT_CONFIG */
let allCategories = [];
let currentCategory = null;
let flatTools = [];

const CATEGORY_ICONS = {
  PDF: { emoji: '📄', cls: 'pdf' },
  JPG: { emoji: '🖼️', cls: 'image' },
  PNG: { emoji: '🖼️', cls: 'image' },
  WEBP: { emoji: '🖼️', cls: 'image' },
  HEIC: { emoji: '📷', cls: 'image' },
  HEIF: { emoji: '📷', cls: 'image' },
  GIF: { emoji: '🎞️', cls: 'image' },
  SVG: { emoji: '✨', cls: 'image' },
  AVIF: { emoji: '🖼️', cls: 'image' },
  IMAGE: { emoji: '🖼️', cls: 'image' },
  PHOTO: { emoji: '📷', cls: 'image' },
  MP4: { emoji: '🎬', cls: 'video' },
  MOV: { emoji: '🎬', cls: 'video' },
  AVI: { emoji: '🎬', cls: 'video' },
  WEBM: { emoji: '🎬', cls: 'video' },
  VIDEO: { emoji: '🎬', cls: 'video' },
  MP3: { emoji: '🎵', cls: 'audio' },
  AUDIO: { emoji: '🎵', cls: 'audio' },
  DOCX: { emoji: '📝', cls: 'doc' },
  DOC: { emoji: '📝', cls: 'doc' },
  TXT: { emoji: '📝', cls: 'doc' },
  HTML: { emoji: '🌐', cls: 'doc' },
  XLS: { emoji: '📊', cls: 'doc' },
  CSV: { emoji: '📊', cls: 'doc' },
  JSON: { emoji: '{ }', cls: 'doc' },
  XML: { emoji: '📋', cls: 'doc' },
  EDUCATION: { emoji: '🎓', cls: 'doc' },
  FINANCE: { emoji: '💰', cls: 'other' },
  'TIME DATE': { emoji: '📅', cls: 'other' },
  'HEALTH FITNESS': { emoji: '💪', cls: 'other' },
  LIFESTYLE: { emoji: '🏠', cls: 'other' },
  UTILITIES: { emoji: '🔧', cls: 'other' },
  'SPORTS GAMES': { emoji: '⚽', cls: 'other' },
  BUSINESS: { emoji: '💼', cls: 'other' },
  AUTOMOTIVE: { emoji: '🚗', cls: 'other' },
  'MATH STATISTICS': { emoji: '📐', cls: 'doc' },
  'COMPUTING NETWORKING': { emoji: '💻', cls: 'doc' },
  'ENGINEERING CONSTRUCTION': { emoji: '🏗️', cls: 'other' },
  GENERAL: { emoji: '⭐', cls: 'other' },
  FORMAT: { emoji: '✨', cls: 'doc' },
  VALIDATE: { emoji: '✅', cls: 'doc' },
  CONVERT: { emoji: '🔄', cls: 'other' },
  MINIFY: { emoji: '📦', cls: 'other' },
  BEAUTIFY: { emoji: '💎', cls: 'other' },
  COMPRESS: { emoji: '🗜️', cls: 'other' },
  ZIP: { emoji: '📁', cls: 'other' },
  RESIZE: { emoji: '📐', cls: 'image' },
  SOCIAL: { emoji: '📱', cls: 'other' },
  COMPARE: { emoji: '⚖️', cls: 'other' },
  MODELS: { emoji: '🤖', cls: 'other' },
  'AI IMAGE EDITOR': { emoji: '✂️', cls: 'image' },
  'AI EFFECTS FILTERS': { emoji: '✨', cls: 'image' },
  'STYLE EFFECTS': { emoji: '🎨', cls: 'video' },
  'TRANSLATION TOOLS': { emoji: '🌐', cls: 'doc' },
  'TRANSLATE TO': { emoji: '🔤', cls: 'doc' },
  'CREATIVE TOOLS': { emoji: '🎭', cls: 'other' },
  'VIDEO TOOLS': { emoji: '🎬', cls: 'video' },
  'FEATURED GAMES': { emoji: '⭐', cls: 'other' },
  ACTION: { emoji: '⚔️', cls: 'other' },
  PUZZLE: { emoji: '🧩', cls: 'other' },
  RACING: { emoji: '🏎️', cls: 'other' },
  SHOOTING: { emoji: '🎯', cls: 'other' },
  SPORTS: { emoji: '⚽', cls: 'other' },
  ARCADE: { emoji: '👾', cls: 'other' },
  ADVENTURE: { emoji: '🗺️', cls: 'other' },
  STRATEGY: { emoji: '♟️', cls: 'other' },
  GIRLS: { emoji: '👗', cls: 'other' },
  BOYS: { emoji: '🎮', cls: 'other' },
  IO: { emoji: '🌐', cls: 'other' },
  HYPERCASUAL: { emoji: '🕹️', cls: 'other' },
  '3D': { emoji: '🎲', cls: 'other' },
  MULTIPLAYER: { emoji: '👥', cls: 'other' },
  WRITING: { emoji: '✍️', cls: 'doc' },
  SEO: { emoji: '📈', cls: 'doc' },
  BLOG: { emoji: '📝', cls: 'doc' },
  TOP: { emoji: '⭐', cls: 'other' },
  OTHER: { emoji: '🔧', cls: 'other' }
};

function cfg(key, fallback = '') {
  return (typeof EXT_CONFIG !== 'undefined' && EXT_CONFIG[key]) || fallback;
}

function withUtm(url, medium) {
  const utm = cfg('utmSource', 'chrome_extension');
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=${utm}&utm_medium=${medium}`;
}

function cateKey(label) {
  return (label || '').replace(/\s+Tools$/i, '').replace(/-/g, ' ').toUpperCase();
}

function getIconInfo(label) {
  const key = cateKey(label);
  return CATEGORY_ICONS[key] || { emoji: '🔧', cls: 'other' };
}

function getToolIconInfo(tool) {
  if (tool.cate) return getIconInfo(tool.cate + ' Tools');
  const title = (tool.title || '').toUpperCase();
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (title.includes(key)) return CATEGORY_ICONS[key];
  }
  return { emoji: '🔧', cls: 'other' };
}

async function loadTools(forceRefresh = false) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'fetchTools', forceRefresh }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!response?.success) {
        reject(new Error(response?.error || 'Failed to load tools'));
        return;
      }
      resolve({ data: response.data || [], meta: response.meta || null });
    });
  });
}

function formatSyncLabel(meta) {
  if (!meta) return 'Local data';
  const labels = { cache: 'Cached', bundled: 'Local data', remote: 'Live data' };
  const label = labels[meta.source] || 'Local data';
  const count = flatTools.length || '';
  const suffix = count ? ` · ${count} tools` : '';
  if (meta.cachedAt) {
    return `${label}${suffix} · ${formatTimeAgo(meta.cachedAt)}`;
  }
  return `${label}${suffix}`;
}

function formatTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function updateSyncStatus(meta) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  el.textContent = formatSyncLabel(meta);
  el.classList.toggle('is-stale', false);
}

async function renderApp(forceRefresh = false) {
  const { data, meta } = await loadTools(forceRefresh);
  allCategories = data;
  flatTools = buildFlatTools(allCategories);
  renderCategories();
  updateSectionTitle();
  renderTools(getCurrentTools());
  updateSyncStatus(meta);
}

function setupRefresh() {
  const btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    if (btn.classList.contains('is-loading')) return;
    btn.classList.add('is-loading');
    try {
      await renderApp(true);
    } catch (err) {
      document.getElementById('toolsGrid').innerHTML =
        `<div class="error-msg">Refresh failed: ${err.message}</div>`;
    } finally {
      btn.classList.remove('is-loading');
    }
  });
}

function buildFlatTools(categories) {
  const flat = [];
  categories.forEach((cat) => {
    const cateName = cateKey(cat.label);
    (cat.lists || []).forEach((tool) => {
      flat.push({ ...tool, cate: cateName, categoryLabel: cat.label });
    });
  });
  return flat;
}

function getFeaturedTools() {
  const featured = [];
  const perCate = cfg('featuredPerCategory', 3);
  const maxFeatured = cfg('maxFeatured', 30);
  allCategories.forEach((cat) => {
    (cat.lists || []).slice(0, perCate).forEach((tool) => {
      featured.push({ ...tool, cate: cateKey(cat.label), categoryLabel: cat.label });
    });
  });
  return featured.slice(0, maxFeatured);
}

function getCurrentTools() {
  if (currentCategory === null) return getFeaturedTools();
  const cat = allCategories.find((c) => c.label === currentCategory);
  if (!cat) return [];
  return (cat.lists || []).map((t) => ({
    ...t,
    cate: cateKey(cat.label),
    categoryLabel: cat.label
  }));
}

function renderCategories() {
  const container = document.getElementById('categoryButtons');
  if (!container) return;

  const skipLabels = (cfg('skipCategories') || []).map((s) => s.toLowerCase());
  const filtered = allCategories.filter(
    (cat) => !skipLabels.includes((cat.label || '').toLowerCase())
  );

  const featuredBtn = `<button type="button" class="category-btn${currentCategory === null ? ' active' : ''}" data-category="">Featured</button>`;
  const cateBtns = filtered.map((cat) => {
    const short = cat.label.replace(/\s+Tools$/i, '');
    const active = currentCategory === cat.label ? ' active' : '';
    return `<button type="button" class="category-btn${active}" data-category="${cat.label}">${short}</button>`;
  }).join('');

  container.innerHTML = featuredBtn + cateBtns;

  container.querySelectorAll('.category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      currentCategory = btn.dataset.category || null;
      renderCategories();
      updateSectionTitle();
      renderTools(getCurrentTools());
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}

function updateSectionTitle() {
  const el = document.getElementById('sectionTitle');
  if (!el) return;
  el.textContent = currentCategory
    ? currentCategory.replace(/\s+Tools$/i, ' Tools')
    : 'Featured Tools';
}

function renderToolVisual(tool) {
  if (tool.img) {
    return `<img class="tool-thumb" src="${tool.img}" alt="" loading="lazy" decoding="async">`;
  }
  const icon = getToolIconInfo(tool);
  return `<span class="tool-icon tool-icon--${icon.cls}">${icon.emoji}</span>`;
}

function renderTools(tools) {
  const grid = document.getElementById('toolsGrid');
  const site = cfg('site', 'https://example.com');
  const siteHost = cfg('siteHost', site.replace(/^https?:\/\//, ''));
  if (!grid) return;

  if (!tools.length) {
    grid.innerHTML = `<div class="empty">No tools found. Press Enter to search on ${siteHost}</div>`;
    return;
  }

  grid.innerHTML = tools.map((tool) => {
    const href = withUtm(tool.href || site, 'tool');
    return `
      <a class="tool-card${tool.img ? ' tool-card--has-thumb' : ''}" href="${href}" target="_blank" rel="noopener" title="${tool.title}">
        ${renderToolVisual(tool)}
        <span class="tool-name">${tool.title}</span>
        <span class="tool-arrow">›</span>
      </a>`;
  }).join('');
}

function searchTools(keyword) {
  const q = keyword.trim().toLowerCase();
  if (!q) return getCurrentTools();
  return flatTools.filter((t) => t.title.toLowerCase().includes(q));
}

function openSearchOnSite(keyword) {
  const site = cfg('site', 'https://example.com');
  const results = searchTools(keyword);
  if (results.length > 0) {
    chrome.tabs.create({ url: withUtm(results[0].href, 'search') });
  } else {
    chrome.tabs.create({ url: withUtm(`${site}/?q=${encodeURIComponent(keyword.trim())}`, 'search') });
  }
}

function setupSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const site = cfg('site', 'https://example.com');
  if (!input) return;

  input.addEventListener('input', () => {
    const keyword = input.value.trim();
    if (keyword) {
      currentCategory = '__search__';
      document.getElementById('sectionTitle').textContent = `Search: "${keyword}"`;
      document.querySelectorAll('.category-btn').forEach((b) => b.classList.remove('active'));
      renderTools(searchTools(keyword));
    } else {
      currentCategory = null;
      renderCategories();
      updateSectionTitle();
      renderTools(getCurrentTools());
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = input.value.trim();
    if (keyword) openSearchOnSite(keyword);
    else chrome.tabs.create({ url: withUtm(site, 'search') });
  });
}

async function init() {
  const grid = document.getElementById('toolsGrid');
  const site = cfg('site', 'https://example.com');
  const siteHost = cfg('siteHost', site.replace(/^https?:\/\//, ''));
  try {
    await renderApp(false);
    setupSearch();
    setupRefresh();
  } catch (err) {
    if (grid) {
      grid.innerHTML = `<div class="error-msg">Failed to load tools.<br><a href="${withUtm(site, 'error')}" target="_blank">Open ${siteHost}</a></div>`;
    }
    updateSyncStatus(null);
  }
}

document.addEventListener('DOMContentLoaded', init);
