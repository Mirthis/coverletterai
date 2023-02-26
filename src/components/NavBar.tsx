import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AccountWidget from "./ui/AccountWidget";

// import ContactIcons from "./ContactIcons";

interface NavBarLinkData {
  label: string;
  url: string;
}

const navBarLinks: NavBarLinkData[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "New Cover Letter",
    url: "/create",
  },
];

const navBarProtectedLinks: NavBarLinkData[] = [
  {
    label: "History",
    url: "/history",
  },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("");
  const [linkColor, setLinkColor] = useState("text-gray-800");
  const { status: sessionStatus } = useSession();

  const router = useRouter();

  const setTransparentNavBar = (transparent: boolean) => {
    if (transparent) {
      setNavBg("bg-transparent");
      setLinkColor("text-gray-800");
    } else {
      setNavBg("bg-white");
      setLinkColor("text-gray-800");
    }
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
        setTransparentNavBar(false);
      } else {
        setShadow(false);
        setTransparentNavBar(true);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, [router]);

  const showNavBar = () => {
    setNav(true);
  };

  const hideNavBar = () => {
    setNav(false);
  };

  return (
    <div
      className={`${
        shadow && "shadow-md shadow-black"
      }  ${navBg} fixed z-[100] h-16 w-full`}
    >
      {/* Desktop version */}
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-2 2xl:px-16">
        <div className="flex w-full flex-row items-center justify-between">
          <ul className={`hidden flex-grow md:flex ${linkColor} flex-1`}>
            {navBarLinks.map((l) => (
              <Link key={`desktop-menu-${l.label}`} href={l.url}>
                <li className="ml-10 border-slate-400 text-sm uppercase hover:border-b">
                  {l.label}
                </li>
              </Link>
            ))}
            {sessionStatus === "authenticated" &&
              navBarProtectedLinks.map((l) => (
                <Link key={`desktop-menu-${l.label}`} href={l.url}>
                  <li className="ml-10 border-slate-400 text-sm uppercase hover:border-b">
                    {l.label}
                  </li>
                </Link>
              ))}
          </ul>

          {/* Burger icon, show on small displays */}
          <div onClick={showNavBar} className="flex-1 md:hidden">
            <AiOutlineMenu size={25} />
          </div>
          <Link href="/" onClick={hideNavBar}>
            <p className="w-full  text-center font-extrabold">
              <span className=" text-red-500">Cover Letters</span> AI
            </p>
          </Link>
          <div className="flex-1 text-right">
            <AccountWidget />
          </div>
        </div>
      </div>

      {/* Mobile version       */}
      <div
        className={nav ? "fixed left-0 top-0 h-screen w-full bg-black/70" : ""}
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 h-screen w-[75%] bg-gray-100 p-10 duration-200 ease-in sm:w-[60%] md:w-[45%]"
              : "fixed left-[-100%] top-0 p-10 duration-200 ease-in"
          }
        >
          <div>
            <div className="flex w-full  items-center justify-between">
              {/* Logo */}
              <Link href="/" onClick={hideNavBar}>
                <p className="font-extrabold">
                  <span className=" text-red-500">Cover Letters</span> AI
                </p>
              </Link>
              <button
                onClick={hideNavBar}
                className="hover:bg-gray-20  cursor-pointer border-b-2 border-red-500"
              >
                <AiOutlineClose className="rounded-full  font-bold text-red-500" />
              </button>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <ul className="uppercase">
              {navBarLinks.map((l) => (
                <Link key={`mobile-menu-${l.label}`} href={l.url}>
                  <li onClick={hideNavBar} className="py-4 text-sm">
                    {l.label}
                  </li>
                </Link>
              ))}
              {navBarProtectedLinks.map((l) => (
                <Link key={`mobile-menu-${l.label}`} href={l.url}>
                  <li onClick={hideNavBar} className="py-4 text-sm">
                    {l.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
