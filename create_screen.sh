#!/bin/bash

path="$1"
screenFileName="$2"

mkdir -p "$path/$screenFileName"
cd "$path/$screenFileName" || exit

screenFile="$screenFileName.screen.tsx"

styleFile="$screenFileName.style.ts"

touch "$screenFile"
touch "$styleFile"
