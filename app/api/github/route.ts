import { NextResponse } from 'next/server';
import { summarizeContributions, type ContributionCalendar } from '@/app/lib/github';

const USERNAME = 'Rex-Orokumue';
export const revalidate = 3600;

const QUERY = `query($login:String!){
  user(login:$login){
    public_repos: repositories(privacy:PUBLIC){ totalCount }
    contributionsCollection{
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ date contributionCount } }
      }
    }
  }
}`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: 'no-token' }, { status: 200 });
  }
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`github ${res.status}`);
    const json = await res.json();
    const user = json?.data?.user;
    const cal: ContributionCalendar = user.contributionsCollection.contributionCalendar;
    const summary = summarizeContributions(cal);
    return NextResponse.json({
      ok: true,
      publicRepos: user.public_repos.totalCount,
      ...summary,
      profileUrl: `https://github.com/${USERNAME}`,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch-failed' }, { status: 200 });
  }
}
