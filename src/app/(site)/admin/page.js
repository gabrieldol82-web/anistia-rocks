"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ViewShows from "../_components/ViewShows";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth");
      if (response.ok) {
        setAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, [router]);

  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-6xl mx-auto p-4 bg-zinc-800 rounded-lg shadow-md min-h-[60vh]">
        <ViewShows pageName="Admin" isAdmin={true} />
      </div>
    </div>
  );
}
