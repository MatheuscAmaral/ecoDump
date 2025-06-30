import logo from "@/assets/sidebarLogo.png";
import { items } from "@/data/pages";
import { handleLogout } from "@/utils/handleLogOut";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center relative justify-between xl:hidden w-full p-4 bg-white shadow-md">
      <img src={logo} alt="Logo" className="h-12 mr-2" />
      <Menu onClick={() => setIsOpen(!isOpen)} />

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 h-full min-h-screen w-full bg-white z-50 overflow-y-auto`}
      >
        <section className="flex justify-between items-center p-4">
          <img src={logo} alt="Logo" className="h-12 mr-2" />

          <X onClick={() => setIsOpen(false)} />
        </section>
        <nav className="flex flex-col gap-2 p-4 bg-white h-full">
          {
            items?.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                onClick={handleClick}
                className="flex items-center gap-2 p-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="h-6 w-6 text-gray-500" />
                <span className="text-gray-800">{item.title}</span>
              </Link>
            ))
          }
          <Link
            to="/"
            className="flex items-center gap-2 p-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6 text-gray-500" />
            <span className="text-gray-800">Sair</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
