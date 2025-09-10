# Sitio de Soporte Técnico – Stack Docker (React + FastAPI + Postgres)

Este proyecto despliega una landing simple y profesional para ofrecer servicios de soporte técnico,
más un backend mínimo que guarda los contactos (leads) en PostgreSQL.

## Stack
- **Frontend:** React (Vite + TypeScript) servido por Nginx
- **Backend:** FastAPI + SQLAlchemy + Uvicorn
- **DB:** PostgreSQL 16
- **Orquestación:** Docker Compose

## Puesta en marcha (local / servidor)
1. Copia `.env.example` a `.env` dentro de `backend/` y ajusta valores si deseas.
2. En la raíz, ejecuta:
   ```bash
   docker compose up -d --build
   ```
3. Abre: http://localhost/ para ver la web.
4. API docs: http://localhost:8000/docs

## Variables relevantes
- Frontend lee `VITE_API_BASE` (inyectada por Docker) para llamar a la API.
- Backend usa `DATABASE_URL` para conectarse a Postgres y `CORS_ORIGINS` para permitir el origen del frontend.

## Despliegue con dominio
- Apunta tu dominio o subdominio a la IP del servidor (A-record).
- Si ya usas Traefik/Nginx reverse-proxy con SSL, publica `frontend:80` como `https://tu-dominio.cl` y rutea `/api` al backend.
- Alternativa rápida: expón `:80` y `:8000` y usa un proxy inverso delante (recomendado).

## Estructura
```
frontend/   # React + Vite + Tailwind-lite (CSS simple)
backend/    # FastAPI + SQLAlchemy
docker-compose.yml
```

## Licencia
MIT
