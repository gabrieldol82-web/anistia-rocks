import Image from "next/image";
import anistiaLogo from "./assets/anistiaLogoTransparente.png";

export default function Home() {
  return (
    <Image src={anistiaLogo} alt="Anistia Logo" width={200} height={100} />
  );
}
