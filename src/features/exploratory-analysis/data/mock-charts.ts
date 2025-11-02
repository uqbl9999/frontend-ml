export const screeningGroupDistribution = [
  { group: "Total de Tamizajes", registros: 199_776, porcentaje: 84.5 },
  { group: "Solo Tamizajes Positivos", registros: 34_977, porcentaje: 14.8 },
  {
    group: "Tamizajes con Condición Adicional Violencia Política",
    registros: 1_774,
    porcentaje: 0.8,
  },
] as const;

export const screeningGroupTotals = [
  { group: "Total de Tamizajes", casos: 2_052_384 },
  { group: "Solo Tamizajes Positivos", casos: 90_927 },
  {
    group: "Tamizajes con Condición Adicional Violencia Política",
    casos: 5_645,
  },
] as const;

export const screeningTypeHeatmap = [
  {
    group: "Total de Tamizajes",
    values: [
      { type: "Violencia Familiar", casos: 1_532_884 },
      { type: "Maltrato Infantil", casos: 198_224 },
      { type: "Trastorno Depresivo", casos: 166_542 },
      { type: "Consumo de Alcohol", casos: 90_452 },
      { type: "Consumo de Drogas", casos: 36_221 },
      { type: "Trastorno Psicotico", casos: 28_903 },
      { type: "Violencia Política", casos: 5_645 },
      { type: "Consumo de Tabaco", casos: 2_141 },
    ],
  },
  {
    group: "Solo Tamizajes Positivos",
    values: [
      { type: "Violencia Familiar", casos: 65_149 },
      { type: "Maltrato Infantil", casos: 9_802 },
      { type: "Trastorno Depresivo", casos: 6_331 },
      { type: "Consumo de Alcohol", casos: 5_904 },
      { type: "Consumo de Drogas", casos: 3_814 },
      { type: "Trastorno Psicotico", casos: 1_974 },
      { type: "Violencia Política", casos: 1_812 },
      { type: "Consumo de Tabaco", casos: 1_511 },
    ],
  },
  {
    group: "Tamizajes con Condición Adicional Violencia Política",
    values: [
      { type: "Violencia Familiar", casos: 1_774 },
      { type: "Maltrato Infantil", casos: 942 },
      { type: "Trastorno Depresivo", casos: 601 },
      { type: "Consumo de Alcohol", casos: 330 },
      { type: "Consumo de Drogas", casos: 211 },
      { type: "Trastorno Psicotico", casos: 199 },
      { type: "Violencia Política", casos: 189 },
      { type: "Consumo de Tabaco", casos: 164 },
    ],
  },
];

export const departmentHeatmap = [
  {
    group: "Total de Tamizajes",
    values: [
      { department: "Ayacucho", casos: 268_441 },
      { department: "Huánuco", casos: 231_003 },
      { department: "Junín", casos: 208_944 },
      { department: "Apurímac", casos: 188_112 },
      { department: "Lambayeque", casos: 180_004 },
      { department: "Huancavelica", casos: 162_771 },
      { department: "San Martín", casos: 151_092 },
      { department: "Tacna", casos: 138_675 },
      { department: "Ica", casos: 121_483 },
      { department: "Lima", casos: 115_329 },
      { department: "Piura", casos: 109_821 },
      { department: "Cusco", casos: 102_448 },
      { department: "Ancash", casos: 94_228 },
      { department: "Callao", casos: 83_441 },
      { department: "Arequipa", casos: 79_218 },
    ],
  },
  {
    group: "Solo Tamizajes Positivos",
    values: [
      { department: "Ayacucho", casos: 27_349 },
      { department: "Huánuco", casos: 23_008 },
      { department: "Junín", casos: 21_115 },
      { department: "Apurímac", casos: 19_843 },
      { department: "Lambayeque", casos: 17_663 },
      { department: "Huancavelica", casos: 15_834 },
      { department: "San Martín", casos: 14_992 },
      { department: "Tacna", casos: 13_102 },
      { department: "Ica", casos: 12_334 },
      { department: "Lima", casos: 11_982 },
      { department: "Piura", casos: 10_442 },
      { department: "Cusco", casos: 9_874 },
      { department: "Ancash", casos: 8_911 },
      { department: "Callao", casos: 7_602 },
      { department: "Arequipa", casos: 7_008 },
    ],
  },
  {
    group: "Tamizajes con Condición Adicional Violencia Política",
    values: [
      { department: "Ayacucho", casos: 2_144 },
      { department: "Huánuco", casos: 1_942 },
      { department: "Junín", casos: 1_771 },
      { department: "Apurímac", casos: 1_603 },
      { department: "Lambayeque", casos: 1_244 },
      { department: "Huancavelica", casos: 1_188 },
      { department: "San Martín", casos: 1_102 },
      { department: "Tacna", casos: 1_054 },
      { department: "Ica", casos: 992 },
      { department: "Lima", casos: 944 },
      { department: "Piura", casos: 903 },
      { department: "Cusco", casos: 844 },
      { department: "Ancash", casos: 781 },
      { department: "Callao", casos: 704 },
      { department: "Arequipa", casos: 655 },
    ],
  },
];

export const descriptiveStats = [
  { label: "Media", value: 22.4, color: "text-indigo-500" },
  { label: "Mediana", value: 20.8, color: "text-emerald-500" },
  { label: "Desv. Estándar", value: 12.5, color: "text-amber-500" },
  { label: "Máximo", value: 68.2, color: "text-rose-500" },
] as const;
