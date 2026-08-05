from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def health():
    return {
        "status": "healthy",
        "service": "AirGuardian AI Backend",
    }