#!/bin/bash
set -e

[[ -f .env ]] && export $(grep -v '^#' .env | xargs)

: "${DEPLOY_USER:?Missing DEPLOY_USER}"
: "${DEPLOY_HOST:?Missing DEPLOY_HOST}"
: "${DEPLOY_PATH:?Missing DEPLOY_PATH}"

ssh -tt "$DEPLOY_USER@$DEPLOY_HOST" "su - nodejs -c \"bash -lc '
  export NVM_DIR=\$HOME/.nvm
  [ -s \\\"\$NVM_DIR/nvm.sh\\\" ] && . \\\"\$NVM_DIR/nvm.sh\\\"
  export PATH=\\\"/home/nodejs/.nvm/versions/node/v20.18.2/bin:\\\$PATH\\\"

  echo
  echo \\\"🔄 Pulling latest code...\\\"
  echo \\\"---------------------------\\\"
  cd $DEPLOY_PATH
  git pull

  echo
  echo \\\"📦 Installing dependencies...\\\"
  echo \\\"------------------------------\\\"
  npm ci

  echo
  echo \\\"🔧 Building backend...\\\"
  echo \\\"---------------------------\\\"
  npm run build --workspace=backend

  echo
  echo \\\"🚀 Restarting server with PM2...\\\"
  echo \\\"--------------------------------\\\"
  pm2 restart ./packages/backend/ecosystem.config.js

  echo
  echo \\\"✅ Done!\\\"
'\" && exit"
