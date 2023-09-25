#!/bin/bash

path="$1"
componentFileName="$2"

mkdir -p "$path/$componentFileName"
cd "$path/$componentFileName" || exit

componentFile="$componentFileName.component.tsx"

styleFile="$componentFileName.style.ts"

touch "$componentFile"
touch "$styleFile"
