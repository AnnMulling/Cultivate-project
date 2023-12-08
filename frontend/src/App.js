import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import WorkSpace from "./components/WorkSpace";
import BoardDetails from "./components/Board";
import SignupFormModal from "./components/SignupFormModal";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
     {location.pathname !== '/workspace'
       && !location.pathname?.includes('/boards')
       && <Navigation isLoaded={isLoaded} />}
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded &&(
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/workspace">
            <WorkSpace />
          </Route>
          <Route path="/boards/:boardId">
            <BoardDetails/>
          </Route>
          <Route>404 Page Does Not Exist</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
