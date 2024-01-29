import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormModal from "./components/SignupFormModal";
import SignupPage from "./components/SignupFormModal/SignupPage";
import LoginFormModal from "./components/LoginFormModal";
import UserPage  from "./components/User";
import Starred from "./components/Starred";
import HomePage from "./components/HomePage";
import WorkSpace from "./components/WorkSpace";
import BoardDetails from "./components/Board";
import SetTime from "./components/SetTimePage";
import SetTimeCookie from "./components/SetTimePage/CookieTime";
import SetTimeTree from "./components/SetTimePage/TreeTime";
import SetTimeRegular from "./components/SetTimePage/RegularTime";

//Goggle Analytics
import ReactGA from 'react-ga';
import RouteChangeTracker from './Tracker'

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  const TRACKING_ID = "G-8M315LJ301"
  ReactGA.initialize(TRACKING_ID);


//Tract user creation event
  ReactGA.event({
    category: 'User',
    action: 'Created an Account'
  });

//Catch exeptions
  ReactGA.exception({
    description: 'An error occurred',
    fatal: true
  });


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
     <RouteChangeTracker/>
     {location.pathname !== '/workspace'
       && !location.pathname.includes('/user')
       && !location.pathname.includes('/signup')
       && !location.pathname.includes('/timer')
       && !location.pathname?.includes('/boards')
       && !location.pathname.includes('/starred')
       && <Navigation isLoaded={isLoaded} />}
      {/* <Navigation isLoaded={isLoaded} /> */}

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/user">
            <UserPage />
          </Route>
          <Route exact path="/workspace">
            <WorkSpace />
          </Route>
          <Route path="/boards/:boardId">
            <BoardDetails/>
          </Route>
          <Route path="/starred">
            <Starred />
          </Route>
          <Route exact path="/timer">
            <SetTime />
          </Route>
          <Route path="/timer/reg">
            <SetTimeRegular />
          </Route>
          <Route path="/timer/cookie">
            <SetTimeCookie/>
          </Route>
          <Route path="/timer/tree">
            <SetTimeTree/>
          </Route>
          <Route>404 Page Does Not Exist</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
