
import os
from fastapi import APIRouter, Request
from transbank.webpay.webpay_plus.transaction import Transaction

# --- Configuración de Webpay ---
# En un entorno real, estas credenciales deberían estar en variables de entorno
# y no directamente en el código. Para este ejemplo, usaremos las de prueba.
WEBPAY_PLUS_CODE = "597055555532"
WEBPAY_PLUS_API_KEY = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1B"
WEBPAY_ENVIRONMENT = "INTEGRACION"  # Ambiente de pruebas de Transbank

# --- Inicialización de la transacción de Webpay ---
tx = Transaction()
tx.configure_for_integration(WEBPAY_PLUS_CODE, WEBPAY_PLUS_API_KEY)

# --- Router de FastAPI ---
router = APIRouter()

@router.post("/create")
async def create_webpay_transaction(request: Request):
    """
    Crea una transacción en Webpay Plus.
    """
    # Estos valores deberían venir del frontend o de una base de datos
    buy_order = "orden-compra-123"
    session_id = "sesion-123"
    amount = 1000  # Monto de ejemplo
    return_url = str(request.url_for('webpay_return'))

    try:
        response = tx.create(buy_order, session_id, amount, return_url)
        # El frontend usará esta URL para redirigir al usuario a Webpay
        return {"url": response.get("url"), "token": response.get("token")}
    except Exception as e:
        return {"error": str(e)}

@router.get("/return", name="webpay_return")
async def webpay_return(token_ws: str):
    """
    Página de retorno desde Webpay. El usuario es redirigido aquí.
    Aquí confirmamos la transacción.
    """
    try:
        # Confirmamos la transacción con el token recibido
        response = tx.commit(token_ws)

        # Aquí es donde manejas el resultado del pago
        if response.get("status") == "AUTHORIZED":
            # El pago fue exitoso
            # TODO:
            # 1. Actualizar el estado de la compra en tu base de datos.
            # 2. Mostrar una página de "pago exitoso" al usuario.
            return {"status": "success", "response": response}
        else:
            # El pago fue rechazado o falló
            # TODO:
            # 1. Actualizar el estado en tu base de datos.
            # 2. Mostrar una página de "pago fallido" al usuario.
            return {"status": "failed", "response": response}

    except Exception as e:
        # Hubo un error al confirmar la transacción
        return {"status": "error", "error": str(e)}
