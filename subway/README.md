# Subway Surfers Chrome Extension

Popup launcher for [subwaysurfersgame.online](https://subwaysurfersgame.online).

**Category:** Endless Runner  
**Tagline:** Subway Surfers Online Game – Play Free

## What it does

Play Subway Surfers for free online. Run, dodge, and surf in this endless runner — no download required.

Click the toolbar icon to browse a searchable catalog bundled in `data.json`. Selecting an item opens the corresponding page on subwaysurfersgame.online in a new tab.

## Privacy

- Permission: `storage` only (24-hour local cache of the bundled catalog)
- Does not inject scripts into web pages
- Does not collect browsing history or personal data

## Load unpacked (development)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder (`subway/`)

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `data.json` | Bundled tool/game catalog |
| `config.js` | Site-specific configuration |
| `popup.html/js/css` | Popup UI |
| `background.js` | Service worker & cache logic |
| `icons/` | Extension icons (16–128 px) |