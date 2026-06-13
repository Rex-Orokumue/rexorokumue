// resumeCommands.ts — pure resume terminal command interpreter (no DOM)

import { profile, experience, skills, education } from '../../../data/profileData';
import { projects } from '../../../data/projectsData';

export type ResumeCommandResult = {
  lines: string[];
  action?: 'clear' | 'download';
};

function pad(s: string, w: number): string {
  return s.padEnd(w, ' ');
}

function divider(char = '─', len = 56): string {
  return char.repeat(len);
}

const HELP_LINES: string[] = [
  divider(),
  'rex os // resume — available commands:',
  divider(),
  '  experience   work history & roles',
  '  skills       tech skills by category',
  '  projects     selected project highlights',
  '  education    education & background',
  '  contact      email & social links',
  '  download     export resume as PDF',
  '  clear        clear the terminal',
  divider(),
  "type a command or click a chip below.",
];

function cmdExperience(): string[] {
  const lines: string[] = [
    divider(),
    'EXPERIENCE',
    divider(),
  ];
  for (const item of experience) {
    const nowChip = item.current ? ' ● now' : '';
    lines.push(`${item.role} — ${item.company}`);
    lines.push(`  ${item.period}${nowChip}`);
    lines.push(`  ${item.summary}`);
    for (const pt of item.points) {
      lines.push(`  · ${pt}`);
    }
    lines.push('');
  }
  lines.push(divider());
  return lines;
}

function cmdSkills(): string[] {
  const lines: string[] = [
    divider(),
    'SKILLS',
    divider(),
  ];
  for (const group of skills) {
    lines.push(`  ${pad(group.label + ':', 18)}${group.items.join('  ·  ')}`);
  }
  lines.push(divider());
  return lines;
}

function cmdProjects(): string[] {
  const lines: string[] = [
    divider(),
    'SELECTED PROJECTS',
    divider(),
  ];
  for (const p of projects) {
    const statusLabel = p.status === 'live' ? '● live' : p.status === 'building' ? '◌ building' : '◻ design';
    lines.push(`  ${p.name}  [${statusLabel}]`);
    lines.push(`  ${p.tagline}`);
    if (p.liveUrl) lines.push(`  live: ${p.liveUrl}`);
    if (p.repoUrl) lines.push(`  code: ${p.repoUrl}`);
    lines.push('');
  }
  lines.push(divider());
  return lines;
}

function cmdEducation(): string[] {
  const lines: string[] = [
    divider(),
    'EDUCATION',
    divider(),
  ];
  for (const item of education) {
    const note = item.note ? ` (${item.note})` : '';
    const org = item.org ? ` — ${item.org}` : '';
    lines.push(`  ${item.title}${org}${note}`);
  }
  lines.push(divider());
  return lines;
}

function cmdContact(): string[] {
  return [
    divider(),
    'CONTACT',
    divider(),
    `  email     ${profile.email}`,
    `  github    ${profile.socials.github}`,
    `  linkedin  ${profile.socials.linkedin}`,
    `  x         ${profile.socials.x}`,
    `  youtube   ${profile.socials.youtube}`,
    `  zolarux   ${profile.socials.zolarux}`,
    `  location  ${profile.location}`,
    `  status    ${profile.availability}`,
    divider(),
  ];
}

function cmdUnknown(input: string): string[] {
  return [
    `command not found: ${input || '(empty)'}`,
    "type 'help' to see available commands.",
  ];
}

export const RESUME_COMMANDS: Record<string, () => ResumeCommandResult> = {
  help:       () => ({ lines: HELP_LINES }),
  experience: () => ({ lines: cmdExperience() }),
  skills:     () => ({ lines: cmdSkills() }),
  projects:   () => ({ lines: cmdProjects() }),
  education:  () => ({ lines: cmdEducation() }),
  contact:    () => ({ lines: cmdContact() }),
  download:   () => ({ lines: ['preparing pdf…', 'opening print dialog.'], action: 'download' }),
  clear:      () => ({ lines: [], action: 'clear' }),
};

export function runResumeCommand(input: string): ResumeCommandResult {
  const cmd = input.trim().toLowerCase();
  if (RESUME_COMMANDS[cmd]) {
    return RESUME_COMMANDS[cmd]();
  }
  return { lines: cmdUnknown(input.trim()) };
}
