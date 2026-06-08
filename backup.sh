#!/bin/bash

# Configuration - Hardcoded paths
SOURCE_DB="/home/fedex/Github/project-dashboard/local.db"
BASE_DIR="/home/fedex/Github/project-dashboard"

# Formatting dates
TODAY=$(date +%F)              # Output: YYYY-MM-DD
CURRENT_TIME=$(date +%H-%M-%S) # Output: HH-MM-SS for the filename

# Destination folders and files
# We place the daily backups in a 'backups' subfolder to keep the project directory clean
BACKUP_DIR="$BASE_DIR/backups/$TODAY"
BACKUP_FILE="$BACKUP_DIR/local_${CURRENT_TIME}.db"

# 1. Create the base folder and today's backup folder if they don't exist
mkdir -p "$BACKUP_DIR"
echo "Backup directory is ready: $BACKUP_DIR"

# 2. Take a copy of the database
echo "Taking database backup..."
cp "$SOURCE_DB" "$BACKUP_FILE"

# 3. Check if the backup command succeeded
if [ $? -eq 0 ]; then
    echo "Backup successfully saved to $BACKUP_FILE"
else
    echo "Error: Database backup failed!" >&2
    exit 1
fi
