import React from 'react';
import { GlobalConsumer } from './GlobalContext';

const GlobalComponent = ({ component: Component, props: props }) => (
    <GlobalConsumer>
        {({}) => {
            return (<Component {...props} />)
        }}
    </GlobalConsumer>
);

export default GlobalComponent;