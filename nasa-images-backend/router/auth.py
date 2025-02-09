from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, Response, status, Body
from db.database_conf import get_db
from entities.auth_entitie import Auth
from apps.users.auth_user import auth_user


router_auth = APIRouter(tags=["Auth"])
"""Router de gestion de registro de usuarios"""


@router_auth.post(
    "/auth",
    description="Auth.",
    status_code=status.HTTP_200_OK
)
def auth(
    data: Annotated[Auth, Body(description="User register.")],
    response: Response,
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Router encargado de registrar un usuario.
    """
    response = auth_user(data.model_dump(), db)
    return JSONResponse(content={"detail": response}, status_code=200)
