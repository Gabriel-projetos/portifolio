import sys
import os
from fastapi                            import FastAPI                                                     # type: ignore
from fastapi.middleware.cors            import CORSMiddleware                                              # type: ignore
from dotenv                             import load_dotenv                                                 # type: ignore

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

# cd backend
# venv\Scripts\activate
# uvicorn app.main:app --reload --port 3001

# Adiciona o diretório pai ao sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Importações dos módulos
import app.routes.auth_routes           as auth_routes
import app.routes.projetos_routes       as projetos_routes
import app.text_mail                    as text_mail

# Importação dos roteadores
from app.routes.auth_routes             import auth_router
from app.routes.projetos_routes         import projetos_router
from app.text_mail                      import email_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão dos roteadores
app.include_router(auth_router)
app.include_router(email_router)
app.include_router(projetos_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}
