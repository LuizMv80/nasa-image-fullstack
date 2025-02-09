import jwt
import bcrypt
import datetime
from dotenv import dotenv_values
from fastapi import HTTPException, Security
from fastapi.security import OAuth2PasswordBearer


env = dotenv_values(".env")
SECRET_KEY = str(env["JWT_KEY"])
ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    """Aplica un hash a la contraseña para guardarla de forma segura"""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)  # Hashea la contraseña
    return hashed_password.decode()


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


def create_jwt(payload: dict, expires_in: int = 3600) -> dict:
    """Genera un JWT seguro con expiración."""
    expiration = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
    payload["exp"] = str(expiration)
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    payload["token"] = token
    return payload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_jwt(payload: dict, expires_in: int = 3600) -> dict:
    """Genera un JWT seguro con expiración."""
    expiration = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
    payload["exp"] = expiration.timestamp()
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    payload["token"] = token
    payload["token_type"] = "bearer"
    return payload


def verify_jwt(token: str = Security(oauth2_scheme)) -> dict:
    """Verifica y decodifica un JWT antes de acceder a una ruta protegida."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        exp = payload.get("exp")
        if exp and datetime.datetime.utcnow().timestamp() > exp:
            raise HTTPException(status_code=401, detail="Token expired.")

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired.")
    except:
        raise HTTPException(status_code=401, detail="Invalid token.")
