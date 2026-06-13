import { describe, it, expect } from 'vitest';
import { runCommand, COMMANDS } from './commands';

const slugs = ['zolarux', 'foodgram'];

describe('runCommand', () => {
  it('help lists known commands', () => {
    const r = runCommand('help', slugs);
    expect(r.lines.join(' ')).toContain('projects');
  });
  it('open <slug> navigates when slug exists', () => {
    const r = runCommand('open zolarux', slugs);
    expect(r.navigate).toBe('/projects/zolarux');
  });
  it('open <unknown> reports not found, no navigation', () => {
    const r = runCommand('open nope', slugs);
    expect(r.navigate).toBeUndefined();
    expect(r.lines.join(' ').toLowerCase()).toContain('not found');
  });
  it('theme returns a toggle action', () => {
    expect(runCommand('theme', slugs).action).toBe('toggle-theme');
  });
  it('clear returns a clear action', () => {
    expect(runCommand('clear', slugs).action).toBe('clear');
  });
  it('unknown command is friendly', () => {
    expect(runCommand('xyz', slugs).lines.join(' ')).toContain('help');
  });
});
