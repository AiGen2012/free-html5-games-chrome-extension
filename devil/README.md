# Level Devil Chrome Extension

Popup launcher for [leveldevil.games](https://leveldevil.games).

**Category:** Platform  
**Tagline:** Play Level Devil Online – Free & Unblocked

## What it does

Challenge yourself with tricky puzzles and rage platformers — Level Devil unblocked in your browser.

Click the toolbar icon to browse a searchable catalog bundled in `data.json`. Selecting an item opens the corresponding page on leveldevil.games in a new tab.

## Privacy

- Permission: `storage` only (24-hour local cache of the bundled catalog)
- Does not inject scripts into web pages
- Does not collect browsing history or personal data

## Load unpacked (development)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder (`devil/`)

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `data.json` | Bundled tool/game catalog |
| `config.js` | Site-specific configuration |
| `popup.html/js/css` | Popup UI |
| `background.js` | Service worker & cache logic |
| `icons/` | Extension icons (16–128 px) |