import Image from "next/image";

export default function Logo({ w, h, w_class = "", blur, responsive = false }) {
  return (
    <div
      className={`relative group ${responsive ? "w-full max-w-[450px] h-auto aspect-square" : ""}`}
      style={
        responsive
          ? {}
          : { width: `${w}px`, height: `${h}px` }
      }
    >
      <div
        className={`absolute inset-0 bg-white rounded-full ${blur}`}
      ></div>

      {responsive ? (
        <Image
          src="/assets/anistiaLogoTransparente.png"
          alt="Anistia Logo"
          fill
          className={`relative object-contain h-auto group-hover:scale-105 transform transition-transform duration-700 ${w_class}`}
        />
      ) : (
        <Image
          src="/assets/anistiaLogoTransparente.png"
          alt="Anistia Logo"
          width={w}
          height={h}
          className={`relative object-contain h-auto group-hover:scale-105 transform transition-transform duration-700 ${w_class}`}
        />
      )}
    </div>
  );
}