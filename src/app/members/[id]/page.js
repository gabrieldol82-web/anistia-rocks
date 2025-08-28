"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../../_components/Loading";
import { SpotifySongs, SpotifyAlbums, SpotifyArtists } from "../../_components/Spotify";

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
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-4xl font-bold">{member.name}</h1>
      <section className="text-center space-y-4 flex flex-row md:flex-col items-center">
        <div className="w-3/4"></div>
        <div className="w-1/4">
          <p className="text-lg">{member.bio}</p>
        </div>
        
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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Artistas Favoritos</h2>
        <div className="grid grid-cols-1 gap-6">
          {member.artists.map((artist, index) => {
            return <SpotifyArtists artistId={artist} key={index} />;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Álbuns Favoritos</h2>
        <div className="grid grid-cols-1 gap-6">
          {member.albums.map((album, index) => {
            return <SpotifyAlbums albumId={album} key={index} />;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Favorita de tocar na Anistia</h2>
        <SpotifySongs trackId={member.favoriteToPlay} />
      </section>
    </div>
  );
}
