import uuid
from pydantic import UUID4
from fastapi import HTTPException
from sqlalchemy.orm import Session
from tools.utils import hash_password
from models.users_models import PostUser
from db.crud import create, update_, read_all_with_filter
from entities.user_entitie import UserEntitie, PutUserEntitie


def post_user(entry: dict, db: Session) -> str:
    """Metodo para registrar un usuario en la BD"""
    del entry['confirm_password']
    result = read_all_with_filter(db, entry['uuid'])
    if result:
        raise HTTPException(status_code=404, detail=f'This user already exists.')
    entry['password'] = hash_password(entry['password'])
    entry['uuid'] = str(uuid.uuid4())
    entry['rol'] = 'b9697d6c-00f9-4e76-b6b5-7c60b135f17d'
    new_user = PostUser(**entry)
    return create(db, new_user)


def get_user(uuid: str, db: Session) -> UserEntitie:
    """Metodo para consultar un usuario en la BD"""
    result = read_all_with_filter(db=db, uuid=uuid)
    if not result:
        raise HTTPException(status_code=404, detail=f'User not found.')
    return UserEntitie.model_validate(result[0])


def put_user(entry: PutUserEntitie, db: Session) -> int:
    """Metodo para actualizar datos de un usuario en la BD"""
    values = {
        PostUser.names.name: entry.names,
        PostUser.last_names.name: entry.last_names,
        PostUser.phone_number.name: entry.phone_number,
    }
    return update_(db, PostUser, entry.uuid, values)


def delete_user(uuid: UUID4, db: Session) -> int:
    """
    Metodo para registrar un usuario en la BD (solo se hace un borrado lógico)
    """
    values = {PostUser.active.name: False}
    return update_(db, PostUser, uuid, values)
