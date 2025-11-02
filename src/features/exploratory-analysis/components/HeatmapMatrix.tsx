import { useMemo } from "react";

type HeatmapMatrixProps<T extends { casos: number }> = {
  readonly data: ReadonlyArray<{
    readonly group: string;
    readonly values: ReadonlyArray<T>;
  }>;
  readonly axisKey: keyof T;
  readonly title: string;
  readonly subtitle?: string;
  readonly valueFormatter?: (value: number) => string;
};

export function HeatmapMatrix<T extends { casos: number }>({
  data,
  axisKey,
  title,
  subtitle,
  valueFormatter = (value) => value.toLocaleString("es-PE"),
}: HeatmapMatrixProps<T>) {
  const allValues = useMemo(
    () => data.flatMap((line) => line.values.map((entry) => entry.casos)),
    [data],
  );

  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);

  const colorScale = (value: number) => {
    const ratio = (value - minValue) / (maxValue - minValue || 1);

    const hue = 225 - ratio * 150;
    const saturation = 70 + ratio * 20;
    const lightness = 90 - ratio * 35;

    return `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`;
  };

  const columns = data[0]?.values ?? [];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </p>
        {subtitle ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-40 rounded-l-xl bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                Grupo
              </th>
              {columns.map((column) => (
                <th
                  key={String(column[axisKey])}
                  className="bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                >
                  {String(column[axisKey])}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.group}>
                <td
                  className={[
                    "whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-200",
                    index === data.length - 1
                      ? "rounded-bl-xl bg-white dark:bg-slate-900"
                      : "bg-white dark:bg-slate-900",
                  ].join(" ")}
                >
                  {row.group}
                </td>
                {row.values.map((valueEntry) => (
                  <td
                    key={String(valueEntry[axisKey])}
                    className="rounded-xl px-4 py-3 text-right text-sm font-semibold text-slate-700 shadow-inner dark:text-slate-100"
                    style={{
                      backgroundColor: colorScale(valueEntry.casos),
                    }}
                  >
                    {valueFormatter(valueEntry.casos)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
