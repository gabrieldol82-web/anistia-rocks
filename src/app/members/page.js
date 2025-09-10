"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../_components/Loading";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  async function fetchMembers() {
    const response = await fetch("/api/members");
    const membersGET = await response.json();

    await Promise.all(
      membersGET.map((member) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = member.image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    setMembers(membersGET);
    setLoading(false);
    
    setTimeout(() => setIsVisible(true), 50);
  }

  useEffect(() => {
    fetchMembers();
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); 
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {members.map((member, index) => {

          const isEven = index % 2 === 0;
          
          return (
            <div
              key={member.id}
              className={`w-full max-w-72 rounded-2xl flex flex-col items-center mx-auto bg-white p-6 shadow-lg transform transition-all duration-700 ${
                isVisible 
                  ? (isMobile ? "translate-y-0 opacity-100" : (isEven ? "-translate-y-6 opacity-100" : "translate-y-10 opacity-100")) 
                  : (isMobile ? "translate-y-10 opacity-0" : (isEven ? "-translate-y-20 opacity-0" : "translate-y-20 opacity-0"))
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transformOrigin: isMobile ? "center" : (isEven ? "top center" : "bottom center")
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-auto h-96 rounded-2xl object-cover mb-4 transition-transform duration-700"
                style={{ 
                  transform: isVisible ? "scale(1)" : "scale(0.9)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 100 + 300}ms`
                }}
              />
              <h2 className="text-2xl font-black text-black bg-yellow-500 py-1.5 px-8 inline-block -skew-x-12 transition-all duration-700"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "-skew-x-12 scale(1)" : "-skew-x-12 scale(0.8)",
                    transitionDelay: `${index * 100 + 500}ms`
                  }}>
                {member.name}
              </h2>
              <p className="text-xl bg-sky-500 font-black py-1.5 px-8 inline-block -skew-x-12 transition-all duration-700"
                 style={{ 
                   opacity: isVisible ? 1 : 0,
                   transform: isVisible ? "-skew-x-12 scale(1)" : "-skew-x-12 scale(0.8)",
                   transitionDelay: `${index * 100 + 700}ms`
                 }}>
                {member.role}
              </p>
              <Link 
                href={`/members/member?id=${member.id}`} 
                className="text-black mt-2 transition-all duration-700"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${index * 100 + 900}ms`
                }}>
                Clique aqui
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}