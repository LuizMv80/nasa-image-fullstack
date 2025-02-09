from typing import Any
from sqlalchemy import update
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from tools.looger import Logger
from models.users_models import PostUser
from pydantic import UUID4
from uuid import uuid4


def create(db: Session, model: PostUser) -> str:
    """Crea un nuevo registro en la base de datos"""
    if hasattr(model, '_post_inspect'):
         model._post_inspect()
    try:
        db.add(model)
        db.flush()
        return str(model.uuid)
    except SQLAlchemyError as e:
         db.rollback()
         Logger.error(str(e))
         raise Exception(f'DataBase ERROR. {e.__cause__.args[1]}')
    

def read_all_with_filter(
    db: Session,
    uuid: str='',
    email: str = '',
    filter_by: str = 'uuid'
) -> list[PostUser]:

    try:
        query = db.query(PostUser)
        #Busca por uuid o email y que esten activos
        if filter_by == 'uuid':
            query = query.filter(PostUser.uuid == uuid, PostUser.active == True)
        else:
           query = query.filter(PostUser.email == email, PostUser.active == True) 

        resultado = query.all()
        return resultado
    except (SQLAlchemyError, ValueError) as e:
         Logger.error(str(e))
         raise Exception(f'DataBase ERROR. {e.__cause__.args[1]}')

def update_(
    db: Session,
    table: PostUser,
    uuid: str,
    values: dict[str, Any]
) -> int:

    try:
        stmt = update(table).where(PostUser.uuid == uuid, PostUser.active == True).values(**values)
        resultado = db.execute(stmt)

        if hasattr(resultado, 'rowcount'):
            return 1
        return 0
    except (SQLAlchemyError, ValueError) as e:
         Logger.error(str(e))
         raise Exception(f'DataBase ERROR. {e.__cause__.args[1]}')
