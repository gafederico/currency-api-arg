# CurrencyAPI Argentina Fullstack

A complete Full Stack solution built with **Python (FastAPI)** and **React (TypeScript)** to track Argentine currency exchange rates (Official, Blue, MEP, CCL), calculate historical averages, and perform universal conversions.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 🚀 Features

### Backend (Python)
- **Real-time Rates**: Live buy/sell prices for all dollar types via `dolarapi.com`.
- **Historical Analysis**: "LINQ-style" average calculation over custom date ranges.
- **Universal Converter**: Smart conversion (e.g., USD -> EUR) using specific Argentine exchange rates.
- **Async Core**: Built on `httpx` for non-blocking high performance.

### Frontend (React + TS)
- **Dashboard**: Card-based view of all current exchange rates.
- **Interactive Tools**: Date pickers for historical analysis and a universal currency converter.
- **Responsive UI**: Adapts to mobile and desktop with a modern dark mode.

## 🛠️ Tech Stack

* **Backend:** FastAPI, Python 3.10+, Uvicorn, Pytest.
* **Frontend:** React 18, TypeScript, Vite, CSS Modules/Grid.

---

## ⚙️ Setup & Installation

This project is organized as a **Monorepo**:
* `/backend`: Python API
* `/frontend`: React Application

### 1. Clone the repo
```bash
git clone [https://github.com/gafederico/currency-api-arg.git](https://github.com/gafederico/currency-api-arg.git)
cd currency-api-arg
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv

# Activate Virtual Environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install Dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

Open a new terminal in the root folder:

```bash
cd frontend
npm install
```

---

## 🏃 Running the App

You need to run both the backend and frontend terminals simultaneously.

### Terminal 1: Backend API

```bash
cd backend
# Runs on [http://127.0.0.1:8000](http://127.0.0.1:8000)
uvicorn main:app --reload
```

### Terminal 2: Frontend Client

```bash
cd frontend
# Runs on http://localhost:5173
npm run dev
```

Visit **`http://localhost:5173`** to use the application.

---

## 📖 API Documentation

The API provides auto-generated documentation via Swagger UI at `http://127.0.0.1:8000/docs`.

### GET `/current`

Returns current rates.

* `type`: (Optional) `oficial`, `blue`, `bolsa`, `ccl`, `cripto`, `tarjeta`.
* **Tip:** Use `type=usd` to get **all** dollar rates at once.

### GET `/average`

Returns the average price for a range.

* `dateStart`: (Required) `YYYY-MM-DD` (Standard ISO Date).
* `dateEnd`: (Required) `YYYY-MM-DD` (Standard ISO Date).
* `type`: `oficial`, `blue`, etc.

### GET `/convert`

Universal currency converter.

* `amount`: Float amount to convert.
* `origin` / `target`: `USD`, `ARS`, `EUR`, `BRL`, `CLP`, `UYU`.
* `dollar_type`: Which dollar rate to use for the conversion (e.g., `blue` vs `oficial`).

---

## 🧪 Testing

Integration tests are available for the backend logic.

```bash
cd backend
pytest -s
```
