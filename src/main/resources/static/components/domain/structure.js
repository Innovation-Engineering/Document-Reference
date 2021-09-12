const React = require('react');
const ReactDOM = require('react-dom');

export class User{
    get id() {
        let str = this._id.substring(this._id.lastIndexOf("/") + 1, this._id.length);
        return str;
    }

    get reportsTo() {
        return this._reportsTo;
    }

    get userType() {
        return this._userType;
    }

    get email() {
        return this._email;
    }

    get details() {
        return JSON.stringify(this._details);
        //console.log(this._details.values);
        //return this._details.values.forEach( it => { str += it} );
    }
    constructor(id, reportsTo, userType, email, details) {
        this._id = id;
        this._reportsTo = reportsTo;
        this._userType = userType;
        this._email = email;
        this._details = details;
    }
    print(){
        console.log( this.id + this.userType + this.email + this.details);
    }
}