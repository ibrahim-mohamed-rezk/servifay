import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import messages from "./lang/lang";
import { setLang } from "./store/slices/lang/langSlice";

const Root = () => {
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const [locale, setLocale] = useState(lang.lang);

  const changeLanguage = (language) => {
    setLocale(language);
    dispatch(setLang({ lang: language }));
    window.location.reload(true);
  };

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <App changeLanguage={changeLanguage} />
      </BrowserRouter>
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
