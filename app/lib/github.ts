export interface ContributionDay { date: string; contributionCount: number; }
export interface ContributionWeek { contributionDays: ContributionDay[]; }
export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ActivitySummary {
  commitsThisWeek: number;
  currentStreakDays: number;
  totalThisYear: number;
  days: ContributionDay[];
}

function flatten(cal: ContributionCalendar): ContributionDay[] {
  return cal.weeks.flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function summarizeContributions(
  cal: ContributionCalendar,
  now: Date = new Date(),
): ActivitySummary {
  const days = flatten(cal);
  const todayStr = now.toISOString().slice(0, 10);

  const weekAgo = new Date(now);
  weekAgo.setUTCDate(weekAgo.getUTCDate() - 6);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);
  const commitsThisWeek = days
    .filter((d) => d.date >= weekAgoStr && d.date <= todayStr)
    .reduce((sum, d) => sum + d.contributionCount, 0);

  let currentStreakDays = 0;
  const byDate = new Map(days.map((d) => [d.date, d.contributionCount]));
  const cursor = new Date(now);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    const count = byDate.get(key) ?? 0;
    if (count > 0) { currentStreakDays++; cursor.setUTCDate(cursor.getUTCDate() - 1); }
    else break;
  }

  return {
    commitsThisWeek,
    currentStreakDays,
    totalThisYear: cal.totalContributions,
    days,
  };
}
