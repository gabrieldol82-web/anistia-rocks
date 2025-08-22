"use client"
import { useShow } from "../../context/ShowContext";
import { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function EditShow() {
    const { currentShow } = useShow();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [loading, setLoading] = useState(false);

    const inputClasses =
    "bg-gray-600 text-white border-0 rounded-md p-2 w-full focus:bg-gray-500 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300";

    useEffect(() => {
        if(currentShow) {
            setTitle(currentShow.title);
            setDescription(currentShow.description);
            setLocation(currentShow.location);
            const date = new Date(currentShow.show_date);
            const formattedDateTime = date.toISOString().slice(0, 16);
            setDateTime(formattedDateTime);
            console.log("Current Show:", currentShow);
        }
    }, [currentShow]);

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

      setLocation(data.logradouro + ", " + data.bairro + " - " + data.localidade);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !dateTime || !location) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const updatedShow = {
            title,
            description,
            location,
            show_date: dateTime
        }

        const res = await fetch(`http://localhost:3333/shows/${currentShow.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedShow)
        })

        if (res.ok) {
            if (confirm("Show atualizado com sucesso! Clique em OK para voltar.")) {
                window.location.href = "/admin";
            }
        } else {
            alert("Erro ao atualizar o show.");
        }

    }


    if (!currentShow) {
        return (
            <div className="min-w-md max-w-4xl mx-auto p-4 bg-white bg-zinc-800 rounded-lg shadow-md">
                <h1 className="font-black text-center text-[28px]">Carregando...</h1>
            </div>
        )
    }

    return (
    <div className="min-w-md max-w-4xl mx-auto p-4 bg-white bg-zinc-800 rounded-lg shadow-md">
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

          {
            location ? (
                <div className="flex flex-row items-center">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className={`${inputClasses}`}
                    value={location}
                    readOnly
                  />
                <HighlightOffIcon className="ml-2" onClick={() => setLocation("")} />
              </div>
            ) : loading ? (
              <p className="text-gray-300">Carregando endereço...</p>
            ) : (
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="Digite o CEP"
                className={inputClasses}
                onBlur={checkCEP}
              />
            )
          }
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
        <div>
          
        </div>
        <button
          className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-150 cursor-pointer"
          type="submit"
        >
          Salvar edição
        </button>
      </form>
    </div>
    )
}