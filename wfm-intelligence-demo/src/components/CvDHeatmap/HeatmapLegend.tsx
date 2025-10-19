/**
 * Legend item configuration
 */
interface LegendItem {
  color: string;
  label: string;
  description: string;
}

/**
 * Legend items with colors matching heatmap risk levels
 */
const LEGEND_ITEMS: readonly LegendItem[] = [
  { color: '#10B981', label: 'Safe', description: '>105% coverage' },
  { color: '#FBBF24', label: 'Caution', description: '90-105% coverage' },
  { color: '#EF4444', label: 'Risk', description: '<90% coverage' },
] as const;

/**
 * HeatmapLegend displays the color key for interpreting heatmap risk levels
 * Shows three color-coded risk levels: Safe (green), Caution (yellow), Risk (red)
 *
 * @component
 * @returns Rendered legend with color swatches and labels
 */
export function HeatmapLegend() {
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 bg-gray-50 rounded-lg"
      aria-label="Coverage risk level legend"
      role="region"
    >
      <h3 className="text-sm font-semibold text-gray-700" id="legend-title">
        Coverage Risk Levels:
      </h3>

      <ul className="flex flex-wrap gap-4" aria-labelledby="legend-title">
        {LEGEND_ITEMS.map(({ color, label, description }) => (
          <li key={label} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="text-sm">
              <strong>{label}</strong> ({description})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
