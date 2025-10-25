import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomeServicesStrip from "../components/HomeServicesStrip";

export default function Home() {
  return (
    <>
      <section className="hero-home">
        <div className="container">
          <h1>Reparación y mantenimiento de computadoras</h1>
          <p className="lead">
            Soluciones rápidas y confiables para tus problemas tecnológicos. Tu
            PC, laptop o Mac en manos de expertos.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/contacto">Solicitar Soporte</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/servicios">Ver Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeServicesStrip />

      <section className="container py-16 text-center">
        <h2>¿Listo para empezar?</h2>
        <p className="lead mt-4 mb-8">
          No dejes que los problemas técnicos te detengan. ¡Contáctanos y recupera
          la tranquilidad!
        </p>
        <Button asChild size="lg">
          <Link to="/contacto">Contáctanos Ahora</Link>
        </Button>
      </section>
    </>
  );
}
