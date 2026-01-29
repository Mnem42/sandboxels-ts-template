#!/bin/bash

echo "Installing submodules..."
git submodule update --recursive --init --remote

echo "Installing npm packages..."
npm install

echo "done"