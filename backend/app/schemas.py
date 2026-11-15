from pydantic       import BaseModel         # type: ignore
from typing         import Optional

class ProjetosSchema(BaseModel):     
     nome: str
     TecID: int
     Imagem: str
     ano: int
     categorias: str
     desc: str

     class Config:
          from_attributes = True

class LoginSchema(BaseModel):
     senha: str