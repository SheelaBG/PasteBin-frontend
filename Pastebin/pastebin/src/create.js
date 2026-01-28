import { useState } from "react";

export default function Create() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const res = await fetch("http://localhost:8080/paste/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl || undefined,
        max_views: views || undefined
      })
    });
    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div>
      <textarea onChange={e => setContent(e.target.value)} />
      <input placeholder="TTL seconds" onChange={e => setTtl(e.target.value)} />
      <input placeholder="Max views" onChange={e => setViews(e.target.value)} />
      <button onClick={submit}>Create</button>
      {url && <p><a href={url}>{url}</a></p>}
    </div>
  );
}
