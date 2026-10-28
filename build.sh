#!/bin/sh
# Wraps src/page.html in a full HTML document -> index.html (what Vercel serves)
set -e
{ printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  awk '/^<header>/{exit} {print}' src/page.html
  printf '</head>\n<body>\n'
  awk 'f{print} /^<header>/{f=1; print}' src/page.html
  printf '</body>\n</html>\n'; } > index.html
