import React from 'react';

/**
 * User Service
 * A React Service Pattern used to keep the separation of logic of http
 * calls and functional / stateful components
 */
export default class UserService extends React.Component {
    /**
     * A Get HTTP call that in the real world would accept a param of a userId to pull the currently logged in user
     * likely the user_id would be stored in the Auth Token.
     * @returns {Promise<any>}
     */
    static async getUser() {
        return await fetch(process.env.API_URL.toString() + "/data/user.json", {})
            .then(res => res.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    /**
     * A GET call that would again in the real world pull the relational table of UserTransactions by user_id
     * which would be a foreign key on the UserTransactions table tying the Transactions to the user.
     * @returns {Promise<any>}
     */
    static async getUserTransactions() {
        return await fetch(process.env.API_URL.toString() + "/data/userTransactions.json", {})
            .then(res => res.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }
}