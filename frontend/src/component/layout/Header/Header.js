import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Header.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate("/products/"+keyword );
    } else {
      navigate("/products");
    }
  };

  return (
    <div>
      <nav className="main-nav">
        <div className="logo"> <Link to="/"><img src={logo} class="img-fluid" alt="logo" /></Link></div>
        <div className={showLinks ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="user">
          <div className="navbar-search">
            <form className="searchBox" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="search-button">
                <i className="search-icon"> <SearchIcon /></i>
              </button>
            </form>
          </div>
          <ul>
            <li><a href="/profile"><PersonOutlineIcon /></a></li>
            <li><a href="/profile"><AddShoppingCartIcon /></a></li>
            <li><a href="/profile"><FavoriteBorderIcon /></a></li>
          </ul>
          {/* Hamburger start menu */}
          <div className="hamburger-menu">
            <a href="/" onClick={() => setShowLinks(!showLinks)}>
              <MenuIcon />
            </a>
          </div>
        </div>
      </nav>
    </div>
  )

}


export default Header;