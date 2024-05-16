import React from "react";
import Search from "../../assets/svg/Search";
import Filters from "../../assets/svg/Filters";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../../store/slices/services/filtersSlice";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    margin: "50px auto 0 auto",
    borderRadius: "50px",
    boxShadow: "4px 4px 4px 0px #00000040",
    padding: "15px",
    background: "#F7F5FB",
    gap: "5px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "18px",
    background: "transparent",
  },
};

const ServicesSearch = ({ setOpenPopup }) => {
  const filters = useSelector((data) => data.filters.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div
        onClick={() => {
          dispatch(setSearch(filters.search));
          navigate("/services");
        }}
      >
        <Search />
      </div>
      <input
        value={filters.search}
        onChange={(e) => {
          dispatch(setSearch(e.target.value));
        }}
        style={styles.input}
        type="text"
        placeholder="Search..."
      />
      <div
        onClick={() => {
          setOpenPopup(true);
          // to disable body scrolling when popup opens
          document.body.style.overflow = "hidden";
          document.documentElement.style.overflow = "hidden";
        }}
      >
        <Filters />
      </div>
    </div>
  );
};

export default ServicesSearch;
