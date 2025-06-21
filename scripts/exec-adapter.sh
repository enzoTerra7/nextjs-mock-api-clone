#!/bin/bash

DIRECTION=$1        
TARGET=$2           
DRIVER=$3

if [[ -z "$DRIVER" ]]; then
  echo "❌ You must inform the driver. Ex: ./scripts/db:migration.sh up knex"
  exit 1
fi

ADAPTER_FILE="./migrations/migrate.ts"

if [[ ! -f "$ADAPTER_FILE" ]]; then
  echo "❌ Targeted file not found in ${ADAPTER_FILE}"
  exit 1
fi

echo "📦 Exec ${DIRECTION} with adapter ${DRIVER}"
npx tsx "$ADAPTER_FILE" "$DIRECTION" "$TARGET"
