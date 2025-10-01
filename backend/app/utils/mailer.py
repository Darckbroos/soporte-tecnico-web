# backend/app/utils/mailer.py
import smtplib, ssl, traceback
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
      <li><b>Mensaje:</b><br>{lead.mensaje}</li>
      <li><b>Fuente:</b> {lead.source or 'web'}</li>
      <li><b>Fecha:</b> {lead.created_at}</li>
    </ul>
    """
    return subject, html

def send_email(subject: str, html: str, to: str):
    """Envía el correo y LOGUEA cualquier excepción (para verla en `docker compose logs backend`)."""
    try:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = f"{settings.email_from_name} <{settings.smtp_user}>"
        msg["To"] = to
        msg.set_content("Versión de texto")
        msg.add_alternative(html, subtype="html")

        ctx = ssl.create_default_context()
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30) as s:
            s.ehlo()
            s.starttls(context=ctx)
            s.ehlo()
            s.login(settings.smtp_user, settings.smtp_pass)
            s.send_message(msg)
        print("[mailer] ENVIADO OK a", to)
    except Exception:
        print("[mailer] ERROR EN SMTP:")
        traceback.print_exc()