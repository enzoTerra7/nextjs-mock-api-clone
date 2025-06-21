#!/bin/bash
source .env

COMMAND=$1
MIGRATION_NAME=$2
DRIVER=$BACKEND_RESOLVER

case "$COMMAND" in
  make)
    ./scripts/db:make.sh $MIGRATION_NAME
    ;;
  migrate)
    ./scripts/db:migration.sh $DRIVER
    ;;
  rollback)
    ./scripts/db:rollback.sh $DRIVER
    ;;
  up)
    ./scripts/db:migration:up.sh $MIGRATION_NAME $DRIVER
    ;;
  down)
    ./scripts/db:migration:down.sh $MIGRATION_NAME $DRIVER
    ;;
  *)
    echo "❌ Invalid command. Use: make | migrate | rollback | up | down"
    ;;
esac

