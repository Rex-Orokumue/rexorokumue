'use client';
// app/admin/blog/page.tsx

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── IMPORTANT: create a bucket called "blog-images" in Supabase Storage
// and set it to Public. The upload function below depends on that bucket name.
const IMAGE_BUCKET = 'blog-images';

type Category = 'engineering' | 'product' | 'ai' | 'general';

const CATEGORIES: { id: Category; label: string; color: string }[] = [
  { id: 'engineering', label: 'Engineering', color: '#3B82F6' },
  { id: 'product',     label: 'Product',     color: '#A78BFA' },
  { id: 'ai',          label: 'AI',          color: '#34D399' },
  { id: 'general',     label: 'General',     color: '#94A3B8' },
];

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: Category;
  tags: string[];
  published: boolean;
  published_at: string | null;
  scheduled_at: string | null;   // ← NEW
  created_at: string;
}

const EMPTY_FORM = {
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  category: 'general' as Category,
  tags: '' as string,
  published: false,
  scheduled_at: '',   // ← NEW  (datetime-local string)
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ────────────────────────────────────────────────
// CSS
// ────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0F172A; --surface: rgba(30,41,59,0.7); --surface-2: rgba(15,23,42,0.8);
    --accent: #3B82F6; --accent-dim: rgba(59,130,246,0.12); --accent-glow: rgba(59,130,246,0.3);
    --accent-light: #93C5FD; --text: #F1F5F9; --muted: #94A3B8; --muted-2: #64748B;
    --border: rgba(255,255,255,0.08); --border-hover: rgba(59,130,246,0.3);
    --green: #34D399; --red: #F87171; --amber: #FBBF24;
  }
  html, body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  body { padding: 0; overflow-x: hidden; }

  /* ── LOCK ── */
  .lock-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .lock-card { width: 100%; max-width: 380px; padding: 40px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; backdrop-filter: blur(16px); }
  .lock-card h1 { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 6px; }
  .lock-card p { font-size: .83rem; color: var(--muted); margin-bottom: 28px; }
  .lock-error { font-size: .78rem; color: var(--red); margin-top: 10px; }

  /* ── LAYOUT ── */
  .admin-wrap { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
  .sidebar {
    background: var(--surface-2); border-right: 1px solid var(--border);
    padding: 28px 16px; display: flex; flex-direction: column; gap: 4px;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .sidebar-title { font-family: 'Syne', sans-serif; font-size: .85rem; font-weight: 800; color: var(--text); padding: 0 10px 18px; border-bottom: 1px solid var(--border); margin-bottom: 10px; }
  .sidebar-section { font-size: .60rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted-2); padding: 10px 10px 4px; }
  .sidebar-btn { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; border: none; background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: .82rem; cursor: pointer; transition: all .2s; text-align: left; width: 100%; }
  .sidebar-btn:hover { background: rgba(255,255,255,.05); color: var(--text); }
  .sidebar-btn.active { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-glow); }
  .sidebar-btn .count { margin-left: auto; font-size: .68rem; color: var(--muted-2); font-family: 'JetBrains Mono', monospace; }
  .sidebar-nav-link { display: block; padding: 8px 10px; border-radius: 8px; font-size: .78rem; color: var(--muted); text-decoration: none; transition: all .2s; }
  .sidebar-nav-link:hover { color: var(--text); background: rgba(255,255,255,.04); }
  .sidebar-logout { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border); }
  .logout-btn { width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: .82rem; cursor: pointer; transition: all .2s; }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── MAIN ── */
  .main-content { padding: 40px 48px; overflow-y: auto; }
  .main-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; }
  .main-header h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; }
  .main-header p { font-size: .82rem; color: var(--muted); margin-top: 3px; }

  /* ── FORM ── */
  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; backdrop-filter: blur(12px); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: .75rem; font-weight: 600; color: var(--muted); letter-spacing: .04em; text-transform: uppercase; }
  input, select, textarea { padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border); background: rgba(15,23,42,.6); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: .875rem; outline: none; transition: border-color .2s; width: 100%; }
  input:focus, select:focus, textarea:focus { border-color: var(--accent-glow); }
  textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
  textarea.body-field { min-height: 340px; font-family: 'JetBrains Mono', monospace; font-size: .80rem; }
  select option { background: #1E293B; }
  input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
  .hint { font-size: .72rem; color: var(--muted-2); line-height: 1.5; }
  .slug-preview { font-family: 'JetBrains Mono', monospace; font-size: .72rem; color: var(--accent); margin-top: 4px; }

  /* ── TOGGLE ── */
  .toggle-row { display: flex; align-items: center; gap: 12px; }
  .toggle { position: relative; width: 40px; height: 22px; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider { position: absolute; inset: 0; background: rgba(255,255,255,.1); border-radius: 100px; border: 1px solid var(--border); cursor: pointer; transition: background .2s; }
  .toggle-slider::before { content: ''; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px; background: var(--muted-2); border-radius: 50%; transition: transform .2s, background .2s; }
  .toggle input:checked + .toggle-slider { background: rgba(52,211,153,.15); border-color: rgba(52,211,153,.3); }
  .toggle input:checked + .toggle-slider::before { transform: translateX(18px); background: var(--green); }
  .toggle-label { font-size: .82rem; color: var(--muted); }

  /* ── IMAGE UPLOAD ── */
  .image-upload-area {
    border: 2px dashed var(--border);
    border-radius: 10px;
    padding: 22px;
    text-align: center;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    background: rgba(15,23,42,.4);
    position: relative;
  }
  .image-upload-area:hover,
  .image-upload-area.dragging { border-color: var(--accent-glow); background: var(--accent-dim); }
  .image-upload-area input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .upload-icon { font-size: 1.6rem; margin-bottom: 8px; }
  .upload-text { font-size: .82rem; color: var(--muted); line-height: 1.6; }
  .upload-text strong { color: var(--accent-light); }
  .upload-progress { margin-top: 10px; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .upload-progress-bar { height: 100%; background: var(--accent); border-radius: 2px; transition: width .3s; }
  .uploaded-images { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
  .uploaded-img-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: rgba(15,23,42,.5);
  }
  .uploaded-img-thumb { width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border); flex-shrink: 0; }
  .uploaded-img-info { flex: 1; min-width: 0; }
  .uploaded-img-url { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--muted-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .uploaded-img-name { font-size: .75rem; color: var(--text); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .btn-insert-img { padding: 5px 10px; border-radius: 6px; border: 1px solid var(--accent-glow); background: var(--accent-dim); color: var(--accent-light); font-size: .70rem; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .2s; white-space: nowrap; flex-shrink: 0; }
  .btn-insert-img:hover { background: rgba(59,130,246,.2); }
  .btn-delete-img { padding: 5px 8px; border-radius: 6px; border: 1px solid rgba(248,113,113,.2); background: transparent; color: var(--red); font-size: .70rem; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .2s; flex-shrink: 0; }
  .btn-delete-img:hover { background: rgba(248,113,113,.1); }

  /* ── SCHEDULE BOX ── */
  .schedule-box {
    padding: 16px 18px;
    border-radius: 10px;
    border: 1px solid rgba(251,191,36,.2);
    background: rgba(251,191,36,.05);
    margin-top: 4px;
  }
  .schedule-box label { color: var(--amber); display: block; margin-bottom: 8px; }
  .schedule-status {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: .72rem; color: var(--amber); margin-top: 6px;
  }
  .schedule-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--amber); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

  /* ── BUTTONS ── */
  .btn-submit { padding: 11px 28px; background: var(--accent); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .875rem; cursor: pointer; transition: all .2s; box-shadow: 0 4px 20px var(--accent-glow); }
  .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 28px var(--accent-glow); }
  .btn-submit:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .btn-publish { padding: 11px 28px; background: rgba(52,211,153,.15); color: var(--green); border: 1px solid rgba(52,211,153,.3); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .875rem; cursor: pointer; transition: all .2s; }
  .btn-publish:hover { background: rgba(52,211,153,.25); }
  .btn-schedule { padding: 11px 28px; background: rgba(251,191,36,.1); color: var(--amber); border: 1px solid rgba(251,191,36,.3); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .875rem; cursor: pointer; transition: all .2s; }
  .btn-schedule:hover { background: rgba(251,191,36,.18); }
  .btn-cancel { padding: 10px 22px; background: transparent; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: .875rem; cursor: pointer; transition: all .2s; }
  .btn-cancel:hover { border-color: rgba(255,255,255,.18); color: var(--text); }
  .form-actions { display: flex; gap: 10px; padding-top: 8px; flex-wrap: wrap; }

  /* ── TOAST ── */
  .toast { position: fixed; bottom: 28px; right: 28px; padding: 12px 20px; border-radius: 10px; font-size: .82rem; font-weight: 500; z-index: 9999; animation: slideUp .3s ease; }
  .toast.success { background: rgba(52,211,153,.15); border: 1px solid rgba(52,211,153,.3); color: var(--green); }
  .toast.error { background: rgba(248,113,113,.12); border: 1px solid rgba(248,113,113,.3); color: var(--red); }
  @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

  /* ── POST LIST ── */
  .posts-list { display: flex; flex-direction: column; gap: 10px; }
  .post-row { display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; transition: border-color .2s; }
  .post-row:hover { border-color: var(--border-hover); }
  .post-row-body { flex: 1; min-width: 0; }
  .post-row-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .88rem; color: var(--text); margin-bottom: 4px; }
  .post-row-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .post-row-date { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--muted-2); }
  .post-row-slug { font-size: .68rem; color: var(--muted-2); }
  .post-row-excerpt { font-size: .78rem; color: var(--muted); margin-top: 4px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .status-badge { padding: 2px 8px; border-radius: 4px; font-size: .60rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
  .status-badge.published { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.25); color: var(--green); }
  .status-badge.draft { background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.2); color: #FDE68A; }
  .status-badge.scheduled { background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.25); color: var(--amber); }
  .cat-badge { padding: 2px 8px; border-radius: 4px; font-size: .60rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; background: var(--accent-dim); border: 1px solid var(--accent-glow); color: var(--accent-light); }
  .post-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .icon-btn { padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-size: .75rem; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .icon-btn:hover { border-color: var(--border-hover); color: var(--text); }
  .icon-btn.danger:hover { border-color: rgba(248,113,113,.4); color: var(--red); }
  .icon-btn.publish { color: var(--green); }
  .icon-btn.publish:hover { border-color: rgba(52,211,153,.4); }

  .empty-state { padding: 60px 20px; text-align: center; color: var(--muted-2); font-size: .875rem; border: 1px dashed var(--border); border-radius: 12px; }

  @media (max-width: 900px) {
    .admin-wrap { grid-template-columns: 1fr; }
    .sidebar { position: static; height: auto; padding: 16px; border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; flex-wrap: wrap; }
    .main-content { padding: 24px 20px; }
    .form-grid { grid-template-columns: 1fr; }
  }
`;

// ────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────
export default function AdminBlog() {
  const [authed,      setAuthed]      = useState(false);
  const [pw,          setPw]          = useState('');
  const [pwError,     setPwError]     = useState('');
  const [view,        setView]        = useState<'new' | 'list' | 'drafts' | 'published' | 'scheduled'>('new');
  const [posts,       setPosts]       = useState<Post[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [toast,       setToast]       = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [form,        setForm]        = useState({ ...EMPTY_FORM });
  const [editId,      setEditId]      = useState<string | null>(null);
  const [slugManual,  setSlugManual]  = useState(false);

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState<{ name: string; url: string }[]>([]);
  const [uploading,      setUploading]      = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging,       setDragging]       = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const publishedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === 'true') setAuthed(true);
  }, []);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts((data ?? []) as unknown as Post[]);
  };

  useEffect(() => { if (authed) fetchPosts(); }, [authed]);

  // ── Auto-publish scheduled posts that have passed ──────────────────────
  useEffect(() => {
    if (!authed || posts.length === 0) return;
    const now = new Date();
    const toPublish = posts.filter(p =>
      !p.published &&
      p.scheduled_at &&
      new Date(p.scheduled_at) <= now &&
      !publishedIdsRef.current.has(p.id)   // ← skip already-processed
    );
    if (toPublish.length === 0) return;
    // Mark them immediately so a re-render doesn't re-trigger
    toPublish.forEach(p => publishedIdsRef.current.add(p.id));
    Promise.all(
      toPublish.map(p =>
        supabase.from('blog_posts').update({
          published: true,
          published_at: p.scheduled_at,
        }).eq('id', p.id)
      )
    ).then(() => fetchPosts());
  }, [authed, posts]);

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

  const handleTitleChange = (val: string) => {
    setForm(f => ({ ...f, title: val, slug: slugManual ? f.slug : slugify(val) }));
  };

  // ── Image upload ────────────────────────────────────────────────────────
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);

    const newImages: { name: string; url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext  = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (error) {
        showToast(`Upload failed: ${error.message || file.name}`, 'error');
      } else {
        const { data: urlData } = supabase.storage
          .from(IMAGE_BUCKET)
          .getPublicUrl(path);
        newImages.push({ name: file.name, url: urlData.publicUrl });
      }

      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploadedImages(prev => [...prev, ...newImages]);
    setUploading(false);
    if (newImages.length > 0) showToast(`${newImages.length} image(s) uploaded.`, 'success');
  };

  // Insert <img> tag at cursor position in body textarea
  const insertImageTag = (url: string) => {
    const tag = `<img src="${url}" alt="" />`;
    const el  = bodyRef.current;
    if (!el) {
      setForm(f => ({ ...f, body: f.body + '\n' + tag }));
      return;
    }
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const newBody = form.body.slice(0, start) + '\n' + tag + '\n' + form.body.slice(end);
    setForm(f => ({ ...f, body: newBody }));
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + tag.length + 2, start + tag.length + 2);
    }, 0);
  };

  const deleteUploadedImage = async (url: string, name: string) => {
    // Extract storage path from URL
    const parts = url.split(`/${IMAGE_BUCKET}/`);
    if (parts.length < 2) return;
    const path = parts[1];
    await supabase.storage.from(IMAGE_BUCKET).remove([path]);
    setUploadedImages(prev => prev.filter(img => img.url !== url));
    showToast('Image removed.', 'success');
  };

  // ── Save / Publish ──────────────────────────────────────────────────────
  const handleSubmit = async (
    e: React.FormEvent,
    publishNow = false,
    scheduleNow = false,
  ) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.body || !form.slug) {
      showToast('Title, slug, excerpt, and body are required.', 'error'); return;
    }
    if (scheduleNow && !form.scheduled_at) {
      showToast('Pick a date/time to schedule this post.', 'error'); return;
    }
    setLoading(true);

    const tagsArray    = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const shouldPublish = publishNow || form.published;

    const payload: Partial<Post> & { tags: string[] } = {
      slug:         form.slug,
      title:        form.title,
      excerpt:      form.excerpt,
      body:         form.body,
      category:     form.category,
      tags:         tagsArray,
      published:    scheduleNow ? false : shouldPublish,
      published_at: shouldPublish && !scheduleNow ? new Date().toISOString() : null,
      scheduled_at: scheduleNow && form.scheduled_at
        ? new Date(form.scheduled_at).toISOString()
        : null,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', editId));
    } else {
      ({ error } = await supabase.from('blog_posts').insert([payload]));
    }

    setLoading(false);
    if (error) { showToast('Error: ' + error.message, 'error'); return; }

    const msg = scheduleNow
      ? `Post scheduled for ${new Date(form.scheduled_at).toLocaleString()}.`
      : publishNow
      ? 'Post published!'
      : editId ? 'Post updated.' : 'Draft saved.';
    showToast(msg, 'success');

    setForm({ ...EMPTY_FORM });
    setEditId(null);
    setSlugManual(false);
    setUploadedImages([]);
    fetchPosts();
    setView('list');
  };

  const handleEdit = (post: Post) => {
    setForm({
      slug:         post.slug,
      title:        post.title,
      excerpt:      post.excerpt,
      body:         post.body,
      category:     post.category,
      tags:         post.tags.join(', '),
      published:    post.published,
      scheduled_at: post.scheduled_at
        ? new Date(post.scheduled_at).toISOString().slice(0, 16) // datetime-local format
        : '',
    });
    setEditId(post.id);
    setSlugManual(true);
    setView('new');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) { showToast('Delete failed.', 'error'); return; }
    showToast('Post deleted.', 'success');
    fetchPosts();
  };

  const handleTogglePublish = async (post: Post) => {
    const nowPublished = !post.published;
    const { error } = await supabase
      .from('blog_posts')
      .update({
        published:    nowPublished,
        published_at: nowPublished ? new Date().toISOString() : null,
        scheduled_at: null,   // clear any schedule when manually publishing
      })
      .eq('id', post.id);
    if (error) { showToast('Failed to update.', 'error'); return; }
    showToast(nowPublished ? 'Post published.' : 'Post unpublished.', 'success');
    fetchPosts();
  };

  // Derived counts
  const scheduledPosts = posts.filter(p => !p.published && p.scheduled_at);
  const draftPosts     = posts.filter(p => !p.published && !p.scheduled_at);
  const pubPosts       = posts.filter(p =>  p.published);

  const filtered =
    view === 'list'      ? posts :
    view === 'drafts'    ? draftPosts :
    view === 'published' ? pubPosts :
    view === 'scheduled' ? scheduledPosts :
    posts;

  const getStatusBadge = (post: Post) => {
    if (post.published) return <span className="status-badge published">● Published</span>;
    if (post.scheduled_at) return <span className="status-badge scheduled">⏰ Scheduled</span>;
    return <span className="status-badge draft">◐ Draft</span>;
  };

  // ── Lock screen ─────────────────────────────────────────────────────────
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
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" autoFocus />
              </div>
              {pwError && <p className="lock-error">{pwError}</p>}
              <button className="btn-submit" style={{ marginTop: 20, width: '100%' }} type="submit">Enter</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // ── Admin UI ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="admin-wrap">
        <aside className="sidebar">
          <div className="sidebar-title">Blog Admin</div>

          <div className="sidebar-section">Actions</div>
          <button
            className={`sidebar-btn${view === 'new' ? ' active' : ''}`}
            onClick={() => { setView('new'); setForm({ ...EMPTY_FORM }); setEditId(null); setSlugManual(false); setUploadedImages([]); }}
          >
            ✦ {editId ? 'Editing Post' : 'New Post'}
          </button>

          <div className="sidebar-section">Posts</div>
          <button className={`sidebar-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>
            ☰ All Posts <span className="count">{posts.length}</span>
          </button>
          <button className={`sidebar-btn${view === 'published' ? ' active' : ''}`} onClick={() => setView('published')}>
            ● Published <span className="count">{pubPosts.length}</span>
          </button>
          <button className={`sidebar-btn${view === 'scheduled' ? ' active' : ''}`} onClick={() => setView('scheduled')}>
            ⏰ Scheduled <span className="count">{scheduledPosts.length}</span>
          </button>
          <button className={`sidebar-btn${view === 'drafts' ? ' active' : ''}`} onClick={() => setView('drafts')}>
            ◐ Drafts <span className="count">{draftPosts.length}</span>
          </button>

          <div className="sidebar-section">Navigate</div>
          <a href="/blog" className="sidebar-nav-link">← Public blog</a>
          <a href="/admin" className="sidebar-nav-link">⚙ Build logs admin</a>

          <div className="sidebar-logout">
            <button className="logout-btn" onClick={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false); }}>
              Log out
            </button>
          </div>
        </aside>

        <main className="main-content">

          {/* ── FORM ── */}
          {view === 'new' && (
            <>
              <div className="main-header">
                <div>
                  <h2>{editId ? 'Edit Post' : 'New Post'}</h2>
                  <p>{editId ? 'Editing an existing blog post' : 'Write a new blog post. Save as draft, schedule, or publish immediately.'}</p>
                </div>
              </div>

              <div className="form-card">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">

                    {/* Title */}
                    <div className="form-group full">
                      <label>Title *</label>
                      <input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="What is this post about?" />
                    </div>

                    {/* Slug */}
                    <div className="form-group full">
                      <label>Slug * — URL path</label>
                      <input
                        value={form.slug}
                        onChange={e => { setSlugManual(true); setForm(f => ({ ...f, slug: slugify(e.target.value) })); }}
                        placeholder="auto-generated-from-title"
                      />
                      {form.slug && <div className="slug-preview">yoursite.com/blog/{form.slug}</div>}
                      <span className="hint">Auto-generated from title. Edit if needed.</span>
                    </div>

                    {/* Category */}
                    <div className="form-group">
                      <label>Category *</label>
                      <select title="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>

                    {/* Tags */}
                    <div className="form-group">
                      <label>Tags</label>
                      <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="supabase, flutter, auth" />
                      <span className="hint">Comma-separated.</span>
                    </div>

                    {/* Excerpt */}
                    <div className="form-group full">
                      <label>Excerpt * — shown on listing page</label>
                      <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="A short 1-2 sentence summary." style={{ minHeight: 80 }} />
                    </div>

                    {/* ── IMAGE UPLOAD ── */}
                    <div className="form-group full">
                      <label>Images — upload then insert into body</label>
                      <div
                        className={`image-upload-area${dragging ? ' dragging' : ''}`}
                        onDragOver={e => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={e => { e.preventDefault(); setDragging(false); handleImageUpload(e.dataTransfer.files); }}
                      >
                        <input
                          type="file"
                          title="Upload images"
                          accept="image/*"
                          multiple
                          onChange={e => handleImageUpload(e.target.files)}
                        />
                        <div className="upload-icon">📸</div>
                        <div className="upload-text">
                          <strong>Click to upload</strong> or drag & drop<br />
                          PNG, JPG, GIF, WebP — up to 50 MB each
                        </div>
                        {uploading && (
                          <div className="upload-progress">
                            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        )}
                      </div>

                      {uploadedImages.length > 0 && (
                        <div className="uploaded-images">
                          {uploadedImages.map(img => (
                            <div key={img.url} className="uploaded-img-row">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img.url} alt={img.name} className="uploaded-img-thumb" />
                              <div className="uploaded-img-info">
                                <div className="uploaded-img-name">{img.name}</div>
                                <div className="uploaded-img-url">{img.url}</div>
                              </div>
                              <button type="button" className="btn-insert-img" onClick={() => insertImageTag(img.url)}>
                                Insert ↓
                              </button>
                              <button type="button" className="btn-delete-img" onClick={() => deleteUploadedImage(img.url, img.name)}>
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <span className="hint">After uploading, click "Insert ↓" to drop the image tag at your cursor in the body.</span>
                    </div>

                    {/* Body */}
                    <div className="form-group full">
                      <label>Body * — HTML supported</label>
                      <textarea
                        ref={bodyRef}
                        className="body-field"
                        value={form.body}
                        onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                        placeholder={`Write your post here. HTML is fully supported.\n\nUseful tags:\n<h2>Heading</h2>\n<p>Paragraph</p>\n<strong>Bold</strong>\n<em>Italic</em>\n<blockquote>Pull quote</blockquote>\n<hr/> (renders as · · · section break)\n<ul><li>List item</li></ul>\n<code>inline code</code>\n<pre><code>code block</code></pre>\n<img src="..." alt="" />`}
                      />
                      <span className="hint">
                        Supports HTML. Use &lt;blockquote&gt; for pull quotes, &lt;hr/&gt; for section breaks (· · ·), &lt;aside&gt; for highlighted boxes.
                      </span>
                    </div>

                    {/* Status toggle */}
                    <div className="form-group full">
                      <label>Status</label>
                      <div className="toggle-row">
                        <label className="toggle">
                          <input type="checkbox" aria-label="Published status" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked, scheduled_at: e.target.checked ? '' : f.scheduled_at }))} />
                          <span className="toggle-slider" />
                        </label>
                        <span className="toggle-label">
                          {form.published ? '● Published — visible to everyone' : '◐ Draft — only visible to you'}
                        </span>
                      </div>
                    </div>

                    {/* ── SCHEDULE ── */}
                    {!form.published && (
                      <div className="form-group full">
                        <div className="schedule-box">
                          <label className="schedule-label">⏰ Schedule publishing (optional)</label>
                          <input
                            type="datetime-local"
                            title="Scheduled publish date"
                            value={form.scheduled_at}
                            min={new Date().toISOString().slice(0, 16)}
                            onChange={e => setForm(f => ({ ...f, scheduled_at: e.target.value }))}
                          />
                          {form.scheduled_at && (
                            <div className="schedule-status">
                              <span className="schedule-dot" />
                              Will auto-publish on {new Date(form.scheduled_at).toLocaleString()}
                            </div>
                          )}
                          <div className="hint" style={{ marginTop: 6 }}>
                            Leave blank to save as a plain draft. The post will go live automatically at the chosen time.
                          </div>
                        </div>
                      </div>
                    )}

                  </div>{/* /form-grid */}

                  <div className="form-actions" style={{ marginTop: 24 }}>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Saving…' : editId ? 'Update Post' : 'Save Draft'}
                    </button>

                    {!form.published && !form.scheduled_at && (
                      <button type="button" className="btn-publish" disabled={loading}
                        onClick={e => handleSubmit(e as unknown as React.FormEvent, true)}>
                        Publish Now →
                      </button>
                    )}

                    {!form.published && form.scheduled_at && (
                      <button type="button" className="btn-schedule" disabled={loading}
                        onClick={e => handleSubmit(e as unknown as React.FormEvent, false, true)}>
                        Schedule →
                      </button>
                    )}

                    {editId && (
                      <button type="button" className="btn-cancel"
                        onClick={() => { setForm({ ...EMPTY_FORM }); setEditId(null); setSlugManual(false); setUploadedImages([]); }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}

          {/* ── LIST ── */}
          {view !== 'new' && (
            <>
              <div className="main-header">
                <div>
                  <h2>
                    {view === 'list'      ? 'All Posts' :
                     view === 'drafts'    ? 'Drafts' :
                     view === 'scheduled' ? 'Scheduled' :
                     'Published'}
                  </h2>
                  <p>{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</p>
                </div>
                <button className="btn-submit" onClick={() => { setView('new'); setForm({ ...EMPTY_FORM }); setEditId(null); setUploadedImages([]); }}>
                  + New Post
                </button>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state">No posts here yet.</div>
              ) : (
                <div className="posts-list">
                  {filtered.map(post => (
                    <div key={post.id} className="post-row">
                      <div className="post-row-body">
                        <div className="post-row-title">{post.title}</div>
                        <div className="post-row-meta">
                          {getStatusBadge(post)}
                          <span className="cat-badge">{post.category}</span>
                          <span className="post-row-slug">/{post.slug}</span>
                          <span className="post-row-date">
                            {post.scheduled_at && !post.published
                              ? `Scheduled: ${formatDate(post.scheduled_at)}`
                              : formatDate(post.created_at)}
                          </span>
                        </div>
                        <div className="post-row-excerpt">{post.excerpt}</div>
                      </div>
                      <div className="post-actions">
                        <button className="icon-btn publish" onClick={() => handleTogglePublish(post)} title={post.published ? 'Unpublish' : 'Publish'}>
                          {post.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button className="icon-btn" onClick={() => handleEdit(post)}>Edit</button>
                        <button className="icon-btn danger" onClick={() => handleDelete(post.id)}>Delete</button>
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