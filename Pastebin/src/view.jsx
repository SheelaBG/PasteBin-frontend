import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_PASTE_BIN_BASE_URL;

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchPaste = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/pastes/${id}`);
        setPaste(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) return <p>Loading paste...</p>;
  if (error || !paste) return <h2>Paste not found</h2>;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Paste</h2>

      <pre
        style={{
          backgroundColor: "#1e1e1e",
          color: "#f5f5f5",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #333",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowX: "auto",
          fontFamily: "monospace",
          fontSize: "0.95rem",
        }}
      >
        {paste.content}
      </pre>

      <div style={{ marginTop: "1rem", color: "#555", fontSize: "0.9rem" }}>
        {paste.remaining_views !== null && (
          <p>
            <strong>Remaining Views:</strong> {paste.remaining_views}
          </p>
        )}

        {paste.expires_at && (
          <p>
            <strong>Expires At:</strong>{" "}
            {new Date(paste.expires_at).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
