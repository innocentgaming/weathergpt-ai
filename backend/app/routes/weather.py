from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.weather_service import get_weather
from app.services.risk_service import calculate_weather_risk

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current")
def get_current_weather_endpoint(
    location: str = Query(..., description="City or coordinates"),
    db: Session = Depends(get_db)
):
    try:
        data = get_weather(db, location)
        risk = calculate_weather_risk(data)
        return {
            "weather": data,
            "risk": risk
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/forecast")
def get_forecast_endpoint(
    location: str = Query(..., description="City or coordinates"),
    db: Session = Depends(get_db)
):
    try:
        data = get_weather(db, location)
        return {
            "location": data["location"],
            "forecast": data.get("forecast", []),
            "source": data["current"]["source"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/climate")
def get_climate_endpoint(
    location: str = Query(..., description="City or coordinates"),
    db: Session = Depends(get_db)
):
    try:
        data = get_weather(db, location)
        return {
            "location": data["location"],
            "climate": data.get("climate", {}),
            "source": data["current"]["source"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


from typing import List, Dict, Any
from pydantic import BaseModel
from concurrent.futures import ThreadPoolExecutor
from app.database import SessionLocal

class BatchWeatherRequest(BaseModel):
    locations: List[str]

@router.post("/batch")
def get_batch_weather_endpoint(req: BatchWeatherRequest):
    """
    Fetches weather & risk scores for multiple locations concurrently in parallel.
    Massively accelerates map rendering and dashboard marker initialization.
    """
    def fetch_single(loc: str) -> Dict[str, Any]:
        thread_db = SessionLocal()
        try:
            w_data = get_weather(thread_db, loc)
            r_data = calculate_weather_risk(w_data)
            return {
                "location": loc,
                "weather": w_data,
                "risk": r_data,
                "success": True
            }
        except Exception as err:
            return {
                "location": loc,
                "error": str(err),
                "success": False
            }
        finally:
            thread_db.close()

    max_workers = min(len(req.locations), 8) if req.locations else 1
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(fetch_single, req.locations))

    return {"results": results, "count": len(results)}

