import os
from dotenv import load_dotenv

load_dotenv()

def parse_origins(raw: str) -> list[str]:
    if not raw:
        return ["*"]
    return [o.strip() for o in raw.split(",") if o.strip()]

class Settings:
    cors_origins = parse_origins(os.getenv("CORS_ORIGINS", ""))

settings = Settings()
