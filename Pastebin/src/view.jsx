import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/paste/view/${id}`)
      .then(response => {
        setData(response.data); 
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <h2>Not found</h2>;
  if (!data) return <p>Loading...</p>;

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
}
