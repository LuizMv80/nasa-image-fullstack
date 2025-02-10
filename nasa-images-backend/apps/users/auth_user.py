from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.users_models import PostUser
from db.crud import read_all_with_filter
from tools.utils import verify_password, create_jwt


def auth_user(entry: dict, db: Session) -> str:
    result = read_all_with_filter(db=db, email=entry['email'], filter_by='email')
    if not result:
        raise HTTPException(status_code=404, detail=f'User not found.')
    
    verify = verify_password(entry['password'], result[0].password)
    if not verify:
        raise HTTPException(status_code=401, detail=f'Wrong password.')
    
    return create_jwt(createPayload(result[0]))


def createPayload(user: PostUser) -> dict:
    payload = {}
    payload['uuid'] = user.uuid
    payload['rol'] = user.rol
    payload['names'] = user.names
    payload['last_names'] = user.last_names
    payload['phone_number'] = user.phone_number
    payload['email'] = user.email
    return payload
