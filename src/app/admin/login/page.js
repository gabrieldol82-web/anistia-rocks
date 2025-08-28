'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
        router.refresh(); // Força atualização para o middleware detectar o cookie
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-md max-w-4xl mx-auto p-4 bg-zinc-800 rounded-lg shadow-md">
      <h1 className="font-black text-center text-[28px]">Área do Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            className="bg-gray-600 text-white border-0 rounded-md p-2 w-full focus:bg-gray-500 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-4 bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition duration-150 cursor-pointer"
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}