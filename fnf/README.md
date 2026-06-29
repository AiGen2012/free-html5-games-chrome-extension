# FNFunKin Chrome Extension

Popup launcher for [fnfunkin.org](https://fnfunkin.org).

**Category:** Rhythm Games  
**Tagline:** Friday Night Funkin Mods – Play FNF Online

## What it does

Play the most popular Friday Night Funkin mods online with new characters and custom tracks.

Click the toolbar icon to browse a searchable catalog bundled in `data.json`. Selecting an item opens the corresponding page on fnfunkin.org in a new tab.

## Privacy

- Permission: `storage` only (24-hour local cache of the bundled catalog)
- Does not inject scripts into web pages
- Does not collect browsing history or personal data

## Load unpacked (development)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder (`fnf/`)

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `data.json` | Bundled tool/game catalog |
| `config.js` | Site-specific configuration |
| `popup.html/js/css` | Popup UI |
| `background.js` | Service worker & cache logic |
| `icons/` | Extension icons (16–128 px) |