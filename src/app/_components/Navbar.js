"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import Tooltip from "@mui/material/Tooltip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Logo from "./Logo.js";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth");
        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      setIsAdmin(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="top-0 right-0 left-0 p-4 md:p-8 bg-black/40 text-white font-sans font-nunito text-3xl font-semibold">
      <div className="flex items-center justify-between">
        
        <div className="lg:flex-1 flex justify-center lg:justify-start">
          <Logo w={60} h={60} blur="blur-sm" />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
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
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end space-x-4">
          {isAdmin && (
            <Tooltip title="Logout" arrow>
              <button
                onClick={handleLogout}
                className="transition-transform hover:scale-110 hover:text-black hover:cursor-pointer"
              >
                <LogoutIcon
                  className="p-2 rounded-full hover:bg-red-50 hover:shadow-lg"
                  style={{ fontSize: 50 }}
                />
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

        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <CloseIcon style={{ fontSize: 40 }} />
            ) : (
              <MenuIcon style={{ fontSize: 40 }} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-6 bg-black/70 p-6 rounded-lg">
          <ul className="flex flex-col space-y-8">
            <li>
              <a
                href="/"
                className="block py-2 hover:border-b hover:border-black-800 hover:border-solid"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/members"
                className="block py-2 hover:border-b hover:border-black-400 hover:border-solid"
                onClick={() => setIsMenuOpen(false)}
              >
                Membros
              </a>
            </li>
            <li>
              <a
                href="/dates"
                className="block py-2 hover:border-b hover:border-black-400 hover:border-solid"
                onClick={() => setIsMenuOpen(false)}
              >
                Datas
              </a>
            </li>
            {isAdmin && (
              <li>
                <a
                  href="/admin"
                  className="block py-2 hover:border-b hover:border-black-400 hover:border-solid"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </a>
              </li>
            )}
          </ul>

          <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-gray-600">
            {isAdmin && (
              <Tooltip title="Logout" arrow>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="transition-transform hover:scale-110 hover:text-black hover:cursor-pointer"
                >
                  <LogoutIcon
                    className="p-2 rounded-full hover:bg-red-50 hover:shadow-lg"
                    style={{ fontSize: 40 }}
                  />
                </button>
              </Tooltip>
            )}
            <Tooltip title="Instagram" arrow>
              <a
                href="https://www.instagram.com/anistiarocks/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                <InstagramIcon
                  className="p-2 rounded-full hover:bg-blue-50 hover:shadow-lg"
                  style={{ fontSize: 40 }}
                />
              </a>
            </Tooltip>

            <Tooltip title="Chama no WhatsApp!" arrow>
              <a
                href="https://wa.me/11995474478"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                <WhatsAppIcon
                  className="p-2 rounded-full hover:bg-green-50 hover:shadow-lg"
                  style={{ fontSize: 40 }}
                />
              </a>
            </Tooltip>
          </div>
        </div>
      )}
    </nav>
  );
}