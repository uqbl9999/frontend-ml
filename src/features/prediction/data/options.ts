export const predictionFieldOptions = {
  department: [
    { label: "Cusco", value: "cusco" },
    { label: "Lima", value: "lima" },
    { label: "Arequipa", value: "arequipa" },
  ],
  province: [
    { label: "Cusco", value: "cusco" },
    { label: "Urubamba", value: "urubamba" },
    { label: "Paucartambo", value: "paucartambo" },
  ],
  lifeStage: [
    { label: "Niño", value: "niño" },
    { label: "Adolescente", value: "adolescente" },
    { label: "Adulto", value: "adulto" },
  ],
  screeningType: [
    { label: "Violencia Familiar", value: "violencia-familiar" },
    { label: "Trastorno de Ansiedad", value: "ansiedad" },
    { label: "Depresión", value: "depresion" },
  ],
  sex: [
    { label: "Femenino", value: "femenino" },
    { label: "Masculino", value: "masculino" },
  ],
  month: [
    { label: "Enero", value: "enero" },
    { label: "Junio", value: "junio" },
    { label: "Noviembre", value: "noviembre" },
  ],
} as const;
