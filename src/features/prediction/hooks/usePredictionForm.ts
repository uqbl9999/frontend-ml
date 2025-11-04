import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  MapPin,
  Route,
  Scan,
  Users,
  Venus,
} from "lucide-react";
import { api } from "../../../lib/api";

type FormState = {
  readonly department: string;
  readonly province: string;
  readonly lifeStage: string;
  readonly screeningType: string;
  readonly sex: string;
  readonly month: string;
};

const MONTHS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Enero", value: "1" },
  { label: "Febrero", value: "2" },
  { label: "Marzo", value: "3" },
  { label: "Abril", value: "4" },
  { label: "Mayo", value: "5" },
  { label: "Junio", value: "6" },
  { label: "Julio", value: "7" },
  { label: "Agosto", value: "8" },
  { label: "Septiembre", value: "9" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
];

const SEX_OPTIONS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Femenino", value: "F" },
  { label: "Masculino", value: "M" },
];

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
  const [departmentOptions, setDepartmentOptions] = useState<ReadonlyArray<{ label: string; value: string }>>([]);
  const [provinceOptions, setProvinceOptions] = useState<ReadonlyArray<{ label: string; value: string }>>([]);
  const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
  const [lifeStageOptions, setLifeStageOptions] = useState<ReadonlyArray<{ label: string; value: string }>>([]);
  const [screeningTypeOptions, setScreeningTypeOptions] = useState<ReadonlyArray<{ label: string; value: string }>>([]);

  const [formState, setFormState] = useState<FormState>(() => ({
    department: "",
    province: "",
    lifeStage: "",
    screeningType: "",
    sex: SEX_OPTIONS[0]?.value ?? "F",
    month: MONTHS[0]?.value ?? "1",
  }));

  // Load initial metadata options
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [departamentosRaw, etapasRaw, tamizajesRaw] = await Promise.all([
          api.getDepartamentos(),
          api.getEtapas(),
          api.getTamizajes(),
        ]);
        if (cancelled) return;
        const toList = (data: unknown): string[] => {
          if (Array.isArray(data)) return data as string[];
          if (data && typeof data === "object") {
            const first = Object.values(data)[0];
            if (Array.isArray(first)) return first as string[];
          }
          return [];
        };
        const departamentos = toList(departamentosRaw);
        const etapas = toList(etapasRaw);
        const tamizajes = toList(tamizajesRaw);
        const deptOptions = departamentos.map((d) => ({ label: d, value: d }));
        const stageOptions = etapas.map((e) => ({ label: e, value: e }));
        const screeningOptions = tamizajes.map((t) => ({ label: t, value: t }));
        setDepartmentOptions(deptOptions);
        setLifeStageOptions(stageOptions);
        setScreeningTypeOptions(screeningOptions);
        // Set defaults
        const defaultDept = deptOptions[0]?.value ?? "";
        setLoadingProvinces(true);
        const provincesRaw = defaultDept ? await api.getProvincias(defaultDept) : [];
        if (cancelled) return;
        const provinces = toList(provincesRaw);
        const provOptions = provinces.map((p) => ({ label: p, value: p }));
        setProvinceOptions(provOptions);
        setLoadingProvinces(false);
        setFormState((prev) => ({
          ...prev,
          department: defaultDept,
          province: provOptions[0]?.value ?? "",
          lifeStage: stageOptions[0]?.value ?? "",
          screeningType: screeningOptions[0]?.value ?? "",
        }));
      } catch (error) {
        console.error("Error cargando metadata:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Update provinces when department changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!formState.department) return;
      try {
        setLoadingProvinces(true);
        const provincesRaw = await api.getProvincias(formState.department);
        if (cancelled) return;
        const toList = (data: unknown): string[] => {
          if (Array.isArray(data)) return data as string[];
          if (data && typeof data === "object") {
            const first = Object.values(data)[0];
            if (Array.isArray(first)) return first as string[];
          }
          return [];
        };
        const provinces = toList(provincesRaw);
        const provOptions = provinces.map((p) => ({ label: p, value: p }));
        setProvinceOptions(provOptions);
        setFormState((prev) => ({ ...prev, province: provOptions[0]?.value ?? "" }));
        setLoadingProvinces(false);
      } catch (error) {
        console.error("Error cargando provincias:", error);
        setLoadingProvinces(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [formState.department]);

  const fields: Field[] = useMemo(() => {
    const blueprint = [
      {
        id: "department" as const,
        label: "Departamento",
        options: departmentOptions,
        icon: MapPin,
      },
      {
        id: "province" as const,
        label: "Provincia",
        options:
          loadingProvinces
            ? [{ label: "Cargando...", value: "" }]
            : provinceOptions.length > 0
              ? provinceOptions
              : [{ label: "Selecciona departamento", value: "" }],
        icon: Route,
      },
      {
        id: "lifeStage" as const,
        label: "Etapa de Vida",
        options: lifeStageOptions,
        icon: Users,
      },
      {
        id: "screeningType" as const,
        label: "Tipo de Tamizaje",
        options: screeningTypeOptions,
        icon: Scan,
      },
      {
        id: "sex" as const,
        label: "Sexo",
        options: SEX_OPTIONS,
        icon: Venus,
      },
      {
        id: "month" as const,
        label: "Mes a Predecir",
        options: MONTHS,
        icon: Calendar,
      },
    ] as const;

    return blueprint.map((entry) => ({
      id: entry.id,
      label: entry.label,
      options: entry.options,
      value: formState[entry.id],
      icon: entry.icon,
      onChange: (value: string) => {
        if (entry.id === "department") {
          // Reset provinces immediately for visual feedback
          setLoadingProvinces(true);
          setProvinceOptions([]);
          setFormState((state) => ({
            ...state,
            department: value,
            province: "",
          }));
          return;
        }
        setFormState((state) => ({
          ...state,
          [entry.id]: value,
        }));
      },
    }));
  }, [departmentOptions, provinceOptions, lifeStageOptions, screeningTypeOptions, loadingProvinces, formState]);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.table(formState);
    },
    [formState],
  );

  return { fields, onSubmit, formState };
}
