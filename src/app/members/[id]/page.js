"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../../_components/Loading";
import { SpotifySong, SpotifyCover } from "../../_components/Spotify";

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
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{member.name}</h1>
        <p className="text-gray-600 text-lg">{member.bio}</p>
      </section>

      {/* Galeria de Fotos 
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fotos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {member.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${member.name} ${index + 1}`}
              className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>
      */}

      {/* Álbuns Favoritos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Álbuns Favoritos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {member.albums.map((album, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 bg-white rounded-2xl shadow-lg p-3 hover:shadow-xl"
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-32 h-32 object-cover rounded-xl"
              />
              <p className="font-medium text-center">{album.title}</p>
              <p className="text-sm text-gray-500">{album.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Música Favorita (Spotify Embed) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Favorita de tocar na Anistia</h2>
        <SpotifySong trackId={member.favoriteToPlay} />
      </section>
    </div>
  );
}
