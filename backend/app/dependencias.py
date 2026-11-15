import sys
import os

from app.models.model_projetos                        import db
from sqlalchemy.orm                               import sessionmaker                                       # type: ignore

# Adiciona o diretório pai ao sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

def pegar_sessao():
     try: 
          Session = sessionmaker(bind=db)
          session = Session()
          yield session
     finally:
          session.close()