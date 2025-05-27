# 🛒 Ecommerce Admin Interface

A basic eCommerce admin panel built using **Next.js**, **Tailwind CSS**, and **JavaScript**, featuring authentication and CRUD operations for product categories and products.

> ⚠️ **Note: First Time User Instructions**

- When you first open the site, it will redirect you to the **Login Page**.
- To create a new account, click on the **Register** link/button.
- Fill out the registration form with all required information (like name, email, password, etc.).
- After successful registration, you will be redirected back to the **Login Page**.
- Now, use your registered **email and password** to log in.
- Upon successful login, you will be taken directly to the **Dashboard**.


## Features

### 1. Authentication

- Login and Register using the provided API
- Auth token is stored in `localStorage` for session management

### 2. Product Category Management (CRUD)

- List all product categories
- Create new category
- Edit/update existing category
- Delete category

### 3. Product Management (CRUD)

- List all products
- Create new product
- Edit/update existing product
- Delete product

### 4. UI & UX

- Clean and user-friendly interface
- Responsive layout
- Form validation with error messages
- Toast notifications for actions (success, error)

## 5. Tech Stack

- **Framework**: Next.js
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Authentication**: Token-based via API

## 6. Project Setup Guide

Follow the steps below to run this project locally:

### Clone the Repository

```bash
git clone https://github.com/kader009/vaid-task.git
```

```bash
npm install
```

```bash
npm run dev
```