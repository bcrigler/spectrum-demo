import React, { Component } from 'react';
import './global.css';
import {GlobalContext, GlobalProvider} from "./context/GlobalContext";
import GlobalComponent from "./context/GlobalComponent";
import Rewards from "./components/Rewards/Rewards";

export class App extends Component {
    render()
    {
        /// Typically we would have various routing going on here with our global context wrapped around
        /// the various routes.  This is how we can utilize React Context to provide Global Data to all our components.
        return (
            <GlobalProvider>
                <GlobalContext.Consumer>
                    {({ isAuth, userTransactions, userFirstName }) => (
                        ( (isAuth) &&
                            <GlobalComponent component={Rewards} />
                        )
                    )}
                </GlobalContext.Consumer>
            </GlobalProvider>
        );
    }
}