DOCKER_CONTAINER = passport-app-nginx
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

start: docker-network docker-up docker-build
stop: docker-down
deploy: git-pull docker-build
restart: stop start
prod: env-prod git-pull restart

env-prod:
	cp .env.prod .env

buildjs:
	npm install
	npm run build

## docker

docker-up:
	docker compose up --build -d --remove-orphans --force-recreate

docker-down:
	docker compose down

docker-network:
	docker network ls|grep proxy-nginx > /dev/null || docker network create --driver bridge proxy-nginx

docker-build:
	docker exec $(DOCKER_CONTAINER) make buildjs

docker-enter:
	docker exec -it $(DOCKER_CONTAINER) bash

docker-logs:
	docker logs -t $(DOCKER_CONTAINER) -f --tail="all"

docker-ps:
	docker compose ps

## Heroku

heroku:
	git push heroku $(GIT_BRANCH):maser -f

## git

git-pull:
	git pull origin