import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
        <div className="w-full flex justify-center" style={{marginTop: "3rem"}}>
          <a href="#section-1" className="bg-transparent my-16">
            <ExpandLessIcon
              fontSize="large"
              className="hover:text-gray-100 transition-colors duration-300"
            />
          </a>
        </div>
        <div className="relative flex-1 h-[calc(100%-64px)]">
          <Image
            src="/assets/home.jpg"
            alt="Home"
            width={800}
            height={1000}
            className="object-cover"
          />
          <Image
            src="/assets/home_2.jpg"
            alt="Home"
            width={800}
            height={1000}
            className="object-cover"
          />
          <Image
            src="/assets/home_3.jpg"
            alt="Home"
            width={800}
            height={1000}
            className="object-cover"
          />
          <Image
            src="/assets/home_4.jpg"
            alt="Home"
            width={800}
            height={1000}
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
