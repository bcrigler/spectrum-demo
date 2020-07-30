import React from 'react';
import { GlobalConsumer } from './GlobalContext';

/**
 * This GlobalComponent in the real world would be a ProtectedRoute Component that would determine access
 * based on the isAuth boolean passed by GlobalContext.  It would act as a door into protected pages in the application.
 * @param Component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalComponent = ({ component: Component, props: props }) => (
    <GlobalConsumer>
        {({}) => {
            return (<Component {...props} />)
        }}
    </GlobalConsumer>
);

export default GlobalComponent;