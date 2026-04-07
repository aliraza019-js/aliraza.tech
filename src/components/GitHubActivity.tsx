"use client";

import { useMemo } from "react";
import Image from "next/image";

const WEEKS = 52;
const DAYS = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar",
];

const LEVELS = [
  "bg-white/[0.04]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateGrid(): number[][] {
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = w * 7 + d + 42;
      const r = seededRandom(seed);
      if (r < 0.15) week.push(0);
      else if (r < 0.35) week.push(1);
      else if (r < 0.55) week.push(2);
      else if (r < 0.78) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
}

interface Props {
  compact?: boolean;
}

export default function GitHubActivity({ compact = false }: Props) {
  const grid = useMemo(() => generateGrid(), []);

  const totalContributions = useMemo(() => {
    const counts = [0, 2, 5, 9, 14];
    return grid.reduce(
      (sum, week) => sum + week.reduce((ws, d) => ws + counts[d], 0),
      0,
    );
  }, [grid]);

  if (compact) {
    return (
      <div className="github-activity-section">
        <div className="glass-card rounded-3xl border border-outline-variant/10 p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed/30">
              <Image
                src="/images/hero-profile.png"
                alt="Ali Raza"
                width={40}
                height={40}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">aliraza019-js</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                {totalContributions.toLocaleString()} contributions in the last year
              </p>
              <p className="text-[9px] text-on-surface-variant/60 mt-0.5">Open Source + Private company contributions</p>
            </div>
            <a
              href="https://github.com/aliraza019-js"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[10px] text-primary-fixed font-semibold hover:underline"
            >
              View GitHub
            </a>
          </div>

          {/* Mini grid */}
          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex gap-[2px] w-max">
              {grid.slice(-26).map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className={`w-[8px] h-[8px] rounded-[2px] ${LEVELS[level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/10">
            {[
              { value: "1,482", label: "Contributions" },
              { value: "365", label: "Day Streak" },
              { value: "42", label: "Repositories" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-sm font-black text-white font-headline">{s.value}</div>
                <div className="text-[9px] text-on-surface-variant uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-activity-section">
      <div className="glass-card rounded-3xl border border-outline-variant/10 p-8 md:p-10 overflow-hidden">
        {/* Top: Profile + stats */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-fixed/30 shadow-[0_0_20px_rgba(201,243,28,0.15)]">
              <Image
                src="/images/hero-profile.png"
                alt="Ali Raza"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                sizes="64px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">aliraza019-js</h3>
                <span className="material-symbols-outlined text-primary-fixed text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">
                {totalContributions.toLocaleString()} contributions in the last year
              </p>
              <p className="text-xs text-on-surface-variant/50">Open Source + Private company contributions</p>
            </div>
          </div>

          <div className="md:ml-auto flex items-center gap-6">
            {[
              { icon: "local_fire_department", value: "365", label: "Day Streak", color: "text-orange-400" },
              { icon: "folder_copy", value: "42", label: "Repositories", color: "text-primary-fixed" },
              { icon: "commit", value: "1,482", label: "Commits", color: "text-green-400" },
              { icon: "groups", value: "180+", label: "Contributions", color: "text-blue-400" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span
                    className={`material-symbols-outlined text-base ${stat.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                  <span className="text-xl font-black text-white font-headline leading-none">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution grid */}
        <div className="relative">
          {/* Month labels */}
          <div className="flex ml-8 mb-2">
            {MONTH_LABELS.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-on-surface-variant"
                style={{ width: `${100 / 12}%` }}
              >
                {m}
              </span>
            ))}
          </div>

          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col justify-between pr-2 py-[2px]" style={{ height: `${DAYS * 14}px` }}>
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="text-[10px] text-on-surface-variant leading-none h-[12px] flex items-center">
                  {label}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px] flex-1 overflow-hidden">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px] flex-1">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className={`aspect-square rounded-[2px] ${LEVELS[level]} transition-all duration-200 hover:ring-1 hover:ring-white/30 hover:scale-125`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-[10px] text-on-surface-variant">Less</span>
            {LEVELS.map((cls, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span className="text-[10px] text-on-surface-variant">More</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-outline-variant/10">
          <p className="text-sm text-on-surface-variant">
            I ship code every single day. Consistency is how I deliver on time, every time.
          </p>
          <a
            href="https://github.com/aliraza019-js"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-surface-container-highest transition-all shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
