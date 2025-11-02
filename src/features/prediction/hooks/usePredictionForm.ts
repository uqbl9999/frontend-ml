import { FormEvent, useCallback, useMemo, useState } from "react";

import { predictionFieldOptions } from "../data/options";

type FormState = {
  readonly department: string;
  readonly province: string;
  readonly lifeStage: string;
  readonly screeningType: string;
  readonly sex: string;
  readonly month: string;
};

const optionBlueprint = [
  {
    id: "department",
    label: "Departamento",
    options: predictionFieldOptions.department,
  },
  { id: "province", label: "Provincia", options: predictionFieldOptions.province },
  { id: "lifeStage", label: "Etapa de Vida", options: predictionFieldOptions.lifeStage },
  {
    id: "screeningType",
    label: "Tipo de Tamizaje",
    options: predictionFieldOptions.screeningType,
  },
  { id: "sex", label: "Sexo", options: predictionFieldOptions.sex },
  { id: "month", label: "Mes a Predecir", options: predictionFieldOptions.month },
] as const;

type Option = (typeof optionBlueprint)[number]["options"][number];

type Field = {
  readonly id: keyof FormState;
  readonly label: string;
  readonly options: readonly Option[];
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export function usePredictionForm() {
  const [formState, setFormState] = useState<FormState>(() => ({
    department: predictionFieldOptions.department[0]?.value ?? "",
    province: predictionFieldOptions.province[0]?.value ?? "",
    lifeStage: predictionFieldOptions.lifeStage[0]?.value ?? "",
    screeningType: predictionFieldOptions.screeningType[0]?.value ?? "",
    sex: predictionFieldOptions.sex[0]?.value ?? "",
    month: predictionFieldOptions.month[0]?.value ?? "",
  }));

  const fields: Field[] = useMemo(
    () =>
      optionBlueprint.map((entry) => ({
        id: entry.id,
        label: entry.label,
        options: entry.options,
        value: formState[entry.id],
        onChange: (value: string) =>
          setFormState((state) => ({
            ...state,
            [entry.id]: value,
          })),
      })),
    [formState],
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // TODO: Replace with integration that triggers the prediction request.
      console.table(formState);
    },
    [formState],
  );

  return { fields, onSubmit, formState };
}
