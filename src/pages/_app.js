import React from "react";
import { Redirect } from 'react-router';
import NavbarComponent from "./../components/NavbarComponent";
import IndexPage from "./index";
import BlogPage from "./blog";
import PostPage from "./post";
import SigninPage from "./signin";
import SignupPage from "./signup";
import DashboardPage from "./dashboard";
import { Switch, Route, Router } from "./../util/router.js";
import Footer from "./../components/Footer";
import { ProvideAuth } from "./../util/auth.js";
import { useAuth } from '../util/auth';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const auth = useAuth();

  if (auth.user) {
    return <Route component={Component} {...props} />
  }
  return (
    <Redirect to="/" />
  )
}

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <>
          <NavbarComponent
            color="white"
            spaced={true}
            logo="https://uploads.divjoy.com/logo.svg"
          />

          <Switch>
            <Route exact path="/" component={IndexPage} />

            <Route exact path="/blog/:id" component={BlogPage} />

            <Route exact path="/post/:id" component={PostPage} />

            <Route exact path="/signin" component={SigninPage} />

            <Route exact path="/signup" component={SignupPage} />

            {/* <Route exact path="/dashboard" component={DashboardPage} /> */}
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />

            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                );
              }}
            />
          </Switch>

          <Footer
            color="white"
            size="normal"
            logo="https://uploads.divjoy.com/logo.svg"
            copyright="© 2019 Company"
          />
        </>
      </Router>
    </ProvideAuth>
  );
}

export default App;
