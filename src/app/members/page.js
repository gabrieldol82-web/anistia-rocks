"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../components/Loading";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMembers() {
    const response = await fetch("http://localhost:3001/members");
    const members = await response.json();
    setMembers(members);
    setLoading(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-3">
      {members.map((member) => {
        return (
          <div key={member.id} className="sm:w-full md:w-1/2 p-4 flex flex-col items-center mx-auto">
            <img
              src={member.image}
              alt={member.name}
              className="w-auto h-96 rounded-2xl object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-black"></h2>
            <p className="text-gray-600">{member.role}</p>
            <Link href={`/members/${member.id}`}>
              Ver mais sobre {member.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
