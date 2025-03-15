# 🚀 Portfolio Website

A personal portfolio built with **Next.js 15.2**, **TypeScript**, and **Mantine UI** to showcase projects, skills, and experience. Includes Playwright tests for UI validation.

## ✨ Features

- 🌟 **Modern UI** – Built with Mantine UI for a sleek and responsive design.
- 📌 **Project Showcase** – Highlights key projects with descriptions and live links.
- 🌗 **Dark Mode Support** – Theme switching using Mantine Provider.
- ⚡ **Performance Optimized** – Efficient rendering and lazy loading.
- ✅ **Playwright Testing** – Automated UI tests for critical components.
- 🚀 **Vercel Deployment** – Easily deployed and updated with CI/CD.

## 🔧 Tech Stack

| **Technology**   | **Usage**                     |
| ---------------- | ----------------------------- |
| **Next.js 15.2** | Frontend framework            |
| **TypeScript**   | Strongly typed development    |
| **Mantine UI**   | Component library for styling |
| **Zustand**      | State management              |
| **Playwright**   | End-to-end testing            |
| **Vercel**       | Deployment platform           |

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository:

```sh
git clone https://github.com/charleslabit/ecommerce-demo.git
cd ecommerce-demo
```

### 2️⃣ Install dependencies:

```sh
npm install
```

### 3️⃣ Run the development server:

```sh
npm run dev
```

### 4️⃣ Open in your browser:

```sh
http://localhost:3000
```

## 🧪 Testing with Playwright

This portfolio includes Playwright tests for UI validation.

### ✅ Install Playwright dependencies:

```sh
npx playwright install
```

### 🔹 Run all tests:

```sh
npx playwright test
```

### 🔹 Run tests in headed mode (for debugging):

```sh
npx playwright test --headed
```

### 🔹 Run tests for a specific component:

```sh
npx playwright test tests/header.spec.ts
```

## 🚀 Deployment

This project is deployed using Vercel.

### 🔹 Automatic Deployment:

Connect the GitHub repository to Vercel for continuous deployment.

### 🔹 Manual Deployment:

```sh
vercel --prod
```

### 🔹 Common Deployment Issues:

- If Playwright is causing issues, ensure it is in devDependencies (-D flag).
- If deployment fails, try removing package-lock.json and redeploy.

## 🏗 Future Improvements

- ✅ More Playwright test cases
- ✅ CMS integration for easy content updates
- ✅ Checkout Functionality
- ✅ Performance optimizations

## 📌 Made with ❤️ by Charles Kenneth Labit

This version keeps everything **structured, easy to read, and fully compiled**. 🚀 Let me know if you need any edits! 😊
