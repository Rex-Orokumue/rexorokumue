export interface CommandResult {
  lines: string[];
  navigate?: string;
  action?: 'clear' | 'toggle-theme';
  external?: string;
}

export const COMMANDS: Record<string, string> = {
  help: 'list commands',
  whoami: 'who is Rex',
  projects: 'list projects',
  'open <slug>': 'open a project',
  about: 'about page',
  logs: 'build logs',
  blog: 'writing',
  contact: 'how to reach me',
  resume: 'download resume',
  theme: 'toggle light/dark',
  clear: 'clear the screen',
};

export function runCommand(input: string, slugs: string[]): CommandResult {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(' ');
  switch (cmd) {
    case 'help':
      return { lines: Object.entries(COMMANDS).map(([k, v]) => `  ${k.padEnd(14)} ${v}`) };
    case 'whoami':
      return { lines: ['Rex Orokumue — full-stack developer. Next.js · Flutter · Supabase.'] };
    case 'projects':
      return { lines: ['projects:', ...slugs.map((s) => `  - ${s}  (open ${s})`)] };
    case 'open':
      return slugs.includes(arg)
        ? { lines: [`opening ${arg}…`], navigate: `/projects/${arg}` }
        : { lines: [`open: '${arg}' not found. try 'projects'.`] };
    case 'about':   return { lines: ['→ /about'], navigate: '/about' };
    case 'logs':    return { lines: ['→ /build-logs'], navigate: '/build-logs' };
    case 'blog':    return { lines: ['→ /blog'], navigate: '/blog' };
    case 'contact': return { lines: ['→ /about#contact'], navigate: '/about#contact' };
    case 'resume':  return { lines: ['downloading resume…'], external: '/Rex-Orokumue-Resume.pdf' };
    case 'theme':   return { lines: ['toggling theme…'], action: 'toggle-theme' };
    case 'clear':   return { lines: [], action: 'clear' };
    case '':        return { lines: [] };
    default:        return { lines: [`command not found: ${cmd}. type 'help'.`] };
  }
}
