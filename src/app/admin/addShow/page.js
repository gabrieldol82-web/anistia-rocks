"use client";

import { useState } from "react";

export default function AddShow() {
  const [loading, setLoading] = useState(false);
  const [location, setlocation] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const inputClasses =
    "bg-gray-600 text-white border-0 rounded-md p-2 w-full focus:bg-gray-500 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300";

  const checkCEP = async (e) => {
    let cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP inválido");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setlocation(data.logradouro + ", " + data.bairro + " - " + data.localidade);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !dateTime || !location) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    let data = {
      title,
      location,
      description,
      show_date: dateTime
      
    }

    const response = await fetch("http://localhost:3333/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      alert("Erro ao criar show");
      return;
    } else {
      setTitle("");
      setlocation("");
      setDescription("");
      setDateTime("");
      alert("Show criado com sucesso!");
      window.location.href = "/admin";      
    }

  }

  return (
    <div className="min-w-md max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              id="about"
              name="about"
              rows="3"
              className={`${inputClasses}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <label htmlFor="location">Local</label>
          {loading ? (<p className="text-gray-300">Carregando endereço...</p>) : location ? ( <input
              type="text"
              id="location"
              name="location"
              className={`${inputClasses}`}
              value={location}
              readOnly
            />) : (
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
            name="date"
            required
            className={`${inputClasses}`}
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
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
  );
}
