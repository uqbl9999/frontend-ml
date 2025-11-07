import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FeatureImportanceChartProps = {
  readonly data: ReadonlyArray<{
    readonly feature: string;
    readonly importance: number;
  }>;
};

const formatter = (value: number) => value.toFixed(4);

export function FeatureImportanceChart({ data }: FeatureImportanceChartProps) {
  // Ensure data is iterable to avoid runtime crashes when API returns
  // an unexpected shape (e.g., object or null). Fallback to empty array.
  const safeData = Array.isArray(data) ? data : [];
  const importanceValues = safeData.map((d) => d.importance);
  const maxImportance = importanceValues.length
    ? Math.max(...importanceValues) * 1.1
    : 0;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={[...safeData]}
        layout="vertical"
        margin={{ top: 16, right: 24, bottom: 16, left: 16 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(148,163,184,0.25)"
          horizontal
          vertical={false}
        />
        <XAxis
          type="number"
          domain={[0, maxImportance]}
          tickFormatter={formatter}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--color-sidebar-foreground, #475569)" }}
        />
        <YAxis
          type="category"
          dataKey="feature"
          width={220}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--color-sidebar-foreground, #475569)" }}
        />
        <Tooltip
          formatter={(value: number) => [formatter(value), "Importancia"]}
          cursor={{ fill: "rgba(234,179,8,0.12)" }}
        />
        <Bar
          dataKey="importance"
          radius={[12, 12, 12, 12]}
          fill="#f59e0b"
          background={{ fill: "rgba(234,179,8,0.1)", radius: 12 }}
        >
          <LabelList
            dataKey="importance"
            position="insideRight"
            formatter={formatter}
            className="text-xs font-semibold text-slate-900 dark:text-slate-900"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
