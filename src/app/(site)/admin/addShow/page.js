"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddShow() {
  // Para autenticação
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  // Variáveis de post
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    dateTime: "",
  });

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((response) => {
        if (response.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => setLoadingAuth(false));
  }, [router]);

  if (!authenticated) return null;

  const inputClasses =
    "bg-gray-600 text-white border-0 rounded-md p-2 w-full focus:bg-gray-500 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300";

  const checkCEP = async (e) => {
    let cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP inválido");
      return;
    }

    setLoadingCep(true);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setFormData(prev => ({
        ...prev,
        location: data.logradouro + ", " + data.bairro + " - " + data.localidade
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.description || !formData.dateTime || !formData.location) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    let data = {
      title: formData.title,
      location: formData.location,
      description: formData.description,
      show_date: formData.dateTime,
    };

    const response = await fetch("/api/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Erro ao criar show");
      return;
    } else {
      setFormData({
        title: "",
        location: "",
        description: "",
        dateTime: "",
      });
      Swal.fire({
        text: "Show criado com sucesso!",
        icon: "success",
      }).then((isConfirmed) => {
        if (isConfirmed) {
          window.location.href = "/admin";
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-4xl mx-auto p-4 bg-zinc-800 rounded-lg shadow-md">
        <h1 className="font-black text-center text-[28px]">Criar Novo Show</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título</label>
            <input
              className={`${inputClasses}`}
              placeholder="Nome do show"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-white"
            >
              Descrição
            </label>
            <div>
              <textarea
                id="description"
                name="description"
                rows="3"
                className={`${inputClasses}`}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor="location">Local</label>
            {loadingCep ? (
              <p className="text-gray-300">Carregando endereço...</p>
            ) : formData.location ? (
              <input
                type="text"
                id="location"
                name="location"
                className={`${inputClasses}`}
                value={formData.location}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="Digite o CEP"
                className={inputClasses}
                onBlur={checkCEP}
              />
            )}
          </div>

          <div>
            <label htmlFor="date">Data</label>
            <input
              type="datetime-local"
              id="date"
              name="dateTime"
              required
              className={`${inputClasses}`}
              value={formData.dateTime}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <button
            className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-150 cursor-pointer"
            type="submit"
          >
            Criar Show
          </button>
        </form>
      </div>
    </div>
  );
}