'use client';
// app/admin/page.tsx

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────
type Tag = 'build' | 'design' | 'fix' | 'launch' | 'learning';
type ProjectId = 'portfolio' | 'zolarux' | 'escrowpay' | 'edupanion' | 'e-technix' | 'admin';

const PROJECTS = [
  { id: 'portfolio',  label: '🌐 Portfolio Website' },
  { id: 'zolarux',   label: '🔐 Zolarux' },
  { id: 'escrowpay', label: '💳 EscrowPay Engine' },
  { id: 'edupanion', label: '📚 EduPanion' },
  { id: 'e-technix', label: '💻 E-Technix' },
  { id: 'admin',     label: '⚙️ Admin Control Center' },
  { id: 'ican-warri', label: '🏛️ ICAN Warri District' },
] as const;

const TAGS: { id: Tag; label: string }[] = [
  { id: 'build',    label: 'Build' },
  { id: 'design',   label: 'Design' },
  { id: 'fix',      label: 'Fix' },
  { id: 'launch',   label: 'Launch' },
  { id: 'learning', label: 'Learning' },
];

interface Entry {
  id: string;
  project_id: ProjectId;
  day: string;
  date: string;
  title: string;
  body: string;
  tags: Tag[];
  decision: string;
  is_latest: boolean;
  sort_order: number;
}

