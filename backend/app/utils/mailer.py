# backend/app/utils/mailer.py
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from ..settings import settings

def build_lead_email(lead):
    subject = f"{settings.email_subject_prefix} Nuevo lead: {lead.nombre}"
    html = f"""
    <h2>Nuevo lead desde la web</h2>
    <ul>
      <li><b>Nombre:</b> {lead.nombre}</li>
      <li><b>Correo:</b> {lead.correo}</li>
      <li><b>Teléfono:</b> {lead.telefono or '-'}</li>
      <li><b>Comuna:</b> {lead.comuna or '-'}</li>
      <li><b>Mensaje:</b><br/>{lead.mensaje}</li>
      <li><b>Fuente:</b> {lead.source or 'web'}</li>
      <li><b>Fecha:</b> {lead.created_at}</li>
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