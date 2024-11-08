import { themeSelector, toggleTheme } from "@/redux/slices/themeSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const ThemeToggler = () => {
    const theme = useSelector(themeSelector);
    const dispatch = useDispatch();

  
    const handleToggle = () => {
      dispatch(toggleTheme());
      document.body.classList.toggle('dark')
    };
  
    return (
      <button onClick={handleToggle}>
        {theme.theme === 'light' && <CiLight /> }
        {theme.theme === 'dark' && <FaMoon /> }

      </button>
    );
}

export default ThemeToggler



