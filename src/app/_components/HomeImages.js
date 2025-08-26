"use client"

import Image from "next/image";
import { useState } from "react";

export default function HomeImages({ imageSrc, altText = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative min-h-[800px] max-h-[1000px] w-full overflow-hidden border-2 border-pink-700 rounded-lg aspect-square lg:odd:aspect-auto lg:odd:row-span-2 lg:odd:my-7 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          className="object-cover"
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
