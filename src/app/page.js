import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeImages from "./components/HomeImages";

export default function Home() {
  return (
    <div className="w-full mt-12">
      <section className="h-screen flex flex-col" id="section-1">
        <div className="flex flex-1">
          <div className="w-1/2 flex justify-center">
            <Image
              src="/assets/anistiaLogoTransparente.png"
              alt="Anistia Logo"
              width={500}
              height={900}
              className="object-contain max-h-[80vh] h-auto"
            />
          </div>
          <div className="flex flex-col justify-center px-12 w-1/2 ">
            <h1 className="text-4xl font-bold mb-4">Anistia Rocks!</h1>
            <h2 className="text-2xl text-gray-300 mb-2">
              Banda de covers de metal de São Paulo, Capital.
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Desde 2023, tocamos covers variados de metal, como Korn, System of
              a Down, Sepultura... Completar textos
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mb-56">
          <a href="#section-2" className="bg-transparent font-2xl">
            <ExpandMoreIcon
              fontSize="large"
              className="hover:text-gray-100 transition-colors duration-300"
            />
          </a>
        </div>
      </section>
      <section className="h-screen" id="section-2">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-16">
          <HomeImages imageSrc="/assets/home.JPG" altText="Foto mais foda" />
          <HomeImages imageSrc="/assets/home_2.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_3.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_4.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_5.JPG" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_14.jpeg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_12.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_11.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_6.JPG" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_8.JPG" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_10.jpg" altText="Foto da capa" />
          <HomeImages imageSrc="/assets/home_13.jpeg" altText="Foto da capa" />
          
        </div>
      </section>
    </div>
  );
}
