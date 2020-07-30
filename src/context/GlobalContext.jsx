import React from 'react';
import UserService from '../services/UserService/UserService';

export const GlobalContext = React.createContext();

/**
 * GlobalProvider Class
 * This class will actually provide all the components in the application with
 * relevant data.  In a real world application our authentication and authorization would happen here
 * and we would have Protected Routes.  For now we'll use it to pass mock User/Rewards/Transaction Data to the rest of the app.
 */
class GlobalProvider extends React.Component {
    // our initial state / data types.... I wish I was using Typescript.
    state = { currentUser: {}, userTransactions: [], totalPoints: 0, pointsNeededForReward: 200, percentToReward: 0, pointsUntilReward: 0, status: '' };

    constructor() {
        super();
        this.calculateRewards = this.calculateRewards.bind(this);
    }

    /**
     * Shows how to utilize ComponentDidMount as an async / await
     * We get the user data, and the user transactions via the UserService and
     * set the Global State of the Application
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        this.state.currentUser = await UserService.getUser();
        // real world we would pass the user id to getUserTransactions(userId); to get a specific users transaction records
        this.state.userTransactions = await UserService.getUserTransactions();
        this.setState(this.state);
    }

    /**
     * This method performs our math to calculate the users percentage until their reward.
     * Also, it generates a status string that tells the users how many points away they are
     * from reaching their goal.  It returns an object with percentToReward and status fields.
     *
     * @param totalDollarsEligible  int     The total number of dollars eligible to accrue points
     * @returns {{percentToReward: number, status: string}}
     */
    calculateRewards(totalDollarsEligible) {
        return {
            percentToReward: 2 * Math.round(totalDollarsEligible) % 100 / 200,
            status: 'You have ' + 2 * Math.round(totalDollarsEligible) % 100 +
            ' points out of ' + 200 +
            '!  Only ' + (200 - (2 * Math.round(totalDollarsEligible) % 100)) +
            ' to go until you get your reward!'
        };
    }

    /**
     * Renders the GlobalContext.Provider which creates a
     * global app state which will allow any data we have here to be
     * utilized throughout the application
     * @returns {*}
     */
    render() {
        return (
            <GlobalContext.Provider value={{
                isAuth: this.state.currentUser.isAuth,
                userTransactions: this.state.userTransactions,
                userFirstName: this.state.currentUser.userFirstName,
                calculateRewards: this.calculateRewards
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

// Our GlobalConsumer which is wrapped around our core component
const GlobalConsumer = GlobalContext.Consumer;

// Export our AuthProvider / AuthConsumer context classes
export {GlobalProvider, GlobalConsumer};