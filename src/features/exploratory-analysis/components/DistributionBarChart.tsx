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

type DistributionBarChartProps = {
  readonly data: ReadonlyArray<{
    readonly group: string;
    readonly registros?: number;
    readonly porcentaje?: number;
    readonly casos?: number;
  }>;
  readonly valueKey: "registros" | "casos";
  readonly valueFormatter?: (value: number) => string;
  readonly color?: string;
};

function tooltipFormatter(value: number) {
  return value.toLocaleString("es-PE");
}

export function DistributionBarChart({
  data,
  valueKey,
  valueFormatter = tooltipFormatter,
  color = "#4f46e5",
}: DistributionBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
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
          tickFormatter={(value) => valueFormatter(value)}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--color-sidebar-foreground, #475569)" }}
        />
        <YAxis
          dataKey="group"
          type="category"
          width={160}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--color-sidebar-foreground, #475569)" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(79,70,229,0.08)" }}
          formatter={(value: number) => [valueFormatter(value), "Cantidad"]}
        />
        <Bar
          dataKey={valueKey}
          radius={[12, 12, 12, 12]}
          fill={color}
          background={{ fill: "rgba(148,163,184,0.12)", radius: 12 }}
        >
          <LabelList
            dataKey={valueKey}
            position="insideRight"
            formatter={(value: number) => valueFormatter(value)}
            fill="#fff"
            className="text-xs font-semibold"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
