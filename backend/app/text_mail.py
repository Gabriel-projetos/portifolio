from fastapi import APIRouter
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import BaseModel
from dotenv import dotenv_values

credenciais = dotenv_values(".env")

email_router = APIRouter(prefix="/email", tags=["email"])

class EmailContent(BaseModel):
    nome: str
    email: str
    mensagem: str

conf = ConnectionConfig(
    MAIL_USERNAME=credenciais.get("MAIL_USERNAME", ""),
    MAIL_PASSWORD=credenciais.get("MAIL_PASSWORD", ""),
    MAIL_FROM=credenciais.get("MAIL_USERNAME", ""),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_FROM_NAME="Portfólio - Formulário de Contato",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@email_router.post("/")
async def send_email(content: EmailContent):
    html = f"""
    <h3>Novo contato pelo portfólio</h3>
    <p><strong>Nome:</strong> {content.nome}</p>
    <p><strong>E-mail:</strong> {content.email}</p>
    <p><strong>Mensagem:</strong> {content.mensagem}</p>
    """

    message = MessageSchema(
        subject=f"Novo contato de {content.nome}",
        recipients=[credenciais.get("MAIL_USERNAME", "")],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)

    return JSONResponse(status_code=200, content={"message": "E-mail enviado com sucesso"})