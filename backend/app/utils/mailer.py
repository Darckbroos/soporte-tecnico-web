# backend/app/utils/mailer.py
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from ..settings import settings

def build_lead_email(lead) -> tuple[str, str]:
    subject = f"[FixPC] Nueva solicitud de soporte: {lead.name}"
    html = f"""
    <h2>Nueva solicitud</h2>
    <ul>
      <li><b>Nombre:</b> {lead.name}</li>
      <li><b>Email:</b> {lead.email}</li>
      <li><b>Teléfono:</b> {lead.phone or '-'}</li>
      <li><b>Ciudad:</b> {lead.city or '-'}</li>
      <li><b>Fuente:</b> {lead.source or '-'}</li>
    </ul>
    <p>{lead.message}</p>
    """
    return subject, html

def send_email(*, subject: str, html: str, to: str | None = None) -> None:
    to_addr = to or settings.notify_email
    if not to_addr:
        print("[mailer] Falta NOTIFY_EMAIL; no se envía.")
        return

    msg = MIMEMultipart("alternative")
    msg["From"] = settings.smtp_user or settings.notify_email
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg.attach(MIMEText(html, "html"))

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            server.starttls(context=context)
            server.login(settings.smtp_user, settings.smtp_pass)
            server.sendmail(msg["From"], [to_addr], msg.as_string())
        print(f"[mailer] Correo enviado OK a {to_addr}")
    except Exception as e:
        # Deja el error visible en logs
        print(f"[mailer] ERROR enviando correo: {type(e).__name__}: {e}")