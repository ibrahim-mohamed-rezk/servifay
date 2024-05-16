import React from "react";

const FiltersPopup = ({ setOpenPopup }) => {
  const styles = {
    popup: {
      width: "100%",
      height: "100%",
      background: "#00000025",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "999",
    },
    container: {
      width: "50%",
      margin: "auto",
      background: "#fff",
      padding: "10px",
      borderRadius: "10px",
    },
  };
  return (
    <div style={styles.popup}>
      <div style={styles.container}>
        <div
          onClick={() => {
            setOpenPopup(false);
            // to enable body scrolling agine
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
          }}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default FiltersPopup;
