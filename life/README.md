# Life Simulator Chrome Extension

Popup launcher for [lifesimulator.net](https://lifesimulator.net).

**Category:** Simulation  
**Tagline:** Play Life Simulator Unblocked – Free Online

## What it does

Shape your destiny in free life simulator games — BitLife-style, mom, cat & run simulators.

Click the toolbar icon to browse a searchable catalog bundled in `data.json`. Selecting an item opens the corresponding page on lifesimulator.net in a new tab.

## Privacy

- Permission: `storage` only (24-hour local cache of the bundled catalog)
- Does not inject scripts into web pages
- Does not collect browsing history or personal data

## Load unpacked (development)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder (`life/`)

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `data.json` | Bundled tool/game catalog |
| `config.js` | Site-specific configuration |
| `popup.html/js/css` | Popup UI |
| `background.js` | Service worker & cache logic |
| `icons/` | Extension icons (16–128 px) |