import React from 'react';

export default class UserService extends React.Component {
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