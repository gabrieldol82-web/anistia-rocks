"use client";
import { Switch } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../_components/Loading";
import { useShow } from "../../_context/ShowContext";

export default function EditShow() {
  // Para autenticação
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  // Variáveis de post
  const { currentShow } = useShow();
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    dateTime: "",
    is_completed: false,
  })

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

  useEffect(() => {
    if (currentShow) {
      const date = new Date(currentShow.show_date);
      const formattedDateTime = date.toISOString().slice(0, 16);
      setFormData({
        title: currentShow.title,
        description: currentShow.description,
        location: currentShow.location,
        dateTime: formattedDateTime,
        is_completed: currentShow.is_completed,
      });
    }
  }, [currentShow]);

  if (loadingAuth) return <Loading />;
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
    })
    if(e.target.name === "is_completed") {
      setFormData({
        ...formData,
        is_completed: !formData.is_completed,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dateTime || !formData.location) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const updatedShow = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      show_date: formData.dateTime,
      is_completed: formData.is_completed,
    };

    const res = await fetch(`/api/shows/${currentShow.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedShow),
    });

    if (res.ok) {
      Swal.fire({
        title: "Sucesso",
        text: "Show atualizado com sucesso!",
        icon: "success",
      }).then((isConfirmed) => {
        if (isConfirmed) {
          window.location.href = "/admin";
        }
      });
    } else {
      Swal.fire({
        title: "Erro",
        text: "Erro ao atualizar o show.",
        icon: "error",
      });
    }
  };

  if (!currentShow) {
    return (
      <div className="min-w-md max-w-4xl mx-auto p-4 bg-white bg-zinc-800 rounded-lg shadow-md">
        <h1 className="font-black text-center text-[28px]">Carregando...</h1>
      </div>
    );
  }

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
            />
          </div>
          <div>
            <label htmlFor="is_completed">Show já ocorreu?</label>
            <Switch
              id="is_completed"
              name="is_completed"
              checked={formData.is_completed}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-150 cursor-pointer"
            type="submit"
          >
            Salvar edição
          </button>
        </form>
      </div>
    </div>
  );
}
