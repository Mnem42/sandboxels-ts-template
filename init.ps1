#!/usr/bin/env pwsh
# Effectively the same as init.sh, it's just named differently and uses Write-Output

Write-Output "Installing submodules..."
git submodule update --recursive --init --remote

Write-Output "Installing npm packages..."
npm install

Write-Output "Done!" 