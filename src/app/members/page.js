"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../_components/Loading";

export default function Members() {
  const [ members, setMembers ] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    const response = await fetch("http://localhost:3333/members");
    const membersGET = await response.json();

    await Promise.all(
      members.map((member) => {
        new Promise((resolve) => {
            const img = new Image();
            img.src = member.image;
            img.onload = resolve;
            img.onerror = resolve;
          })
      })
    );

    setMembers(membersGET);
    setLoading(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-row gap-12">
      {members.map((member, index) => {
        return (
          <div
            key={member.id}
            className={`sm:w-full md:w-1/2 max-w-72 rounded-2xl flex flex-col items-center mx-auto bg-white p-6 shadow-lg transform hover:scale-105 transition-transform ${
              index % 2 === 0 ? "-translate-y-6" : "translate-y-10"
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-auto h-96 rounded-2xl object-cover mb-4"
            />
            <h2 className="text-2xl font-black text-black bg-yellow-500 py-1.5 px-8 inline-block transform -skew-x-12">
              {member.name}
            </h2>
            <p className="text-xl bg-sky-500 font-black py-1.5 px-8 inline-block transform -skew-x-12">
              {member.role}
            </p>
            <Link href={`/members/member?id=${member.id}`} className="text-black mt-2">
              Clique aqui
            </Link>
          </div>
        );
      })}
    </div>
  );
}
