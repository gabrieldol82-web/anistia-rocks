"use client";

import { useEffect, useState } from "react";
import { useShow } from "../context/ShowContext";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ViewShows({ pageName, isAdmin = false }) {
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState([]);
  const { currentShow, setCurrentShow } = useShow();

  const getShows = async () => {
    let res = await fetch("http://localhost:3333/shows");
    let data = await res.json();
    setShows(data);
  };

  useEffect(() => {
    getShows();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este show?")) {
      return;
    }
    setLoading(true);
    await fetch(`http://localhost:3333/shows/${id}`, {
      method: "DELETE",
    });
    setLoading(false);
    getShows();
  };

  const handleEdit = (show) => {
    setCurrentShow(show);
  };

  return (
    <div className="overflow-y-auto">
      <h1 className="from-neutral-50 text-center text-[28px]">{pageName}</h1>
      {shows.length === 0 && (
        <p className="text-center text-zinc-400">Carregando Shows...</p>
      )}
      {loading && (
        <p className="text-center text-zinc-400">Excluindo Show...</p>
      )}
      {shows.map((show) => {
        const isCompletedShow = show.is_completed ? 'opacity-50 ' : '';
        return (
          <div
            key={show.id}
            className={`border-b ${isCompletedShow} border-zinc-700 py-2 flex flex-row`}
          >
            <div className="w-3/4">
              <h2 className="font-bold text-lg">{show.title}</h2>
              <p className="text-sm text-zinc-400">{show.description}</p>
              <p className="text-[16px] text-zinc-400">
                {formatDate(show.show_date)}
              </p>
            </div>
            {isAdmin ? (
              <div className="w-1/4 flex flex-col items-end gap-2">
                <Link className="w-fit text-white rounded-md p-2 hover:bg-yellow-600 transition duration-150 cursor-pointer"
                  href="/admin/editShow" onClick={() => handleEdit(show)}
                >
                  <EditIcon />
                </Link>
                <button
                  className="w-fit text-white rounded-md p-2 hover:bg-red-700 transition duration-150 cursor-pointer"
                  onClick={() => handleDelete(show.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      {isAdmin ? (
        <div className="flex justify-end mt-7">
          <a
            className="bg-indigo-600 rounded-md p-2 hover:bg-indigo-700 transition duration-150 cursor-pointer"
            href="/admin/addShow"
          >
            Novo show
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
