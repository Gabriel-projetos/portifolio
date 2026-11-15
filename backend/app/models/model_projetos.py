from sqlalchemy               import create_engine, Column, String, Integer, ForeignKey                       # type: ignore
from sqlalchemy.orm           import declarative_base                                                         # type: ignore

# Cria a conexão com seu banco
db = create_engine("sqlite:///projetos.db")

# Cria a base do seu banco de dados
Base = declarative_base()

# Criar as classes/tabelas do banco
class Tecnologia(Base):
     __tablename__ = "Tecnologia"

     id = Column("id", Integer, primary_key=True, autoincrement=True)
     logo = Column("Image", String)

     def __int__(self, logo):
          self.logo = logo

class Projeto(Base):
     __tablename__ = "projetos"

     id = Column("id", Integer, primary_key=True, autoincrement=True)
     nome = Column("nome", String, nullable=False)
     TecID = Column("TecId", Integer, ForeignKey(Tecnologia.id))
     Image = Column("Image", String)
     ano = Column("ano", Integer)
     categorias = Column("categorias", String) # Design, Front, Back, Faculdade, Estudo de Caso
     desc = Column("desc", String)

     def __init__(self, nome, TecId, Image, desc, ano, categorias):
          self.nome = nome
          self.TecID = TecId
          self.Image = Image
          self.desc = desc
          self.ano = ano
          self.categorias = categorias
