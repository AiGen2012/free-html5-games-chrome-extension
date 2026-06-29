#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="$(cd "$DIR/../../../../../../../.." && pwd)"
SITEMAP_URL="${1:-https://freeh5games.org/2025_sitemap.xml?v=1}"

php "$ROOT/resources/views/Simple/Tools/crx/sync-h5-data.php" "$DIR/data.json" "$SITEMAP_URL"
