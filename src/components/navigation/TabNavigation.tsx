type TabOption = {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
};

type TabNavigationProps = {
  readonly tabs: TabOption[];
  readonly activeTab: string;
  readonly onTabChange: (tabId: string) => void;
};

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <nav className="flex flex-wrap gap-2 rounded-xl bg-white p-2 shadow-md">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={[
              "flex flex-1 min-w-[160px] flex-col rounded-lg border px-4 py-3 text-left transition",
              isActive
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-inner"
                : "border-slate-200 bg-transparent text-slate-600 hover:border-blue-300 hover:text-blue-600",
            ].join(" ")}
          >
            <span className="text-sm font-semibold uppercase tracking-wide">
              {tab.label}
            </span>
            {tab.description ? (
              <span className="text-xs text-slate-500">{tab.description}</span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
