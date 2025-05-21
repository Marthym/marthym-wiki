node_modules:
	npm ci

serve: node_modules
	npm run dev

clean:
	rm -rf node_modules .astro
