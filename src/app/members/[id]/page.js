"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../../components/Loading";

export default function Member() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const idName = {
    1: "gabriel",
    2: "rafa",
    3: "gustavo",
    4: "ana",
  };

  useEffect(() => {
    async function fetchMember() {
      let isMounted = true;
      try {
        const name = idName[id];
        if (!name) {
          if (isMounted) {
            setError("Membro não encontrado");
            setLoading(false);
          }
          return;
        }

        const response = await fetch(`http://localhost:3001/${name}`);
        if (!response.ok) throw new Error("Erro ao buscar membro.");
        const data = await response.json();

        if (isMounted) {
          setMember(data);
          console.log("Dados do membro:", data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMember();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <p>{member.name}</p>
      <p>{member.bio}</p>
      <p>Álbuns: {member.albums.join(", ")}</p>
      <p>Artistas: {member.artists.join(", ")}</p>
      <p>Favorita: {member.favoriteToPlay}</p>
    </div>
  );
}
