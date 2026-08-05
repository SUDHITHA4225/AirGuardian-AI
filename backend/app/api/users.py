from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_db
from app.core.security import (
    get_current_user,
    hash_password,
    verify_password,
)
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "is_active": current_user.is_active,
    }


@router.put("/me")
def update_profile(
    full_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    current_user.full_name = full_name

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
        },
    }


@router.put("/change-password")
def change_password(
    current_password: str,
    new_password: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not verify_password(
        current_password,
        current_user.hashed_password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    current_user.hashed_password = hash_password(new_password)

    db.commit()

    return {
        "message": "Password changed successfully"
    }