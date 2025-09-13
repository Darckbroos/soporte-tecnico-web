import os
from dotenv import load_dotenv

load_dotenv()

def parse_origins(raw: str) -> list[str]:
    if not raw:
        return ["*"]
    return [o.strip() for o in raw.split(",") if o.strip()]

class Settings:
    cors_origins = parse_origins(os.getenv("CORS_ORIGINS", ""))

class Settings:
    cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
    notify_email = os.getenv("NOTIFY_EMAIL", "")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    email_from_name = os.getenv("EMAIL_FROM_NAME", "FixPC")
    email_subject_prefix = os.getenv("EMAIL_SUBJECT_PREFIX", "[FixPC]")


settings = Settings()
