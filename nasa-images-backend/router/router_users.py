import uuid
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, Response, status, Body
from tools.utils import verify_jwt
from db.database_conf import get_db
from entities.user_entitie import PostUserEntitie, PutUserEntitie
from apps.users.user import post_user, get_user, put_user, delete_user


router_users = APIRouter(tags=['Users'])
"""Router de gestion de registro de usuarios"""


@router_users.post(
    '/users',
    description='Create a new user.',
    status_code=status.HTTP_200_OK
)
def post_user_router(
    data: Annotated[PostUserEntitie, Body(description='User register.')],
    response: Response,
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Router encargado de registrar un usuario.
    """
    response = post_user(data.model_dump(), db)
    db.commit()
    return JSONResponse(content={'detail': response}, status_code=201)


@router_users.get(
    '/users',
    description='Query an user.',
    status_code=status.HTTP_200_OK
)
def get_user_router(
    response: Response,
    user_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Router encargado de consultar un usuario.
    """
    response = get_user(user_data['uuid'], db)
    user_dict = response.model_dump()
    user_dict['phone_number'] = user_dict['phone_number'][3:]
    return JSONResponse(content={'detail': user_dict}, status_code=200)


@router_users.put(
    '/users',
    description='Update data user.',
    status_code=status.HTTP_200_OK
)
def put_user_router(
    data: Annotated[PutUserEntitie, Body(description='Entity use to update user data.')],
    user_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Router encargado de registrar un usuario.
    """
    put_user(data, db)
    db.commit()
    dict_user = data.model_dump()
    return JSONResponse(content={'detail': dict_user}, status_code=200)


@router_users.delete(
    '/users',
    description='Delete user.',
    status_code=status.HTTP_200_OK
)
def put_user_router(
    user_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
) -> JSONResponse:
    """Router encargado de registrar un usuario.
    """
    result = delete_user(uuid.UUID(user_data['uuid']), db)
    db.commit()
    return JSONResponse(content={'detail': result}, status_code=200)
