import React from "react";


//Goggle Analytics
import ReactGA from 'react-ga';
import { withRouter } from "react-router-dom";


const RouteChangeTracker = ({ history }) => {

    history.listen((location, action) => {
        ReactGA.set( { page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    return <div></div>;
}

export default withRouter(RouteChangeTracker)
