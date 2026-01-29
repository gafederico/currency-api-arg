import pytest
from httpx import ASGITransport, AsyncClient
from main import app

@pytest.mark.anyio
async def test_get_current_oficial():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/current?type=oficial")
    
    assert response.status_code == 200
    data = response.json()
    assert "compra" in data
    assert data["moneda"] == "USD"

@pytest.mark.anyio
async def test_get_average_blue():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/average?dateStart=2024-01-01&dateEnd=2024-01-10&type=blue")
    
    assert response.status_code == 200
    data = response.json()
    assert "average" in data
    assert data["type"] == "blue"

@pytest.mark.anyio
async def test_convert_usd_to_ars():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/convert?amount=100&origin=USD&target=ARS&type=oficial")
    
    assert response.status_code == 200
    data = response.json()
    assert "to" in data
    assert "ARS" in data["to"]