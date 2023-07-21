export type SubServiceData = {
  id: number;
  name: string;
  serviceTypeId: number;
};

const SUB_SERVICES_DATA: SubServiceData[] = [
  {
    id: 1,
    name: "Traducciones",
    serviceTypeId: 1,
  },
  {
    id: 2,
    name: "Interpretación de lengua extranjera",
    serviceTypeId: 1,
  },
  {
    id: 3,
    name: "Interpretación de lenguaje de signos",
    serviceTypeId: 1,
  },
  {
    id: 4,
    name: "Cantante",
    serviceTypeId: 2,
  },
  {
    id: 5,
    name: "Guitarrista",
    serviceTypeId: 2,
  },
  {
    id: 6,
    name: "Pianista",
    serviceTypeId: 2,
  },
  {
    id: 7,
    name: "Violinista",
    serviceTypeId: 2,
  },
  {
    id: 8,
    name: "Timbalista",
    serviceTypeId: 2,
  },
  {
    id: 9,
    name: "Organizador de eventos",
    serviceTypeId: 3,
  },
  {
    id: 10,
    name: "Organizador de fiestas",
    serviceTypeId: 3,
  },
  {
    id: 11,
    name: "Planificador de bodas",
    serviceTypeId: 3,
  },
  {
    id: 12,
    name: "Payaso",
    serviceTypeId: 3,
  },
  {
    id: 13,
    name: "Mago",
    serviceTypeId: 3,
  },
  {
    id: 14,
    name: "Titiritero",
    serviceTypeId: 3,
  },
  {
    id: 15,
    name: "Coreografías de eventos",
    serviceTypeId: 3,
  },
  {
    id: 16,
    name: "Fotografía de eventos familiares y sociales",
    serviceTypeId: 3,
  },
  {
    id: 17,
    name: "Fotografía",
    serviceTypeId: 4,
  },
  {
    id: 18,
    name: "Edición de fotografía",
    serviceTypeId: 4,
  },
  {
    id: 19,
    name: "Cocinar",
    serviceTypeId: 5,
  },
  {
    id: 20,
    name: "Catering",
    serviceTypeId: 5,
  },
  {
    id: 21,
    name: "Repostería",
    serviceTypeId: 5,
  },
  {
    id: 22,
    name: "Camarero de barra",
    serviceTypeId: 5,
  },
  {
    id: 23,
    name: "Preparación de cocteles",
    serviceTypeId: 5,
  },
  {
    id: 24,
    name: "Peluquero",
    serviceTypeId: 6,
  },
  {
    id: 25,
    name: "Cortes de pelo",
    serviceTypeId: 6,
  },
  {
    id: 26,
    name: "Técnica colorista",
    serviceTypeId: 6,
  },
  {
    id: 27,
    name: "Tratamiento facial",
    serviceTypeId: 6,
  },
  {
    id: 28,
    name: "Masajes de relajación",
    serviceTypeId: 6,
  },
  {
    id: 29,
    name: "Maquillajes sociales",
    serviceTypeId: 6,
  },
  {
    id: 30,
    name: "Manicura",
    serviceTypeId: 6,
  },
  {
    id: 31,
    name: "Pedicura",
    serviceTypeId: 6,
  },
  {
    id: 32,
    name: "Cuidador niños (niñera)",
    serviceTypeId: 7,
  },
  {
    id: 33,
    name: "Albañilería de refractarios",
    serviceTypeId: 8,
  },
  {
    id: 34,
    name: "Albañilería de obra",
    serviceTypeId: 8,
  },
  {
    id: 35,
    name: "Carpintería",
    serviceTypeId: 9,
  },
  {
    id: 36,
    name: "Ebanistería",
    serviceTypeId: 9,
  },
  {
    id: 37,
    name: "Restaurar muebles",
    serviceTypeId: 9,
  },
  {
    id: 38,
    name: "Tallar en madera",
    serviceTypeId: 9,
  },
  {
    id: 39,
    name: "Instalación de tejas",
    serviceTypeId: 10,
  },
  {
    id: 40,
    name: "Instalación de techo concreto",
    serviceTypeId: 10,
  },
  {
    id: 41,
    name: "Instalación de techo de paja",
    serviceTypeId: 10,
  },
  {
    id: 42,
    name: "Instalación de pisos",
    serviceTypeId: 11,
  },
  {
    id: 43,
    name: "Instalación de baldosas",
    serviceTypeId: 11,
  },
  {
    id: 44,
    name: "Instalación de mármol",
    serviceTypeId: 11,
  },
  {
    id: 45,
    name: "Instalación de alfombrado",
    serviceTypeId: 11,
  },
  {
    id: 46,
    name: "Pulir pisos",
    serviceTypeId: 11,
  },
  {
    id: 47,
    name: "Instalación de material aislante térmico",
    serviceTypeId: 12,
  },
  {
    id: 48,
    name: "Instalación de material aislante acústico",
    serviceTypeId: 12,
  },
  {
    id: 49,
    name: "Inyectar y aplicar poliuretano",
    serviceTypeId: 12,
  },
  {
    id: 50,
    name: "Instalar material aislante contra humedad",
    serviceTypeId: 12,
  },
  {
    id: 51,
    name: "Instalar material de insonorización",
    serviceTypeId: 12,
  },
  {
    id: 52,
    name: "Instalar vidrios o cristales",
    serviceTypeId: 13,
  },
  {
    id: 53,
    name: "Creación de vidrierías artísticas",
    serviceTypeId: 13,
  },
  {
    id: 54,
    name: "Instalación de cristal de vehículos",
    serviceTypeId: 13,
  },
  {
    id: 55,
    name: "Instalación de tuberías sanitarias",
    serviceTypeId: 14,
  },
  {
    id: 56,
    name: "Instalación de tuberías de gas",
    serviceTypeId: 14,
  },
  {
    id: 57,
    name: "Instalación de tuberías de ventilación",
    serviceTypeId: 14,
  },
  {
    id: 58,
    name: "Excavación de pozos de agua",
    serviceTypeId: 14,
  },
  {
    id: 59,
    name: "Plomería",
    serviceTypeId: 14,
  },
  {
    id: 60,
    name: "Instalación de aire acondicionado",
    serviceTypeId: 15,
  },
  {
    id: 61,
    name: "Instalación de aparatos de refrigeración",
    serviceTypeId: 15,
  },
  {
    id: 62,
    name: "Reparación de refrigeración",
    serviceTypeId: 15,
  },
  {
    id: 63,
    name: "Reparación de equipo de aire acondicionado",
    serviceTypeId: 15,
  },
  {
    id: 64,
    name: "Pintar edificios",
    serviceTypeId: 16,
  },
  {
    id: 65,
    name: "Empapelar superficies de edificación",
    serviceTypeId: 16,
  },
  {
    id: 66,
    name: "Pintar decorados de cine o teatro",
    serviceTypeId: 16,
  },
  {
    id: 67,
    name: "Barnizar",
    serviceTypeId: 17,
  },
  {
    id: 68,
    name: "Cromar",
    serviceTypeId: 17,
  },
  {
    id: 69,
    name: "Pintar productos industriales",
    serviceTypeId: 17,
  },
  {
    id: 70,
    name: "Pintar productos terminados",
    serviceTypeId: 17,
  },
  {
    id: 71,
    name: "Pintar a soplete",
    serviceTypeId: 17,
  },
  {
    id: 72,
    name: "Pintar vehículos",
    serviceTypeId: 17,
  },
  {
    id: 73,
    name: "Soldar metalurgia",
    serviceTypeId: 18,
  },
  {
    id: 74,
    name: "Soldar en construcción mecánica",
    serviceTypeId: 18,
  },
  {
    id: 75,
    name: "Cortar metales",
    serviceTypeId: 18,
  },
  {
    id: 76,
    name: "Cerrajero",
    serviceTypeId: 19,
  },
  {
    id: 77,
    name: "Diagnóstico, mantenimiento y/o reparación de automóviles o camiones",
    serviceTypeId: 20,
  },
  {
    id: 78,
    name: "Diagnóstico, mantenimiento y/o reparación de autobuses",
    serviceTypeId: 20,
  },
  {
    id: 79,
    name: "Diagnóstico, mantenimiento y/o reparación de tractores",
    serviceTypeId: 20,
  },
  {
    id: 80,
    name: "Diagnóstico, mantenimiento y/o reparación de frenos de automóviles",
    serviceTypeId: 20,
  },
  {
    id: 81,
    name: "Ajustar motores",
    serviceTypeId: 20,
  },
  {
    id: 82,
    name: "Alinear vehículos",
    serviceTypeId: 20,
  },
  {
    id: 83,
    name: "Diagnóstico, mantenimiento y/o reparación de motocicletas",
    serviceTypeId: 20,
  },
  {
    id: 84,
    name: "Electricista automotriz",
    serviceTypeId: 20,
  },
  {
    id: 85,
    name: "Electricista de motores",
    serviceTypeId: 20,
  },
  {
    id: 86,
    name: "Tapicería automotriz",
    serviceTypeId: 20,
  },
  {
    id: 87,
    name: "Lustrar automóviles",
    serviceTypeId: 20,
  },
  {
    id: 88,
    name: "Lavar automóviles",
    serviceTypeId: 20,
  },
  {
    id: 89,
    name: "Reparar bicicletas",
    serviceTypeId: 21,
  },
  {
    id: 90,
    name: "Reparar sillas de ruedas",
    serviceTypeId: 21,
  },
  {
    id: 91,
    name: "Relojero",
    serviceTypeId: 22,
  },
  {
    id: 92,
    name: "Joyería",
    serviceTypeId: 23,
  },
  {
    id: 93,
    name: "Orfebrería",
    serviceTypeId: 23,
  },
  {
    id: 94,
    name: "Bisutería",
    serviceTypeId: 23,
  },
  {
    id: 95,
    name: "Pintar cerámica artesanal y yeso",
    serviceTypeId: 24,
  },
  {
    id: 96,
    name: "Ladrillos",
    serviceTypeId: 24,
  },
  {
    id: 97,
    name: "Alfarería en barro, arcilla o abrasivos",
    serviceTypeId: 24,
  },
  {
    id: 98,
    name: "Artesanía en madera",
    serviceTypeId: 25,
  },
  {
    id: 99,
    name: "Escobero",
    serviceTypeId: 25,
  },
  {
    id: 100,
    name: "Cestas o canastas",
    serviceTypeId: 25,
  },
  {
    id: 101,
    name: "Fabricar muebles de mimbre",
    serviceTypeId: 25,
  },
  {
    id: 102,
    name: "Artesanía de artículos de piedra",
    serviceTypeId: 25,
  },
  {
    id: 103,
    name: "Crear arreglos florales",
    serviceTypeId: 25,
  },
  {
    id: 104,
    name: "Electricista de construcción",
    serviceTypeId: 26,
  },
  {
    id: 105,
    name: "Instalaciones eléctricas",
    serviceTypeId: 26,
  },
  {
    id: 106,
    name: "Reparación de aparatos eléctricos",
    serviceTypeId: 26,
  },
  {
    id: 107,
    name: "Instalación de ascensores",
    serviceTypeId: 26,
  },
  {
    id: 108,
    name: "Diagnóstico, reparación y mantenimiento de ascensores",
    serviceTypeId: 26,
  },
  {
    id: 109,
    name: "Sombreros",
    serviceTypeId: 27,
  },
  {
    id: 110,
    name: "Bordados",
    serviceTypeId: 27,
  },
  {
    id: 111,
    name: "Prendas de vestir de tela",
    serviceTypeId: 27,
  },
  {
    id: 112,
    name: "Prendas de vestir de cuero o piel",
    serviceTypeId: 27,
  },
  {
    id: 113,
    name: "Tapicería de mobiliario",
    serviceTypeId: 28,
  },
  {
    id: 114,
    name: "Fabricar o reparar colchones",
    serviceTypeId: 28,
  },
  {
    id: 115,
    name: "Teñir calzados",
    serviceTypeId: 29,
  },
  {
    id: 116,
    name: "Fabricar calzado ortopédico",
    serviceTypeId: 29,
  },
  {
    id: 117,
    name: "Fabricar calzado de cuero",
    serviceTypeId: 29,
  },
  {
    id: 118,
    name: "Controlar plagas",
    serviceTypeId: 30,
  },
  {
    id: 119,
    name: "Controlar malezas",
    serviceTypeId: 30,
  },
  {
    id: 120,
    name: "Fumigar",
    serviceTypeId: 30,
  },
  {
    id: 121,
    name: "Limpieza doméstica",
    serviceTypeId: 31,
  },
  {
    id: 122,
    name: "Limpieza de fachadas de edificaciones",
    serviceTypeId: 31,
  },
  {
    id: 123,
    name: "Limpieza de oficina/establecimiento empresarial",
    serviceTypeId: 31,
  },
  {
    id: 124,
    name: "Limpieza de edificio de apartamentos",
    serviceTypeId: 31,
  },
  {
    id: 125,
    name: "Limpieza de establecimientos",
    serviceTypeId: 31,
  },
  {
    id: 126,
    name: "Limpieza de baños",
    serviceTypeId: 31,
  },
  {
    id: 127,
    name: "Lavar prendas de vestir",
    serviceTypeId: 32,
  },
  {
    id: 128,
    name: "Planchar prendas de vestir",
    serviceTypeId: 32,
  },
  {
    id: 129,
    name: "Lavar ventanas",
    serviceTypeId: 33,
  },
  {
    id: 130,
    name: "Recogida de basura",
    serviceTypeId: 34,
  },
  {
    id: 131,
    name: "Mudanza y acarreo",
    serviceTypeId: 35,
  },
  {
    id: 132,
    name: "Mensajería",
    serviceTypeId: 36,
  },
];

export default SUB_SERVICES_DATA;
