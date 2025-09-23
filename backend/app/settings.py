import os
from dotenv import load_dotenv

load_dotenv()  # lee .env o el --env-file que pase uvicorn

def parse_origins(raw: str) -> list[str]:
    return [o.strip() for o in (raw or "").split(",") if o.strip()]

class Settings:
    def __init__(self):
        # DB: por defecto SQLite para que el dev local funcione
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///./dev.db")

        # CORS
        self.cors_origins = parse_origins(
            os.getenv("CORS_ORIGINS", "http://localhost:5173")
        )

        # Email (por si lo usas)
        self.notify_email = os.getenv("NOTIFY_EMAIL", "")
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER", "")
        self.smtp_pass = os.getenv("SMTP_PASS", "")
        self.email_from_name = os.getenv("EMAIL_FROM_NAME", "FixPC")
        self.email_subject_prefix = os.getenv("EMAIL_SUBJECT_PREFIX", "[FixPC]")

settings = Settings()