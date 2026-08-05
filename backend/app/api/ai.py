from fastapi import APIRouter

from app.schemas.ai import (
    AIRequest,
    AIResponse,
)

from app.services.ai_service import ask_gemini

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post(
    "/chat",
    response_model=AIResponse,
)
def chat(request: AIRequest):

    answer = ask_gemini(
        request.question
    )

    return AIResponse(
        answer=answer
    )