# CTT React Test

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React Badge" />
  <img src="https://img.shields.io/badge/Redux-5.0.1-purple?style=for-the-badge&logo=redux" alt="Redux Badge" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript Badge" />
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=github" alt="CI Badge" />
</div>

---

## Overview 🚀

This project is a **Single-Page Application (SPA)** that allows you to view and perform CRUD operations on products. It is built using **React**, **Redux**, and **TypeScript**, following **Test-Driven Development (TDD)** and **Trunk Based Development** practices.

---

## Features ✨

- **Product Listing**  
  View products fetched via a simulated API call.
- **CRUD Operations**  
  Create, read, update, and delete products.

---

## Project Structure 📁

- **src/**: Source code of the application

  - **components/**: React components such as `ProductList` and `ProductForm`
  - **store/**: Redux setup including actions, reducers, types, and custom thunk middleware
  - **services/**: Functions that simulate API calls

- **Dockerfile** & **docker-compose.yml**: Docker configuration for the development environment
- **.github/workflows/ci.yml**: Continuous Integration pipeline configuration using GitHub Actions

---

## How to Run Locally ⚙️

### With Docker

1. Make sure you have **Docker** and **Docker Compose** installed.
2. Run the following command in your terminal:

```bash
npm run docker:up
```

### Without Docker

1. Make sure you have **Node.js 22** and **npm 10**
2. Run the following command in your terminal:

```bash
npm run start
```
