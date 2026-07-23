import { useSelector } from "react-redux";
import useApplications from "../hooks/useApplications";
import { BriefcaseBusiness, ClipboardList, Calendar, CheckCircle2, XCircle } from "lucide-react";

export default function Dashboard() {
  const { applications } = useApplications();

  // Categories for the graph
  const stages = ["Applied", "OA", "Round 1", "Interview", "Offer", "Rejected"];

  // Count apps in each category
  const stageCounts = stages.reduce((acc, stage) => {
    acc[stage] = applications.filter((app) => app.status === stage).length;
    return acc;
  }, {});

  // Metrics
  const totalApplied = applications.length;
  const oas = stageCounts["OA"] || 0;
  const interviews = stageCounts["Interview"] || 0;
  const offers = stageCounts["Offer"] || 0;
  const rejected = stageCounts["Rejected"] || 0;

  // Chart calculation
  const maxCount = Math.max(...Object.values(stageCounts), 0);
  const maxVal = Math.max(maxCount + 1, 5); // ensure some grid lines even if empty

  // SVG parameters
  const svgWidth = 800;
  const svgHeight = 350;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 40;
  const paddingBottom = 50;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const baselineY = svgHeight - paddingBottom;

  const colWidth = chartWidth / stages.length;
  const barWidth = Math.min(colWidth * 0.45, 50);

  // Y-axis grid values (5 ticks)
  const gridTicks = [];
  for (let i = 0; i <= 4; i++) {
    gridTicks.push(Math.round((maxVal / 4) * i * 10) / 10);
  }

  const statCards = [
    {
      label: "Companies Applied",
      value: totalApplied,
      icon: BriefcaseBusiness,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      description: "Total jobs tracked",
    },
    {
      label: "Online Assessments",
      value: oas,
      icon: ClipboardList,
      color: "text-violet-400",
      bgColor: "bg-violet-400/10",
      description: "Active technical tests",
    },
    {
      label: "Interviews Scheduled",
      value: interviews,
      icon: Calendar,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      description: "Interviews to prepare for",
    },
    {
      label: "Offers Received",
      value: offers,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Job offers secured",
    },
    {
      label: "Rejections",
      value: rejected,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      description: "Closed opportunities",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="font-serif text-4xl font-bold">Dashboard</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        See where every application stands in your job search.
      </p>

      {/* SVG Analytics Graph */}
      <div className="mt-10 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-6 px-2 text-[var(--text-primary)]">
          Application Stages Overview
        </h2>

        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full min-w-[650px] overflow-visible text-[var(--text-secondary)]"
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#df6d51" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#df6d51" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {gridTicks.map((tick, index) => {
              const y = baselineY - (tick / maxVal) * chartHeight;
              return (
                <g key={tick} className="opacity-80">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    className="opacity-20"
                  />
                  <text
                    x={paddingLeft - 15}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs font-medium fill-current"
                  >
                    {Math.round(tick)}
                  </text>
                </g>
              );
            })}

            {/* Bars and labels */}
            {stages.map((stage, i) => {
              const count = stageCounts[stage] || 0;
              const barHeight = (count / maxVal) * chartHeight;
              const xCenter = paddingLeft + i * colWidth + colWidth / 2;
              const xLeft = xCenter - barWidth / 2;
              const yTop = baselineY - barHeight;

              return (
                <g key={stage} className="group">
                  {/* Background interactive hover area */}
                  <rect
                    x={paddingLeft + i * colWidth + 4}
                    y={paddingTop}
                    width={colWidth - 8}
                    height={chartHeight}
                    fill="transparent"
                    className="hover:fill-[var(--text-primary)]/5 cursor-pointer transition-all duration-150"
                  />

                  {/* Value Label above bar */}
                  {count > 0 && (
                    <text
                      x={xCenter}
                      y={yTop - 8}
                      textAnchor="middle"
                      className="text-sm font-bold fill-[var(--text-primary)] transition-all duration-200"
                    >
                      {count}
                    </text>
                  )}

                  {/* The Bar */}
                  <rect
                    x={xLeft}
                    y={yTop}
                    width={barWidth}
                    height={barHeight}
                    rx="6"
                    ry="6"
                    fill="url(#barGradient)"
                    className="transition-all duration-500 ease-out origin-bottom hover:brightness-110"
                  />

                  {/* X Axis Label */}
                  <text
                    x={xCenter}
                    y={baselineY + 25}
                    textAnchor="middle"
                    className="text-sm font-medium fill-current hover:fill-[var(--text-primary)]"
                  >
                    {stage}
                  </text>
                </g>
              );
            })}

            {/* X-axis baseline */}
            <line
              x1={paddingLeft}
              y1={baselineY}
              x2={svgWidth - paddingRight}
              y2={baselineY}
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-30"
            />
          </svg>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map(({ label, value, icon: Icon, color, bgColor, description }) => (
          <article
            key={label}
            className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 transition-colors duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)] leading-tight max-w-[70%]">
                {label}
              </span>
              <div className={`p-2.5 rounded-xl ${bgColor} ${color} shrink-0`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-8">
              <p className="font-serif text-4xl font-bold text-[var(--text-primary)]">
                {value}
              </p>
              <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
