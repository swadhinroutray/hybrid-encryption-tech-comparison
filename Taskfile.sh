#!/bin/bash
default() {
    start
}
install() {
    npm install --prefix server
    echo "API Packages Installed"
}
start() {
    cd server && npm run-script test
}

"${@:-default}"
