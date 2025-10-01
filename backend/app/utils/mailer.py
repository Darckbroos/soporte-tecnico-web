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

def send_email(subject, html, to):
    host = settings.smtp_host
    port = settings.smtp_port
    user = settings.smtp_user
    pwd  = settings.smtp_pass
    from_email = user

    msg = (
        f"From: {settings.email_from_name} <{from_email}>\r\n"
        f"To: {to}\r\n"
        f"Subject: {subject}\r\n"
        "MIME-Version: 1.0\r\n"
        "Content-Type: text/html; charset=utf-8\r\n\r\n"
        f"{html}"
    )

    try:
        with smtplib.SMTP(host, port, timeout=30) as s:
            s.set_debuglevel(1)                # <<< log SMTP en los logs del backend
            s.ehlo()
            s.starttls(context=ssl.create_default_context())
            s.ehlo()
            s.login(user, pwd)
            s.sendmail(from_email, [to], msg)
    except Exception as e:
        print("[mailer] ERROR:", repr(e))
        raise