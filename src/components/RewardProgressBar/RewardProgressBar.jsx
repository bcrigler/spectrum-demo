
import * as React from 'react';

import './RewardProgressBar.css';

/**
 * A Progress Bar React Hook using State that visualizes how close the user is to their next reward.
 * @param width             int     the width numerical value
 * @param percent           int     a double (in higher languages) that acts as a percentage.
 * @param status            string  A string that tells the user how close they are to their reward.
 * @returns {JSX.Element}           The visual html markup that makes up the progress bar is returned.
 * @constructor
 */
export var RewardProgressBar = ({ width, percent, status }) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        setValue(percent * width);
    });

    return (
        <div className={"progressComp"}>
            <h1 className="percent-number">{status}</h1>
            <div className="progress-div" style={{ width: width }}>
                <div style={{ width: `${value}px` }} className="progress" />
            </div>
        </div>
    );
};