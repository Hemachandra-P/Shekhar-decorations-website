'use client';

import { useEffect, useRef, useState } from 'react';

export default function AdminPage() {
  const fileRef = useRef(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadPhotos() {
    const response = await fetch('/api/photos', { cache: 'no-store' });
    const data = await response.json();
    setPhotos(data.photos || []);
  }

  useEffect(() => {
    fetch('/api/auth/session').then((r) => r.json()).then((data) => {
      setAuthenticated(Boolean(data.authenticated));
      setChecking(false);
      if (data.authenticated) loadPhotos();
    }).catch(() => setChecking(false));
  }, []);

  async function login(e) {
    e.preventDefault();
    setStatus('');
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const data = await response.json();
    if (!response.ok) return setStatus(data.error || 'Login failed.');
    setAuthenticated(true);
    setPassword('');
    loadPhotos();
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false);
    setPhotos([]);
  }

  async function upload() {
    if (!files.length) return;
    setBusy(true); setStatus('Optimising and uploading photos…');
    try {
      const form = new FormData();
      files.forEach((file) => form.append('files', file));
      const response = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed.');
      setFiles([]); if (fileRef.current) fileRef.current.value = '';
      await loadPhotos();
      setStatus(`${data.photos?.length || files.length} photo(s) uploaded successfully.`);
    } catch (error) { setStatus(error.message); }
    finally { setBusy(false); }
  }

  async function removePhoto(photo) {
    if (!confirm('Delete this photo from the website?')) return;
    setBusy(true); setStatus('Deleting…');
    try {
      const response = await fetch('/api/delete', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: photo.id }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed.');
      await loadPhotos(); setStatus('Photo deleted.');
    } catch (error) { setStatus(error.message); }
    finally { setBusy(false); }
  }

  if (checking) return <main className="admin-shell"><div className="admin-card"><p className="admin-muted">Loading admin…</p></div></main>;

  if (!authenticated) return (
    <main className="admin-shell">
      <form className="admin-card login-card" onSubmit={login}>
        <a href="/" className="admin-back">← Back to website</a>
        <img src="/shekar-events-logo.png" className="admin-logo" alt="Shekhar Events" />
        <p className="eyebrow">Private Admin</p>
        <h1>Manage event photos.</h1>
        <p className="admin-muted">Sign in to add or remove decoration photos from the public gallery.</p>
        <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required /></label>
        <button className="btn primary" type="submit">Sign in</button>
        {status && <p className="admin-status">{status}</p>}
      </form>
    </main>
  );

  return (
    <main className="admin-shell">
      <div className="admin-dashboard">
        <div className="admin-top">
          <div><p className="eyebrow">Shekhar Events</p><h1>Photo Manager</h1></div>
          <div className="admin-top-actions"><a href="/">View website</a><button onClick={logout}>Sign out</button></div>
        </div>
        <section className="upload-panel">
          <div><p className="eyebrow">Add new event photos</p><h2>Upload from your phone or laptop.</h2><p className="admin-muted">Photos are converted to WebP and resized up to 3840px before being stored and delivered through Cloudinary.</p></div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          <div className="selected-files">{files.map((file) => <span key={file.name}>{file.name}</span>)}</div>
          <button className="btn primary" onClick={upload} disabled={busy || !files.length}>{busy ? 'Uploading…' : `Upload ${files.length || ''} photo${files.length === 1 ? '' : 's'}`}</button>
          {status && <p className="admin-status">{status}</p>}
        </section>
        <section>
          <div className="admin-list-head"><h2>Current gallery</h2><span>{photos.length} uploaded photos</span></div>
          <div className="admin-photo-grid">
            {photos.map((photo) => <article key={photo.id}><img src={photo.url} alt={photo.title} /><div><span>{photo.title}</span><button onClick={() => removePhoto(photo)}>Delete</button></div></article>)}
          </div>
        </section>
      </div>
    </main>
  );
}
