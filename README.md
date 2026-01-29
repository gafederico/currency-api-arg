# CurrencyAPI Argentina

A high-performance, asynchronous API built with **Python** and **FastAPI** to track Argentine currency exchange rates (Official, Blue, MEP, CCL) and perform universal conversions.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 🚀 Features

- **Current Rates**: Real-time buy/sell prices for all dollar types (Oficial, Blue, Bolsa, etc.).
- **Historical Averages**: Calculate average exchange rates between two dates using LINQ-style logic.
- **Universal Converter**: Convert between USD, ARS, EUR, and more (automatically uses the specified dollar type for conversions).
- **Async Architecture**: Non-blocking requests using `httpx` for maximum performance.
- **Auto-Documentation**: Built-in Swagger UI and ReDoc support.

## 🛠️ Tech Stack

- **Framework**: FastAPI
- **Testing**: Pytest & Pytest-asyncio

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.14+
- VS Code (Recommended)

### Local Environment

1. **Clone the repo:**
   ```bash
   git clone https://github.com/gafederico/currency-api-arg.git
   cd currency-api-arg
   ```

2. **Create and activate a Virtual Environment:**
   ```bash
   python -m venv .venv
   # Windows
   .venv\Scripts\activate
   # Linux/macOS
   source .venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## 🏃 Running the API
Start the development server with hot-reload enabled:
   ```bash
   uvicorn main:app --reload
   ```

* **API Base**: `http://127.0.0.1:8000`
* **Swagger Docs**: `http://127.0.0.1:8000/docs` (Interactive UI)

## 🧪 Testing

The project uses `pytest` for automated integration tests.
To run all tests:
   ```bash
   pytest
   ```

To see detailed output (including print statements):
   ```bash
   pytest -s
   ```

## 📖 API Documentation

### GET `/current`

Returns current rates.

* `type`: (Optional) `oficial`, `blue`, `bolsa`, `ccl`. Default: `oficial`.

### GET `/average`

Returns the average price for a range.

* `dateStart`: (Required) `DD/MM/YYYY`
* `dateEnd`: (Required) `DD/MM/YYYY`
* `type`: `oficial`, `blue`, etc.

### GET `/convert`

Universal currency converter.

* `amount`: Float
* `origin`: `USD`, `ARS`, `EUR`, `BRL`
* `target`: `USD`, `ARS`, `EUR`, `BRL`
* `type`: The dollar type to use for the rate.
