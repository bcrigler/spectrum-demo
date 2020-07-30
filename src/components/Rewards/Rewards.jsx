import React, {useContext} from 'react';
import {RewardProgressBar} from "../RewardProgressBar/RewardProgressBar";
import {GlobalContext} from "../../context/GlobalContext";

/**
 * This Rewards Hook utilizes the GlobalContext to keep most of the logic out of the component,
 * this could be improved by moving the totalDollars logic to GlobalContext and just handing off the values needed to build
 * this component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Rewards() {
    // here we can pull in our context to use global state within this stateful component
    // this will give us access to GlobalContext in our custom Hook!
    const context = useContext(GlobalContext);
    let totalDollarsEligible = 0;
    context.userTransactions.forEach((value) => {
        totalDollarsEligible += 2 * Math.round(value.amount) % 100;
    });
    let rewardData = context.calculateRewards(totalDollarsEligible);
    let percent = rewardData.percentToReward;
    let status = rewardData.status;

    return (
        <React.Fragment>
            <section className={'centeredFlexRow rowMargins'}><img src={'assets/spectrumLogo.png'}/></section>
            <section className={'centeredFlexRow'}>
                <div className={'whiteRounded'}>
                    <h2 className={'headerTwo'}>My Spectrum Rewards</h2>
                    <p className={'welcomeUser'} align={'right'}>Welcome {context.userFirstName}!</p>
                    <RewardProgressBar width={600} percent={percent} status={status} />
                </div>
            </section>
        </React.Fragment>
    );
}

export default Rewards;