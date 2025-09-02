import Image from "next/image";

export default function Logo({w, h, w_class, blur}) {
  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-white rounded-full ${blur}`} style={{
      width: `${w}px`,
      height: `${h}px`,
    }}></div>
      <Image
        src="/assets/anistiaLogoTransparente.png"
        alt="Anistia Logo"
        width={w}
        height={h}
        className={`relative object-contain h-auto group-hover:scale-105 transform transition-transform duration-700 ${w_class}`}
      />
    </div>
  );
}