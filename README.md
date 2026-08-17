# PluginHive Candidate Project - Inventory Dashboard

A full-stack web application featuring a React.js frontend and a Node.js/Express backend API, containerized with Docker alongside Redis and OpenSearch services.

## Tech Stack
* **Frontend:** React.js, Vite
* **Backend:** Node.js, Express.js
* **Services:** Redis, OpenSearch
* **DevOps & Cloud:** Docker, Docker Compose, AWS S3

## Local Setup & Development

### 1. Backend & Infrastructure
Start the Node API, Redis, and OpenSearch containers:
```bash
docker-compose up --build -d