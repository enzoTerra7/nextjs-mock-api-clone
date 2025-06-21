#!/bin/bash
NAME=$1

MIGRATIONS_DIR="./migrations"
 
mkdir -p "$MIGRATIONS_DIR"

TIMESTAMP=$(date +%Y%m%d%H%M%S)
FILENAME="${TIMESTAMP}_${NAME}.sql"
echo -e "-- UP\n\n\n\n\n\n\n\n-- DOWN" > "$MIGRATIONS_DIR/$FILENAME"
echo "✅ Migration created: $FILENAME"