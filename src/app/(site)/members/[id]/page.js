"use client";

import { useState, useEffect } from "react";
import Loading from "../../_components/Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  SpotifySongs,
  SpotifyAlbums,
  SpotifyArtists,
} from "../../_components/Spotify";
import Swal from "sweetalert2";

export default function Member() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (!id) return;

    async function fetchMember() {
      try {
        const response = await fetch(`/api/members/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar membro");
        const data = await response.json();
        setMember(data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops... Erro ao carregar membro!",
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  let imagePath = "";

  switch (member.name) {
    case "Gabriel Dantas":
      imagePath = "/assets/gabriel/membro.jpg";
      break;
    case "Ana Calegari":
      imagePath = "/assets/ana/membro.jpg";
      break;
    case "Gutz Pedroza":
      imagePath = "/assets/gustavo/membro.jpg";
      break;
    case "Rafa Melo":
      imagePath = "/assets/rafa/membro.jpg";
      break;
  }

  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">{member.name}</h1>
        <a href="/members" className="hover:underline font-bold">Voltar</a>
      </div>

      <section className="flex flex-col lg:flex-row items-center lg:items-start gap-6 text-center lg:text-left">
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-96">
            <Image
              src={imagePath}
              alt={member.name}
              fill
              className="object-contain rounded-xl shadow-md"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <p className="text-lg max-w-prose">{member.bio}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Artistas Favoritos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {member.artists.map((artist, index) => (
            <SpotifyArtists artistId={artist} key={index} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Álbuns Favoritos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {member.albums.map((album, index) => (
            <SpotifyAlbums albumId={album} key={index} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Favorita de tocar na Anistia
        </h2>
        <SpotifySongs trackId={member.favorite_to_play} />
      </section>
    </div>
  );
}
