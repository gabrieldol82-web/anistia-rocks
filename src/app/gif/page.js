import Image from "next/image";

export default function Gif() {
  return (
    <section className="bg-gray-950 w-full min-h-screen">
      <h1 className="text-5xl text-white text-center my-16">Eu te avisei!</h1>
      <div className="flex justify-center">
        <div style={{ position: "relative", width: "400px", height: "300px" }}>
          <Image
            src="/assets/gif/rick.gif"
            alt="Você caiu no Rick Astley dançando"
            width={400}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}
