# Game Launcher Extension

Open-source Chrome extension launchers for **12 free HTML5 game websites**. Each subfolder is a standalone Manifest V3 extension.

## Extensions

| Brand | Category | Folder | Website |
|-------|----------|--------|---------|
| [CrazyGames-Poki](https://crazygames-poki.com) | HTML5 Games | [crazy/](crazy/) | [crazygames-poki.com](https://crazygames-poki.com) |
| [PlayPokiGame](https://playpokigame.com) | HTML5 Games | [playpoki/](playpoki/) | [playpokigame.com](https://playpokigame.com) |
| [FreeH5Games](https://freeh5games.org) | HTML5 Games | [h5/](h5/) | [freeh5games.org](https://freeh5games.org) |
| [Sonic Games](https://sonicgames.org) | Sonic Games | [sonic/](sonic/) | [sonicgames.org](https://sonicgames.org) |
| [Spranki](https://spranki.org) | Music & Rhythm | [spranki/](spranki/) | [spranki.org](https://spranki.org) |
| [Subway Surfers](https://subwaysurfersgame.online) | Endless Runner | [subway/](subway/) | [subwaysurfersgame.online](https://subwaysurfersgame.online) |
| [Life Simulator](https://lifesimulator.net) | Simulation | [life/](life/) | [lifesimulator.net](https://lifesimulator.net) |
| [Bleach Vs Naruto](https://bleachvsnaruto.games) | Anime Fighting | [bleach/](bleach/) | [bleachvsnaruto.games](https://bleachvsnaruto.games) |
| [Arcade Games](https://arcade-games.org) | Retro Arcade | [arcade/](arcade/) | [arcade-games.org](https://arcade-games.org) |
| [FNFunKin](https://fnfunkin.org) | Rhythm Games | [fnf/](fnf/) | [fnfunkin.org](https://fnfunkin.org) |
| [Color Block Jam](https://colorblockjam.games) | Puzzle | [colorblock/](colorblock/) | [colorblockjam.games](https://colorblockjam.games) |
| [Level Devil](https://leveldevil.games) | Platform | [devil/](devil/) | [leveldevil.games](https://leveldevil.games) |

## How it works

Each extension is a **game quick launcher**:

1. User clicks the toolbar icon
2. A searchable popup shows games bundled in `data.json`
3. Selecting a game opens it on the official site in a new tab

No page injection, no remote code — only `storage` for a 24-hour local cache of the game catalog.

## Repository structure

```
game-launcher-extension/
├── crazy/        # CrazyGames-Poki – crazygames-poki.com
├── playpoki/     # PlayPokiGame – playpokigame.com
├── h5/           # FreeH5Games – freeh5games.org
├── sonic/        # Sonic Games – sonicgames.org
├── fnf/          # FNFunKin – fnfunkin.org
└── …             # One folder per game site
```

## Load locally

```bash
# Example: load the PlayPoki extension
chrome://extensions/ → Developer mode → Load unpacked → select playpoki/
```

## Privacy & permissions

| Permission | Why |
|------------|-----|
| `storage` | Cache bundled `data.json` for up to 24 hours |

We do **not** inject scripts into game pages or collect browsing history.

## License

MIT — see [LICENSE](LICENSE).

## Links

- [CrazyGames-Poki](https://crazygames-poki.com) · [PlayPokiGame](https://playpokigame.com) · [FreeH5Games](https://freeh5games.org) · [Sonic Games](https://sonicgames.org) · [FNFunKin](https://fnfunkin.org)