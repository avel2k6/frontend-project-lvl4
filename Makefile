install: install-deps install-flow-typed

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

autostart:
	npx nodemon --exec npx babel-node server/bin/slack.js --open

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
