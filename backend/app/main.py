from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine

import app.models

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.sensors import router as sensors_router
from app.api.alerts import router as alerts_router
from app.api.ai import router as ai_router
from app.api.devices import router as devices_router
from app.api.reports import router as reports_router

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="AirGuardian AI Backend API",
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Database
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# Routes
# -----------------------------
app.include_router(
    health_router,
    prefix="/health",
    tags=["Health"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(sensors_router)
app.include_router(alerts_router)
app.include_router(ai_router)
app.include_router(devices_router)
app.include_router(reports_router)

@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
    }