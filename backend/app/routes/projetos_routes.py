import sys
import os
from fastapi                                      import APIRouter, Depends, HTTPException                          # type: ignore

# Importações BD
from app.models.model_projetos                    import Projeto, db
from app.schemas                                  import ProjetosSchema
from sqlalchemy.orm                               import Session                                                    # type: ignore

# Importando dependencias
from app.dependencias                             import pegar_sessao

# Adiciona o diretório pai ao sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
projetos_router = APIRouter(prefix="/projetos", tags=["projetos"])

@projetos_router.get("/")
async def autenticar():
    """
    Essa rota serve apenas para autenticar a senha que eu colocar pra entrar na admin do meu site
    """
    return {"mensagem": "Você autenticou"}

@projetos_router.post("/criar-projeto")
async def novo_projeto(
          projeto_data: ProjetosSchema, 
          session: Session = Depends(pegar_sessao)
     ):
     projeto = session.query(Projeto).filter(Projeto.nome==projeto_data.nome).first()
     if projeto:
          raise HTTPException(status_code=400, detail="Projeto já cadastrado")
     else:
          novo = Projeto(
               projeto_data.nome, 
               projeto_data.TecID, 
               projeto_data.Imagem, 
               projeto_data.ano, 
               projeto_data.categorias, 
               projeto_data.desc
          )

          session.add(novo)
          session.commit()
          return {"mensagem": "Projeto cadastrado"}
