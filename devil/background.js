/* global EXT_CONFIG */
importScripts('config.js');

const CACHE_TTL = 24 * 60 * 60 * 1000;

function cfg(key, fallback = '') {
  return (typeof EXT_CONFIG !== 'undefined' && EXT_CONFIG[key]) || fallback;
}

async function getLocalData() {
  const response = await fetch(chrome.runtime.getURL('data.json'));
  if (!response.ok) throw new Error('Local data unavailable');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid local data format');
  return data;
}

function countTools(data) {
  return (data || []).reduce((sum, cat) => sum + (cat.lists?.length || 0), 0);
}

async function readCacheEntry() {
  const cacheKey = cfg('cacheKey');
  const metaKey = cfg('metaKey');
  const result = await chrome.storage.local.get([cacheKey, metaKey]);
  return { entry: result[cacheKey] || null, meta: result[metaKey] || null };
}

function isCacheFresh(entry) {
  return entry && Date.now() - entry.time < CACHE_TTL;
}

async function writeCache(data, source) {
  const time = Date.now();
  await chrome.storage.local.set({
    [cfg('cacheKey')]: { data, time },
    [cfg('metaKey')]: { source, time, categories: data.length, tools: countTools(data) }
  });
}

/** 本地 data.json → 可选远程 games-data.json → 24h storage 缓存 */
async function getToolsData(options = {}) {
  const { forceRefresh = false } = options;
  const { entry } = await readCacheEntry();

  if (!forceRefresh && entry && isCacheFresh(entry)) {
    return { data: entry.data, meta: { source: 'cache', cachedAt: entry.time, fresh: true } };
  }

  const remoteUrl = cfg('remoteDataUrl');
  if (remoteUrl) {
    try {
      const response = await fetch(remoteUrl, { cache: 'no-cache' });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
          await writeCache(data, 'remote');
          return { data, meta: { source: 'remote', cachedAt: Date.now(), fresh: true } };
        }
      }
    } catch (e) {
      console.warn(cfg('logPrefix'), 'Remote fetch failed:', e.message);
    }
  }

  const data = await getLocalData();
  await writeCache(data, 'bundled');
  return { data, meta: { source: 'bundled', cachedAt: Date.now(), fresh: true } };
}

chrome.runtime.onInstalled.addListener(() => {
  getToolsData().catch(() => {});
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'fetchTools') {
    getToolsData({ forceRefresh: !!request.forceRefresh })
      .then(({ data, meta }) => sendResponse({ success: true, data, meta }))
      .catch((error) => sendResponse({ success: false, error: error.message, data: [], meta: null }));
    return true;
  }
});
