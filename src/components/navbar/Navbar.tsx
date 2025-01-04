import { Suspense } from "react";
import Darkmode from "./Darkmode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

export default function Navbar() {
  return (
    <nav className="border-b ">
      <div className=" container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className=" flex gap-4 items-center ">
          <Darkmode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}
