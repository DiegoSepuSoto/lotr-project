scrapper s:
	@echo [Running LOTR scrapper]
	@node ./lotr-scraping/src/index.js

init i:
	@echo [Installing Node.js dependencies]
	@cd lotr-scraping && rm -rf node_modules/ && npm install
	@cd lotr-populate-db && rm -rf node_modules/ && npm install

run r:
	@echo [Running LOTR project]
	@make init
	@make scrapper
	@cp ./data.json ./lotr-populate-db/data.json
	@docker-compose up --build

.PHONY: scrapper s init i run r
