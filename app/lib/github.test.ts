import { describe, it, expect } from 'vitest';
import { summarizeContributions, type ContributionCalendar } from './github';

const day = (date: string, count: number) => ({ date, contributionCount: count });

describe('summarizeContributions', () => {
  it('sums commits in the last 7 days and computes current streak', () => {
    const cal: ContributionCalendar = {
      totalContributions: 30,
      weeks: [{
        contributionDays: [
          day('2026-06-05', 0), day('2026-06-06', 2), day('2026-06-07', 0),
          day('2026-06-08', 1), day('2026-06-09', 3), day('2026-06-10', 4),
          day('2026-06-11', 2), day('2026-06-12', 1),
        ],
      }],
    };
    const s = summarizeContributions(cal, new Date('2026-06-12T12:00:00Z'));
    expect(s.commitsThisWeek).toBe(1 + 2 + 4 + 3 + 1 + 0 + 2);
    expect(s.currentStreakDays).toBe(5);
    expect(s.totalThisYear).toBe(30);
  });

  it('streak is 0 when today has no contributions', () => {
    const cal: ContributionCalendar = {
      totalContributions: 5,
      weeks: [{ contributionDays: [day('2026-06-11', 4), day('2026-06-12', 0)] }],
    };
    const s = summarizeContributions(cal, new Date('2026-06-12T12:00:00Z'));
    expect(s.currentStreakDays).toBe(0);
  });
});
