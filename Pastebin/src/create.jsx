import { useState } from "react";
import axios from "axios";

export default function Create() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    try {
      const res = await axios.post("http://localhost:8080/paste/create", {
        frontendUrl: window.location.origin,
        content,
        ttl_seconds: ttl || undefined,
        max_views: views || undefined,
      });

      setUrl(res.data.url);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your content here"
      />
      <input
        type="number"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        placeholder="TTL (seconds)"
      />
      <input
        type="number"
        value={views}
        onChange={(e) => setViews(e.target.value)}
        placeholder="Max views"
      />
      <button onClick={submit}>Create</button>
      {url && (
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
