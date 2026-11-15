import os
from fastapi                                      import APIRouter, HTTPException                                   #type: ignore
from app.schemas                                  import LoginSchema
from passlib.context                              import CryptContext                                               #type: ignore
from jose                                         import jwt, JWTError                                              #type: ignore
from datetime                                     import datetime, timedelta, timezone                              #type: ignore

auth_router = APIRouter(prefix="/auth", tags=["auth"])
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# === Autenticação e JWT =====================================
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

def criar_token(duracao_token=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    expiracao = datetime.now(timezone.utc) + duracao_token
    payload = {
        "sub": "admin",
        "exp": expiracao
    }

    token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
    return token

def verificar_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub") == "admin"
    except JWTError:
        return False

def autenticar_usuario(senha):
    if not ADMIN_PASSWORD_HASH or not SECRET_KEY:
        return False

    return bcrypt_context.verify(senha, ADMIN_PASSWORD_HASH)

# === Rotas =====================================
@auth_router.get("/")
async def autenticar():
    """
    Essa rota serve apenas para autenticar a senha que eu colocar pra entrar na admin do meu site
    """
    return {"mensagem": "Você autenticou"}

# login-> senha -> toekn JWT (JSON Web Token)
@auth_router.post("/login")
async def login(login_schema: LoginSchema):
    usuario = autenticar_usuario(login_schema.senha)

    if not usuario:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")
    else:
        access_token = criar_token()
        refresh_token = criar_token(duracao_token=timedelta(days=7))
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

@auth_router.get("/refresh")
async def use_refresh_token(token):
    if not verificar_token(token): return False

    access_token = criar_token()
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
