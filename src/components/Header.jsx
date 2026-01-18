import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { fetchQuery } from "../api/fetch";
import Poster from "./Poster";
import Menu from "./Menu";
import { useRecoilState } from "recoil";
import { openMenuState, openSearchState } from "../states";
import Logo from "./Logo";
import { BsFilterSquare } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";

export const Header = () => {
  const [openSearch, setOpenSearch] = useRecoilState(openSearchState);
  const [menuOpen, setMenuOpen] = useRecoilState(openMenuState);
  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  useEffect(() => {
    const searchBar = document.getElementById("searchBar");
    const header = document.getElementById("header");
    const movieSection = document.getElementById("movieSection");
    if (openSearch) {
      searchBar.classList.remove("w-0");
      searchBar.classList.add("w-full", "px-2");
      searchBar.focus();
      header.classList.add("h-screen", "min-h-screen", "items-start");
      header.classList.remove("sm:max-h-[60px]", "items-center");
      movieSection.classList.add("h-full", "py-4");
      setBackgroundOpacity(1);
      setMenuOpen(false);
    } else {
      searchBar.classList.add("w-0");
      searchBar.classList.remove("w-full", "px-2");
      searchBar.blur();
      setSearchObject([]);
      header.classList.remove("h-screen", "min-h-screen", "items-start");
      header.classList.add("sm:max-h-[60px]", "items-center");
      movieSection.classList.remove("h-full", "py-4");
    }
  }, [openSearch, setMenuOpen]);
  const [searchObject, setSearchObject] = useState({});
  const [search, setSearch] = useState("");
  const handleClick = () => {
    setOpenSearch(!openSearch);
    setSearch("");
    setSearchObject({});
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchQuery(search, setSearchObject);
    }
  };
  const handleClickPoster = () => {
    setOpenSearch(!openSearch);
  };

  // useEffect(() => {
  //   const onScroll = () => {
  //     // keep fully opaque while search is open
  //     if (openSearch) {
  //       setBackgroundOpacity(1);
  //       return;
  //     }
  //     const header = document.getElementById("header");

  //     if (!header) return;

  //     const headerClientHeight = header?.clientHeight || 1;
  //     const calculatedOpacity = Math.min(window.scrollY / headerClientHeight, 1);
  //     setBackgroundOpacity(calculatedOpacity);
  //   };

  //   window.addEventListener("scroll", onScroll);
  //   // initialize opacity based on current scroll
  //   onScroll();

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [openSearch]);

  return (
    <header
      id='header'
      className='fixed z-30 flex flex-col justify-start w-full h-[92px] sm:h-[60px] overflow-y-hidden'
      style={{ backgroundColor: `rgb(13, 28, 40, ${backgroundOpacity})` }}
    >
      <div
        className='flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4 w-full max-h-[92px] sm:h-headerHeight px-4 sm:px-12 z-20'
        style={{ backgroundColor: `rgb(13, 28, 40, ${backgroundOpacity})` }}
      >
        <Link
          to=''
          onClick={() => {
            setMenuOpen(false);
            setOpenSearch(false);
          }}
        >
          <Logo display='flex' />
        </Link>
        <div className='flex gap-4 sm:gap-0 items-center w-full'>
          <div
            id='search-container'
            className='flex justify-end items-center w-full'
          >
            <input
              type='text'
              id='searchBar'
              className='w-0 outline-none text-sm transitioning'
              value={search}
              onChange={onSearch}
              onKeyPress={handleKeyPress}
            />
            <button className='px-2'>
              <BiSearch
                size={22}
                className='fill-gray-400 hover:fill-white z-30'
                onClick={handleClick}
              />
            </button>
          </div>
          <Link
            to=''
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              setMenuOpen(false);
              setOpenSearch(false);
            }}
          >
            <AiFillHome />
          </Link>
          <Link
            to='/filter'
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              setMenuOpen(false);
              setOpenSearch(false);
            }}
          >
            <BsFilterSquare />
          </Link>
          <Link
            to='/genres'
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              setMenuOpen(false);
              setOpenSearch(false);
            }}
          >
            <MdLocalMovies />
          </Link>
          <AiOutlineMenu
            size={22}
            className='fill-gray-400 hover:fill-white cursor sm:hidden block cursor-pointer'
            onClick={openMenu}
          />
        </div>
      </div>
      <div className={`fixed top-0 flex justify-center items-start w-full max-h-screen overflow-y-auto ${openSearch && 'py-12'} hide-scrollbar`}>
        <div
          id='movieSection'
          className='flex flex-wrap justify-center sm:justify-start items-start gap-4 pt-8 px-12 w-full max-w-[1408px]'
        >
          {Object.keys(searchObject).length > 0
            ? searchObject.map((movie) => (
                <div
                  key={movie.id}
                  className='w-fit h-fit'
                  onClick={handleClickPoster}
                >
                  <Poster movie={movie} />
                </div>
              ))
            : null}
        </div>
      </div>
      <Menu />
    </header>
  );
}

export default Header;
