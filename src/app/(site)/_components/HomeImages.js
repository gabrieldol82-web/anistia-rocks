"use client"

import Image from "next/image";
import { useState } from "react";

export default function HomeImages({ imageSrc, altText = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="mb-6 overflow-hidden border-2 border-pink-700 rounded-lg cursor-pointer break-inside-avoid"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={600}
          height={800}
          className="w-full h-auto object-cover"
        />
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={imageSrc}
              alt={altText}
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
