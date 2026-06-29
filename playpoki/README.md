# PlayPokiGame Chrome Extension

Popup launcher for [playpokigame.com](https://playpokigame.com).

**Category:** HTML5 Games  
**Tagline:** Free HTML5 Games Online – 30,000+ Play Instantly

## What it does

Explore 30,000+ free HTML5 games. No downloads, instant play on mobile & desktop.

Click the toolbar icon to browse a searchable catalog bundled in `data.json`. Selecting an item opens the corresponding page on playpokigame.com in a new tab.

## Privacy

- Permission: `storage` only (24-hour local cache of the bundled catalog)
- Does not inject scripts into web pages
- Does not collect browsing history or personal data

## Load unpacked (development)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder (`playpoki/`)

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `data.json` | Bundled tool/game catalog |
| `config.js` | Site-specific configuration |
| `popup.html/js/css` | Popup UI |
| `background.js` | Service worker & cache logic |
| `icons/` | Extension icons (16–128 px) |