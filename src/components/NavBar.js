import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverBody,
} from "reactstrap";

import axios from "axios";
import { BASE_URL, API_KEY } from "../config";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropToggle = () => setDropdownOpen((prevState) => !prevState);

  const [popoverOpen, setPopoverOpen] = useState(false);

  // for genre popover
  const genreToggle = () => setPopoverOpen(!popoverOpen);
  const [genreList, setgenreList] = useState([]);

  const getGenres = async () => {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });
    setgenreList(res.data.genres.splice(0, 17));
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div>
      <Navbar
        color='dark'
        dark
        expand='md'
        fixed='top'
        style={{ background: "transparent" }}>
        <div className='container-fluid'>
          <NavbarBrand href='/'>MyMovies</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink href='/movies/1'>Movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <div>
                    <div
                      onMouseEnter={genreToggle}
                      id='Popover1'
                      onMouseLeave={() => setPopoverOpen(false)}>
                      Genres
                    </div>
                    <Popover
                      placement='bottom'
                      isOpen={popoverOpen}
                      target='Popover1'
                      toggle={genreToggle}>
                      <PopoverBody>
                        <div
                          style={{
                            display: "flex",
                            width: "800px !important",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexFlow: "wrap",
                          }}>
                          {genreList?.map((gen, index) => (
                            <div key={index} style={{ minWidth: "100px" }}>
                              {gen.name}
                            </div>
                          ))}
                        </div>
                      </PopoverBody>
                    </Popover>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Tv-Series</NavLink>
              </NavItem>
            </Nav>
            <Dropdown isOpen={dropdownOpen} toggle={dropToggle}>
              <DropdownToggle caret>API's Used</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <a
                    href='https://developers.themoviedb.org/3/movie/now_playing'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Now Playing
                  </a>
                  <br />
                  <a
                    href='https://developers.themoviedb.org/3/trending/movie/week'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Tranding
                  </a>
                  <br />
                  <a
                    href='https://developers.themoviedb.org/3/tv/popular'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Web Series
                  </a>
                  <br />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
