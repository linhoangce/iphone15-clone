import Image from "next/image";
import Link from "next/link";
import { navLists } from "@/constants";

const Header = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <Image src="/assets/images/apple.svg" alt="Apple" width={18} height={18} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <Link key={item} href="" className="px-5 text-sm cursor-pointer text-gray-400 hover:text-white transition-all">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src="/assets/images/search.svg" alt="search" width={18} height={18} />
          <Image src="/assets/images/bag.svg" alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
