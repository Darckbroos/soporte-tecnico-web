// Todas las comunas de la Región Metropolitana (52)
export const COMUNAS_RM: string[] = [
  // Provincia de Santiago
  "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba",
  "Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina",
  "Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa",
  "Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura",
  "Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón",
  "Vitacura","Santiago",

  // Provincia de Chacabuco
  "Colina","Lampa","Tiltil",

  // Provincia de Cordillera
  "Puente Alto","Pirque","San José de Maipo",

  // Provincia de Maipo
  "Buin","Calera de Tango","Paine","San Bernardo",

  // Provincia de Melipilla
  "Melipilla","Alhué","Curacaví","María Pinto","San Pedro",

  // Provincia de Talagante
  "Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"
].sort((a, b) => a.localeCompare(b, "es"));
