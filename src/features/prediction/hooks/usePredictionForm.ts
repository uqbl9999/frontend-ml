import { FormEvent, useCallback, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  MapPin,
  Route,
  Scan,
  Users,
  Venus,
} from "lucide-react";

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
    icon: MapPin,
  },
  {
    id: "province",
    label: "Provincia",
    options: predictionFieldOptions.province,
    icon: Route,
  },
  {
    id: "lifeStage",
    label: "Etapa de Vida",
    options: predictionFieldOptions.lifeStage,
    icon: Users,
  },
  {
    id: "screeningType",
    label: "Tipo de Tamizaje",
    options: predictionFieldOptions.screeningType,
    icon: Scan,
  },
  {
    id: "sex",
    label: "Sexo",
    options: predictionFieldOptions.sex,
    icon: Venus,
  },
  {
    id: "month",
    label: "Mes a Predecir",
    options: predictionFieldOptions.month,
    icon: Calendar,
  },
] as const;

type Option = (typeof optionBlueprint)[number]["options"][number];

type Field = {
  readonly id: keyof FormState;
  readonly label: string;
  readonly options: readonly Option[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly icon: LucideIcon;
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
        icon: entry.icon,
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
