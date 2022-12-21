"use client";

import React from "react";
import useAuth from "../hooks/useAuth";

typeof window === "object" && require("flowbite").default;

import Menu, { MenuMobileButton } from "./Menu";

function Header() {
  const { user, isLogged, signOut } = useAuth();

  return (
    <>
      <div className="flex sticky top-0 min-w-full items-center bg-slate-500 rounded-md p-4 max-sm:px-1 max-sm:py-2 shadow-md shadow-slate-600 z-10">
        <div className="max-sm:flex pr-2 hidden">
          <MenuMobileButton />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="max-sm:hidden text-white font-bold text-2xl">
            iziNotes for Developers
          </p>
          <p className="md:hidden text-white font-bold text-lg">iziNotes</p>
          {isLogged && (
            <div className="flex items-center">
              <p className="text-white font-bold max-sm:text-sm max-sm:mr-4 mr-12">
                Hello {user?.name}
              </p>
              <button
                className="text-white font-bold underline hover:text-slate-200 mr-1"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:hidden w-fit md:w-auto fixed" id="navbar-default">
        <Menu />
      </div>
    </>
  );
}

export default Header;
