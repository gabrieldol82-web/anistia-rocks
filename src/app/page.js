import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeImages from "./_components/HomeImages";
import Logo from "./_components/Logo.js";

export default function Home() {
  return (
    <div className="w-full">
      <section className="min-h-screen flex flex-col" id="section-1">
        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-0">
            <Logo responsive={true} w_class="max-h-[60vh]" blur="blur-3xl" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pr-44 py-8">
            <h1 className="text-5xl md:text-8xl font-bold mb-8 md:mb-20">ANISTIA ROCKS!</h1>
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 border-l-4 border-white pl-4">
              Banda de covers de metal de São Paulo, Capital.
            </h2>
            <p className="text-base md:text-xl mb-6 leading-relaxed text-gray-300">
              Desde 2023, levamos aos palcos a energia e o peso do metal com um
              repertório repleto de clássicos que marcaram gerações. Tocamos
              covers de bandas icônicas como{" "}
              <span className="font-black text-red-500">Korn</span>,{" "}
              <span className="font-black text-red-500">System of a Down</span>,{" "}
              <span className="font-black text-red-500">Sepultura</span> e
              muitas outras, sempre trazendo aquela mistura de hinos consagrados
              e surpresas{" "}
              <span className="italic font-medium text-slate-600">lado B</span>{" "}
              que fazem os fãs vibrarem. Nosso objetivo é proporcionar uma
              experiência intensa e autêntica, recriando a atmosfera dos grandes
              shows e celebrando a paixão pelo metal em todas as suas vertentes.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center mt-auto mb-16 md:mb-56">
          <a href="#section-2" className="bg-transparent font-2xl">
            <ExpandMoreIcon fontSize="large" className="transition-colors duration-300" />
          </a>
        </div>
      </section>

      <section className="min-h-screen" id="section-2">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 p-16 mx-auto max-w-6xl">
          <HomeImages imageSrc="/assets/home.JPG" altText="Foto mais foda" />
          <HomeImages imageSrc="/assets/home_2.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_3.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_4.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_5.JPG" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_14.jpeg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_12.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_11.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_8.JPG" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_10.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_13.jpeg" altText="Foto da capa" />
        </div>
      </section>
    </div>
  );
}
