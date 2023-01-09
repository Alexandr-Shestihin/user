import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { IntlProvider } from "react-intl";
import { Helmet } from "react-helmet";

import store from "./redux/store";
import theme from "./material-theme";

import {
  getUserData,
  userOnline,
  getCountries,
  getDevices,
  showAuthModal,
  setInterfaceLang,
  getUserNotifications,
  showRegisterModal,
} from "./redux/actions";
import { getUrlParams, isAuthenticated, ScrollToTop } from "./helpers";
import Spinner from "./components/UI/spinner";
import Header from "./components/header";
import NotificationModal from "./components/notification-modal";
import Main from "./components/main";
import BurgerMenu from "./components/burger-menu";
import Footer from "./components/footer";
import "./App.scss";

import { translations } from "./i18n";
import { INTERFACE_LANGUAGES } from "./config";
import GlobalStyles from "./assets/styles/global";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: filter 0.3s ease;

  &.onAuth {
    filter: blur(10px);
  }
`;

class App extends Component {
  state = {
    authModalShown: false,
  };

  componentDidMount() {
    const { login, lang, register } = getUrlParams();
    // clear team invite code
    localStorage.removeItem("team-invite");

    // show login popup
    if (login) {
      store.dispatch(showAuthModal());
    }

    // show register
    if (register) {
      store.dispatch(showRegisterModal());
      store.dispatch(showAuthModal());
    }

    // switch lang
    if (lang && INTERFACE_LANGUAGES.indexOf(lang) !== -1) {
      localStorage.setItem("interfaceLang", lang);
      store.dispatch(setInterfaceLang(lang));
    }

    // start notifications
    this.runNotifications();

    // get country list
    store.dispatch(getCountries());
    // store.dispatch(getDevices());

    // subscribe store
    store.subscribe(this.handleStoreChange);

    // get base data if logged in
    if (isAuthenticated()) {
      store.dispatch(getUserData());
      store.dispatch(userOnline());
    }
  }

  handleStoreChange = () =>
    this.setState({
      authModalShown: store.getState().showAuthModal,
    });

  runNotifications() {
    const { userData } = store.getState();

    if (userData) {
      store.dispatch(getUserNotifications());

      setInterval(() => {
        const { userData } = store.getState();

        if (userData) {
          store.dispatch(getUserNotifications());
        }
      }, 60000);
    } else {
      setTimeout(() => {
        this.runNotifications();
      }, 1000);
    }
  }

  render() {
    const { authModalShown } = this.state;
    const { interfaceLang } = store.getState();
    let selectedLang = localStorage.getItem("interfaceLang") || "en";

    if (interfaceLang) {
      selectedLang = interfaceLang.toLowerCase();
    }

    // check available lang
    if (Object.keys(translations).indexOf(selectedLang) === -1) {
      selectedLang = "en";
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IntlProvider
            locale={selectedLang}
            defaultLocale="en"
            key={selectedLang}
            messages={translations[selectedLang]}
          >
            <Router>
              <ScrollToTop>
                <StyledApp className={authModalShown ? "onAuth" : ""}>
                  <Helmet>
                    <title>
                      {translations[selectedLang]
                        ? translations[selectedLang]["meta.title"]
                        : ""}
                    </title>
                  </Helmet>
                  <GlobalStyles />
                  {isAuthenticated() ? <Header /> : <Header />}
                  <Main />
                  {isAuthenticated() ? <Footer /> : <Footer />}
                </StyledApp>
                {/*<AuthModal/>*/}
                <Spinner />
                <ToastContainer />
                <NotificationModal />
                <BurgerMenu />
              </ScrollToTop>
            </Router>
          </IntlProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
