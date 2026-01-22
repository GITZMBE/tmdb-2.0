import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { openMenuState, openSearchState } from "../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { BsFilterSquare } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";

function Menu() {
  const [menuOpen, setMenuOpen] = useRecoilState(openMenuState);
  const setOpenSearch = useSetRecoilState(openSearchState);
  const clickLink = () => {
    setMenuOpen(false);
    setOpenSearch(false);
  };
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    if (menuOpen) {
      setAnimation("animate-show-menu");
      setOpenSearch(false);
    } else {
      setAnimation("animate-hide-menu");
    }
  }, [menuOpen]);
  return (
    <div
      id='menu'
      className={`fixed sm:hidden z-10 right-0 h-full w-0 pt-20 sm:pt-[60px] pb-4 bg-primary animate-hide-menu ${animation}`}
    >
      <ul className='lg:max-w-[300px] py-4 text-gray-500 text-3xl font-bold'>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            to='/dashboard'
            className='flex flex-grow justify-between items-center w-full'
          >
            Home&ensp;
            <AiFillHome />
          </Link>
        </li>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            to={"/filter"}
            className='flex flex-grow justify-between items-center w-full'
          >
            Filter&ensp;
            <BsFilterSquare />
          </Link>
        </li>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            to={"/genres"}
            className='flex flex-grow justify-between items-center w-full'
          >
            Genres&ensp;
            <MdLocalMovies />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
