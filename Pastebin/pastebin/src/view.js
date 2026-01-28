import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/paste/view/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  if (error) return <h2>Not found</h2>;
  if (!data) return <p>Loading...</p>;

  return <pre>{data.content}</pre>;
}
