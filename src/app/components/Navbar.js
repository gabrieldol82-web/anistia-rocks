import InstagramIcon from "@mui/icons-material/Instagram";
import Tooltip from "@mui/material/Tooltip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 p-8 bg-transparent font-sans font-nunito text-3xl font-semibold">
      <div className="flex items-center justify-between">
        <ul className="flex space-x-14">
          <li>
            <a href="/" className="md:hover:border-b md:hover:border-black-800 md:hover:border-solid">Home</a></li>
          <li>
            <a
              href="/members"
              className="md:hover:border-b md:hover:border-black-400 md:hover:border-solid"
            >
              Membros
            </a>
          </li>
          <li>
            <a
              href="/dates"
              className="md:hover:border-b md:hover:border-black-400 md:hover:border-solid"
            >
              Datas
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.instagram.com/anistiarocks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              className="md:hover:bg-blue-50 rounded-4xl"
              width={100}
              height={100}
              fontSize="large"
            />
          </a>
          <Tooltip title="Chama no WhatsApp!" arrow>
            <a
              href="https://wa.me/11995474478"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon
                className="md:hover:bg-green-50 rounded-4xl"
                width={100}
                height={100}
                fontSize="large"
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
