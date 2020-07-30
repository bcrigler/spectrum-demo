import React, { Component } from 'react';
import './global.css';
import {GlobalContext, GlobalProvider} from './context/GlobalContext';
import GlobalComponent from './context/GlobalComponent';
import Rewards from './components/Rewards/Rewards';

/**
 * The main source component for the application which in the real world would have the GlobalContext.Provider wrapped around
 * a series of routes, that would be using a custom ProtectedRoute component that would determine access to the specified route
 * based on Authorization.
 */
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