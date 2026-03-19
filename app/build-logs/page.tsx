// app/build-logs/page.tsx
// Thin server wrapper — fetches data, passes to client component for filtering

import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import BuildLogs from './BuildLogs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Build Logs',
  description: 'Building in public — every decision, mistake, and milestone documented across all active projects. No polished post-mortems. Just the real process.',
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Entry {
  id: string;
  project_id: string;
  day: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
  decision?: string;
  is_latest: boolean;
  sort_order: number;
}

async function getEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('build_log_entries')
    .select('*')
    .order('project_id')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

export default async function BuildLogsPage() {
  const entries = await getEntries();
  return <BuildLogs entries={entries} />;
}