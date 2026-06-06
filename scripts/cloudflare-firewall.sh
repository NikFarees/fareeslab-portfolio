#!/usr/bin/env bash
#
# Lock the VPS so ports 80/443 are reachable ONLY from Cloudflare's edge.
# This forces all web traffic through Cloudflare (DDoS protection + hides origin),
# even if someone learns the origin IP.
#
# Run on the VPS as root (or with sudo). Re-run any time to refresh Cloudflare ranges.
#
# IMPORTANT: SSH (22) is left open to the world below. If you only ever SSH from
# known IPs, tighten the SSH rule too (see the commented line) so you don't get
# locked out — test in a second session before closing your current one.

set -euo pipefail

echo "==> Resetting web rules and applying Cloudflare-only access..."

# Make sure ufw is installed
command -v ufw >/dev/null || { echo "ufw not found. Install with: apt-get install -y ufw"; exit 1; }

# Default posture: deny incoming, allow outgoing
ufw default deny incoming
ufw default allow outgoing

# --- SSH ---
# Keep SSH open so you don't lock yourself out.
ufw allow 22/tcp comment 'SSH'
# To restrict SSH to your own IP instead, comment the line above and use:
# ufw allow from <YOUR.HOME.IP.ADDR> to any port 22 proto tcp comment 'SSH (me only)'

# --- Remove any existing broad web rules so we start clean ---
ufw delete allow 80/tcp   2>/dev/null || true
ufw delete allow 443/tcp  2>/dev/null || true
ufw delete allow 'Nginx Full' 2>/dev/null || true

# --- Allow 80/443 only from Cloudflare's published ranges ---
for ip in $(curl -fsSL https://www.cloudflare.com/ips-v4); do
  ufw allow from "$ip" to any port 80,443 proto tcp comment 'Cloudflare v4'
done

for ip in $(curl -fsSL https://www.cloudflare.com/ips-v6); do
  ufw allow from "$ip" to any port 80,443 proto tcp comment 'Cloudflare v6'
done

ufw --force enable
ufw reload
ufw status verbose

echo "==> Done. Web ports now accept Cloudflare edge IPs only."
