SHELL := /bin/bash

COMPOSE_FILE=docker-compose.yml

.PHONY: build up down logs stop py py-activate run

build:
	docker compose -f $(COMPOSE_FILE) up --build

up:
	docker compose -f $(COMPOSE_FILE) up -d

down:
	docker compose -f $(COMPOSE_FILE) down

logs:
	docker compose -f $(COMPOSE_FILE) logs -f
