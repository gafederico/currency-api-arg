from fastapi import FastAPI, HTTPException, Query
import httpx
from statistics import mean
from datetime import date, datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
BASE_URL = "https://dolarapi.com/v1"
HISTORICAL_URL = "https://api.argentinadatos.com/v1/cotizaciones/dolares/"

# Map for user convenience
MONEDA_MAP = {
    "usd": "dolares",
    "eur": "cotizaciones/eur",
    "brl": "cotizaciones/real",
    "clp": "cotizaciones/chile",
    "uyu": "cotizaciones/uruguay"
}

async def fetch_rate(path: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/{path}")
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Currency or Type not found")
        return response.json()

@app.get("/current")
async def get_current(type: str = "oficial"):
    """Fetch current prices for a specific dollar type or other currencies."""
    # If user asks for 'eur' or 'brl' directly in the type
    path = MONEDA_MAP.get(type.lower(), f"dolares/{type.lower()}")
    return await fetch_rate(path)

@app.get("/average")
async def get_average(dateStart: date, dateEnd: date, type: str = "oficial"):
    """Calculates historical average using LINQ-style comprehensions."""
    # Map user-friendly types to API types
    casa_map = {"ccl": "contadoconliqui", "mep": "bolsa"}
    casa = casa_map.get(type.lower(), type.lower())

    async with httpx.AsyncClient() as client:
        r = await client.get(HISTORICAL_URL, headers={"User-Agent": "FastAPI-App"})
        r.raise_for_status()
        data = r.json()

        prices = [
            d["venta"] for d in data 
            if d["casa"] == casa and 
            dateStart <= datetime.strptime(d["fecha"], "%Y-%m-%d").date() <= dateEnd
        ]

        if not prices:
            raise HTTPException(status_code=404, detail="No records found.")
            
        return {
            "average": round(mean(prices), 2),
            "days": len(prices),
            "type": type.lower()
        }

@app.get("/convert")
async def convert(
    amount: float, 
    origin: str, 
    target: str, 
    dollar_type: str = "oficial"
):
    """
    Universal Converter. 
    Examples: 
    - USD to EUR: Uses dollar_type for USD->ARS, then ARS->EUR.
    - ARS to USD: Uses dollar_type for ARS->USD.
    """
    origin, target = origin.lower(), target.lower()
    
    # 1. Get ARS values for both
    # For USD, we use the specific dollar_type (Blue, Oficial, etc.)
    rate_origin_ars = 1.0
    rate_target_ars = 1.0

    if origin != "ars":
        path = f"dolares/{dollar_type}" if origin == "usd" else MONEDA_MAP.get(origin, f"cotizaciones/{origin}")
        data = await fetch_rate(path)
        rate_origin_ars = data["compra"] # We sell the origin currency to get ARS

    if target != "ars":
        path = f"dolares/{dollar_type}" if target == "usd" else MONEDA_MAP.get(target, f"cotizaciones/{target}")
        data = await fetch_rate(path)
        rate_target_ars = data["venta"] # We use ARS to buy the target currency

    # 2. Calculate: (Amount * Origin_in_ARS) / Target_in_ARS
    converted = (amount * rate_origin_ars) / rate_target_ars

    return {
        "from": f"{amount} {origin.upper()}",
        "to": f"{round(converted, 2)} {target.upper()}",
        "using_dollar_type": dollar_type
    }