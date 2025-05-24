node_modules:
	npm ci

install: node_modules

serve: install
	npm run dev

build: install
	npm run build

clean:
	rm -rf node_modules .astro
