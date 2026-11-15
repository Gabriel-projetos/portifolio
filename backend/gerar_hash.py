# gerar_hash.py
import bcrypt #type: ignore

# Coloque a senha que você deseja usar no painel
senha_plana = "163598"

# Gera o salt e o hash de forma segura
bytes_senha = senha_plana.encode('utf-8')
salt = bcrypt.gensalt()
hash_bytes = bcrypt.hashpw(bytes_senha, salt)

# Converte para string para salvar no .env
hash_str = hash_bytes.decode('utf-8')

print("\n--------------------------------------------------")
print("COPIE E COLE O HASH ABAIXO NO SEU ARQUIVO .env:")
print(f'ADMIN_PASSWORD_HASH="{hash_str}"')
print("--------------------------------------------------\n")