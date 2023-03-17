install:
		npm ci
		sudo npm link

publish:
		npm publish --dry-run

lint:
		npx eslint