const EMPTY_FORM = {
  project_id: 'portfolio' as ProjectId,
  day: '',
  date: '',
  title: '',
  body: '',
  tags: [] as Tag[],
  decision: '',
  is_latest: false,
  sort_order: 0,
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0F172A; --surface: rgba(30,41,59,0.7); --surface-2: rgba(15,23,42,0.8);
    --accent: #3B82F6; --accent-dim: rgba(59,130,246,0.12); --accent-glow: rgba(59,130,246,0.3);
    --accent-light: #93C5FD; --text: #F1F5F9; --muted: #94A3B8; --muted-2: #64748B;
    --border: rgba(255,255,255,0.08); --border-hover: rgba(59,130,246,0.3);
    --green: #34D399; --red: #F87171; --yellow: #FDE68A;
  }
  html, body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  body { padding: 0; overflow-x: hidden; }

  /* ── Lock screen ── */
  .lock-screen {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg);
  }
  .lock-card {
    width: 100%; max-width: 380px; padding: 40px;
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    backdrop-filter: blur(16px);
  }
  .lock-card h1 { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 6px; }
  .lock-card p { font-size: .83rem; color: var(--muted); margin-bottom: 28px; }
  .lock-error { font-size: .78rem; color: var(--red); margin-top: 10px; }

  /* ── Admin layout ── */
  .admin-wrap { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
  .sidebar {
    background: var(--surface-2); border-right: 1px solid var(--border);
    padding: 32px 20px; display: flex; flex-direction: column; gap: 4px;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .sidebar-title { font-family: 'Syne', sans-serif; font-size: .85rem; font-weight: 800; color: var(--text); padding: 0 12px 20px; border-bottom: 1px solid var(--border); margin-bottom: 12px; }
  .sidebar-section { font-size: .60rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted-2); padding: 12px 12px 6px; }
  .sidebar-btn {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px;
    border: none; background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif;
    font-size: .82rem; cursor: pointer; transition: all .2s; text-align: left; width: 100%;
  }
  .sidebar-btn:hover { background: rgba(255,255,255,.05); color: var(--text); }
  .sidebar-btn.active { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-glow); }
  .sidebar-btn .count { margin-left: auto; font-size: .68rem; color: var(--muted-2); font-family: 'JetBrains Mono', monospace; }
  .sidebar-logout { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border); }
  .logout-btn { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: .82rem; cursor: pointer; transition: all .2s; }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── Main content ── */
  .main-content { padding: 40px 48px; overflow-y: auto; }
  .main-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; }
  .main-header h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; }
  .main-header p { font-size: .82rem; color: var(--muted); margin-top: 3px; }

  /* ── Form ── */
  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; backdrop-filter: blur(12px); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: .75rem; font-weight: 600; color: var(--muted); letter-spacing: .04em; text-transform: uppercase; }
  input, select, textarea {
    padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: rgba(15,23,42,.6); color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: .875rem; outline: none; transition: border-color .2s;
    width: 100%;
  }
  input:focus, select:focus, textarea:focus { border-color: var(--accent-glow); }
  textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
  textarea.body-field { min-height: 140px; font-family: 'JetBrains Mono', monospace; font-size: .80rem; }
  select option { background: #1E293B; }
  .hint { font-size: .72rem; color: var(--muted-2); line-height: 1.5; }

  /* Tag checkboxes */
  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag-check { display: none; }
  .tag-check-label {
    padding: 5px 14px; border-radius: 100px; cursor: pointer;
    font-size: .73rem; font-weight: 600; letter-spacing: .05em;
    border: 1px solid var(--border); color: var(--muted); transition: all .15s;
  }
  .tag-check:checked + .tag-check-label { border-color: var(--accent-glow); background: var(--accent-dim); color: var(--accent-light); }

  /* Toggle */
  .toggle-row { display: flex; align-items: center; gap: 12px; }
  .toggle { position: relative; width: 40px; height: 22px; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider { position: absolute; inset: 0; background: rgba(255,255,255,.1); border-radius: 100px; border: 1px solid var(--border); cursor: pointer; transition: background .2s; }
  .toggle-slider::before { content: ''; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px; background: var(--muted-2); border-radius: 50%; transition: transform .2s, background .2s; }
  .toggle input:checked + .toggle-slider { background: var(--accent-dim); border-color: var(--accent-glow); }
  .toggle input:checked + .toggle-slider::before { transform: translateX(18px); background: var(--accent); }
  .toggle-label { font-size: .82rem; color: var(--muted); }

  /* Buttons */
  .btn-submit { padding: 11px 28px; background: var(--accent); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .875rem; cursor: pointer; transition: all .2s; box-shadow: 0 4px 20px var(--accent-glow); }
  .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 28px var(--accent-glow); }
  .btn-submit:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .btn-cancel { padding: 10px 22px; background: transparent; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: .875rem; cursor: pointer; transition: all .2s; }
  .btn-cancel:hover { border-color: rgba(255,255,255,.18); color: var(--text); }
  .form-actions { display: flex; gap: 10px; padding-top: 8px; }

  /* Toast */
  .toast { position: fixed; bottom: 28px; right: 28px; padding: 12px 20px; border-radius: 10px; font-size: .82rem; font-weight: 500; z-index: 9999; animation: slideUp .3s ease; }
  .toast.success { background: rgba(52,211,153,.15); border: 1px solid rgba(52,211,153,.3); color: var(--green); }
  .toast.error { background: rgba(248,113,113,.12); border: 1px solid rgba(248,113,113,.3); color: var(--red); }
  @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

  /* Entries list */
  .entries-list { display: flex; flex-direction: column; gap: 10px; }
  .entry-row {
    display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px;
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    transition: border-color .2s;
  }
  .entry-row:hover { border-color: var(--border-hover); }
  .entry-row-body { flex: 1; min-width: 0; }
  .entry-row-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .88rem; color: var(--text); margin-bottom: 4px; }
  .entry-row-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .entry-row-day { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--accent); }
  .entry-row-project { font-size: .68rem; color: var(--muted-2); }
  .entry-row-tags { display: flex; gap: 4px; flex-wrap: wrap; }
  .entry-mini-tag { padding: 1px 7px; border-radius: 4px; font-size: .58rem; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
  .entry-mini-tag.build    { background: var(--accent-dim); color: var(--accent-light); }
  .entry-mini-tag.design   { background: rgba(167,139,250,.10); color: #C4B5FD; }
  .entry-mini-tag.fix      { background: rgba(251,191,36,.08); color: #FDE68A; }
  .entry-mini-tag.launch   { background: rgba(52,211,153,.10); color: var(--green); }
  .entry-mini-tag.learning { background: rgba(251,146,60,.08); color: #FED7AA; }
  .latest-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; margin-top: 6px; }
  .entry-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .icon-btn { padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-size: .75rem; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .icon-btn:hover { border-color: var(--border-hover); color: var(--text); }
  .icon-btn.danger:hover { border-color: rgba(248,113,113,.4); color: var(--red); }

  .empty-state { padding: 60px 20px; text-align: center; color: var(--muted-2); font-size: .875rem; border: 1px dashed var(--border); border-radius: 12px; }

  @media (max-width: 900px) {
    .admin-wrap { grid-template-columns: 1fr; }
    .sidebar { position: static; height: auto; flex-direction: row; flex-wrap: wrap; padding: 16px; border-right: none; border-bottom: 1px solid var(--border); }
    .sidebar-title { padding: 0 12px 12px; }
    .main-content { padding: 24px 20px; }
    .form-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminLogs() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [view, setView] = useState<'new' | 'list' | ProjectId>('new');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editId, setEditId] = useState<string | null>(null);

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === 'true') setAuthed(true);
  }, []);

  // Show toast then hide
  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch entries
  const fetchEntries = async () => {
    const { data } = await supabase
      .from('build_log_entries')
      .select('*')
      .order('project_id')
      .order('sort_order', { ascending: true });
    setEntries((data ?? []) as Entry[]);
  };

  useEffect(() => { if (authed) fetchEntries(); }, [authed]);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      sessionStorage.setItem('admin_authed', 'true');
      setAuthed(true);
    } else {
      setPwError('Incorrect password.');
    }
  };

  // Toggle tag
  const toggleTag = (tag: Tag) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.day || !form.date) {
      showToast('Please fill in all required fields.', 'error'); return;
    }
    setLoading(true);

    // If marking as latest, unset all others in same project
    if (form.is_latest) {
      await supabase
        .from('build_log_entries')
        .update({ is_latest: false })
        .eq('project_id', form.project_id);
    }

    let error;
    if (editId) {
      ({ error } = await supabase
        .from('build_log_entries')
        .update({ ...form })
        .eq('id', editId));
    } else {
      ({ error } = await supabase
        .from('build_log_entries')
        .insert([{ ...form }]));
    }

    setLoading(false);
    if (error) { showToast('Error saving entry: ' + error.message, 'error'); return; }
    showToast(editId ? 'Entry updated.' : 'Entry added.', 'success');
    setForm({ ...EMPTY_FORM });
    setEditId(null);
    fetchEntries();
    setView('list');
  };

  // Edit entry
  const handleEdit = (entry: Entry) => {
    setForm({
      project_id: entry.project_id,
      day: entry.day,
      date: entry.date,
      title: entry.title,
      body: entry.body,
      tags: entry.tags,
      decision: entry.decision ?? '',
      is_latest: entry.is_latest,
      sort_order: entry.sort_order,
    });
    setEditId(entry.id);
    setView('new');
  };

  // Delete entry
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    const { error } = await supabase.from('build_log_entries').delete().eq('id', id);
    if (error) { showToast('Delete failed.', 'error'); return; }
    showToast('Entry deleted.', 'success');
    fetchEntries();
  };

  // Filter entries for sidebar counts and list views
  const filtered = view === 'list'
    ? entries
    : (PROJECTS.map(p => p.id) as string[]).includes(view)
      ? entries.filter(e => e.project_id === view)
      : entries;

  if (!authed) {
    return (
      <>
        <style>{css}</style>
        <div className="lock-screen">
          <div className="lock-card">
            <h1>Admin Access</h1>
            <p>Enter the admin password to continue.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              {pwError && <p className="lock-error">{pwError}</p>}
              <button className="btn-submit" style={{ marginTop: 20, width: '100%' }} type="submit">
                Enter
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="admin-wrap">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">Build Logs Admin</div>

          <div className="sidebar-section">Actions</div>
          <button className={`sidebar-btn${view === 'new' ? ' active' : ''}`} onClick={() => { setView('new'); setForm({ ...EMPTY_FORM }); setEditId(null); }}>
            ✦ {editId ? 'Editing Entry' : 'New Entry'}
          </button>
          <button className={`sidebar-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>
            ☰ All Entries <span className="count">{entries.length}</span>
          </button>

          <div className="sidebar-section">By Project</div>
          {PROJECTS.map(p => (
            <button
              key={p.id}
              className={`sidebar-btn${view === p.id ? ' active' : ''}`}
              onClick={() => setView(p.id as ProjectId)}
            >
              {p.label}
              <span className="count">{entries.filter(e => e.project_id === p.id).length}</span>
            </button>
          ))}

          <div className="sidebar-logout">
            <a href="/build-logs" style={{ display: 'block', marginBottom: 8, fontSize: '.78rem', color: 'var(--muted)', textDecoration: 'none' }}>← View public page</a>
            <button className="logout-btn" onClick={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false); }}>
              Log out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="main-content">
          {/* NEW / EDIT FORM */}
          {view === 'new' && (
            <>
              <div className="main-header">
                <div>
                  <h2>{editId ? 'Edit Entry' : 'New Entry'}</h2>
                  <p>{editId ? 'Editing an existing log entry' : 'Add a new build log entry'}</p>
                </div>
              </div>
              <div className="form-card">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* Project */}
                    <div className="form-group">
                      <label>Project *</label>
                      <select title="Project" value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value as ProjectId }))}>
                        {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                      </select>
                    </div>

                    {/* Sort order */}
                    <div className="form-group">
                      <label>Sort Order</label>
                      <input type="number" placeholder="0" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
                      <span className="hint">Lower = shown first within project (0, 1, 2…)</span>
                    </div>

                    {/* Day */}
                    <div className="form-group">
                      <label>Day Label *</label>
                      <input value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))} placeholder="Day 01 · Milestone · Update · Launch" />
                    </div>

                    {/* Date */}
                    <div className="form-group">
                      <label>Date *</label>
                      <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Mar 2026" />
                    </div>

                    {/* Title */}
                    <div className="form-group full">
                      <label>Title *</label>
                      <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What happened in this entry?" />
                    </div>

                    {/* Body */}
                    <div className="form-group full">
                      <label>Body * — HTML allowed e.g. &lt;strong&gt;text&lt;/strong&gt;</label>
                      <textarea className="body-field" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Describe what you built, fixed, or decided. Use <strong>text</strong> for emphasis." />
                    </div>

                    {/* Decision */}
                    <div className="form-group full">
                      <label>Decision (optional)</label>
                      <textarea value={form.decision} onChange={e => setForm(f => ({ ...f, decision: e.target.value }))} placeholder="What key engineering or product decision did you make?" />
                    </div>

                    {/* Tags */}
                    <div className="form-group full">
                      <label>Tags *</label>
                      <div className="tag-row">
                        {TAGS.map(tag => (
                          <span key={tag.id}>
                            <input
                              type="checkbox"
                              className="tag-check"
                              id={`tag-${tag.id}`}
                              checked={form.tags.includes(tag.id)}
                              onChange={() => toggleTag(tag.id)}
                            />
                            <label className="tag-check-label" htmlFor={`tag-${tag.id}`}>{tag.label}</label>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Is latest */}
                    <div className="form-group full">
                      <label>Mark as latest entry for this project?</label>
                      <div className="toggle-row">
                        <label className="toggle">
                          <input type="checkbox" aria-label="Mark as latest entry" checked={form.is_latest} onChange={e => setForm(f => ({ ...f, is_latest: e.target.checked }))} />
                          <span className="toggle-slider" />
                        </label>
                        <span className="toggle-label">{form.is_latest ? 'Yes — will show LATEST badge and blue dot' : 'No'}</span>
                      </div>
                      <span className="hint">Enabling this will automatically unset any other "latest" entry for the same project.</span>
                    </div>
                  </div>

                  <div className="form-actions" style={{ marginTop: 24 }}>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Saving…' : editId ? 'Update Entry' : 'Add Entry'}
                    </button>
                    {editId && (
                      <button type="button" className="btn-cancel" onClick={() => { setForm({ ...EMPTY_FORM }); setEditId(null); }}>
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}

          {/* LIST VIEW */}
          {view !== 'new' && (
            <>
              <div className="main-header">
                <div>
                  <h2>{view === 'list' ? 'All Entries' : PROJECTS.find(p => p.id === view)?.label}</h2>
                  <p>{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}</p>
                </div>
                <button className="btn-submit" onClick={() => { setView('new'); setForm({ ...EMPTY_FORM }); setEditId(null); }}>
                  + New Entry
                </button>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state">No entries yet for this project.</div>
              ) : (
                <div className="entries-list">
                  {filtered.map(entry => (
                    <div key={entry.id} className="entry-row">
                      {entry.is_latest && <span className="latest-dot" />}
                      <div className="entry-row-body">
                        <div className="entry-row-title">{entry.title}</div>
                        <div className="entry-row-meta">
                          <span className="entry-row-day">{entry.day} · {entry.date}</span>
                          <span className="entry-row-project">{PROJECTS.find(p => p.id === entry.project_id)?.label}</span>
                          <div className="entry-row-tags">
                            {entry.tags.map(tag => (
                              <span key={tag} className={`entry-mini-tag ${tag}`}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="entry-actions">
                        <button className="icon-btn" onClick={() => handleEdit(entry)}>Edit</button>
                        <button className="icon-btn danger" onClick={() => handleDelete(entry.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}