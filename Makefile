scrapper s:
	@echo [Running LOTR scrapper]
	@node ./lotr-scraping/src/index.js

documentation doc:
	# Please change the location for swag cli
	@echo [Creating API Documentation with Swagger in Go]
	@cd lotr-api && ${HOME}/go/bin/swag init

init i:
	@echo [Installing Node.js dependencies]
	@cd lotr-scraping && rm -rf node_modules/ && npm install
	@cd lotr-populate-db && rm -rf node_modules/ && npm install
	@cd lotr-frontend && rm -rf node_modules/ && npm install

run r:
	@echo [Running The Lord of The Rings project]
	@make doc
	@make s
	@cp ./data.json ./lotr-populate-db/data.json
	@docker-compose up --build

.PHONY: scrapper s init i run r
