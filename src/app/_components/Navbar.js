"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import Tooltip from "@mui/material/Tooltip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      setIsAdmin(false);
      window.location.href = '/'; 
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="top-0 right-0 left-0 p-8 bg-transparent font-sans font-nunito text-3xl font-semibold">
      <div className="flex items-center justify-between">
        <ul className="flex space-x-14">
          <li>
            <a
              href="/"
              className="md:hover:border-b md:hover:border-black-800 md:hover:border-solid"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/members"
              className="md:hover:border-b md:hover:border-black-400 md:hover:border-solid"
            >
              Membros
            </a>
          </li>
          <li>
            <a
              href="/dates"
              className="md:hover:border-b md:hover:border-black-400 md:hover:border-solid"
            >
              Datas
            </a>
          </li>
          {isAdmin && (
            <li>
              <a
                href="/admin"
                className="md:hover:border-b md:hover:border-black-400 md:hover:border-solid"
              >
                Admin
              </a>
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Tooltip title="Logout" arrow>
              <button onClick={handleLogout} 
                className="transition-transform hover:scale-110 hover:text-black hover:cursor-pointer">
                <LogoutIcon className="p-2 rounded-full hover:bg-red-50 hover:shadow-lg" style={{ fontSize: 50 }} />
              </button>
            </Tooltip>
          )}
          <Tooltip title="Instagram" arrow>
            <a
              href="https://www.instagram.com/anistiarocks/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-black"
            >
              <InstagramIcon
                className="p-2 rounded-full hover:bg-blue-50 hover:shadow-lg"
                style={{ fontSize: 50 }}
              />
            </a>
          </Tooltip>

          <Tooltip title="Chama no WhatsApp!" arrow>
            <a
              href="https://wa.me/11995474478"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <WhatsAppIcon
                className="p-2 rounded-full hover:bg-green-50 hover:shadow-lg"
                style={{ fontSize: 50 }}
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
