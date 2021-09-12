import {Button} from "react-bulma-components";
import {default as axios} from "axios";
import client from "./client";

const React = require('react');
const ReactDOM = require('react-dom');

export class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <h2>TEST!</h2>;
    }
}
export class Banner extends React.Component {
    render() {
        return(
            <section className="hero is-info welcome is-small">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Overview
                        </h1>
                        <h2 className="subtitle">
                            Summary of Internal Records
                        </h2>
                    </div>
                </div>
            </section>
        )
    }
}
export class Tiles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tile1 : '',
            tile2 : '',
            tile3 : '',
            tile4 : ''
        };
        this.getRequest = this.getRequest.bind(this);
        // this.requestUrl = this.requestUrl.bind(this);
    }
    componentDidMount() {
        client({method: 'GET', path: '/api/users/id/user/total'}).done(response => {
            this.setState({tile1: response.entity});
        });
        client({method: 'GET', path: '/api/users/search/countUsersByReportsToIsContaining?leaderId=none%20assigned'}).done(response => {
            this.setState({tile2: response.entity});
        });
    }

    getRequest() {
        let addresses = [
            'http://localhost:8080/api/users/id/user/total',
            'http://localhost:8080/api/users/search/countUsersByReportsToIsContaining?leaderId=none%20assigned',
            'localhost:8080/api/users/'
        ]
        // axios.get(addresses[0], {
        //     responseType: "text"
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         this.setState({tile1: response});
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // //this.setState({tile2: this.requestUrl(addresses[1])});
    }

    render(){
        return (
            <section className="info-tiles">
                <div className="tile is-ancestor has-text-centered">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">{this.state.tile1}</p>
                            <p className="subtitle">Users Total</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">{this.state.tile2}</p>
                            <p className="subtitle">Unassigned</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title has-text-danger">12</p>
                            <p className="subtitle">Unpaid Orders</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title has-text-success">Online</p>
                            <p className="subtitle">Server</p>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}
export class Overview extends React.Component{
    render(){
        return(
            <div>
                <Banner/>
                <Tiles/>
            </div>
        );
    }
}
export class SideBar extends React.Component {
    render(){
        return(
            <div className="column is-3 ">
                <aside className="menu is-hidden-mobile">
                    <p className="menu-label">
                        General
                    </p>
                    <ul className="menu-list">
                        <li><a className="is-active">Dashboard</a></li>
                        <Directory/>
                    </ul>
                    <p className="menu-label">
                        Product Overview
                    </p>
                    <ul className="menu-list">
                        <li>
                            <a>Manage sectors</a>
                            <ul>
                                <li>Sector A</li>
                                <li>Sector B</li>
                                <li>Sector C</li>
                            </ul>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }
}
export class GenericButton extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        // form={this.props.formID}
        return(
            <div className="columns">
                <div className="column is-10"/>
                <div className="column is-2 ml-3">
                    <Button className="is-info ">{this.props.buttonText}</Button>
                </div>
            </div>
        );
    }
}
export class PostButton extends React.Component {
    constructor(props) {
        super(props);
        // this.state = this.props;
        this.createUser = this.createUser.bind(this);
    }
    createUser() {
        let surname;
        let name = this.props.userEntry.name;
        let str = ""+name;
        if (str.includes(' ')) {
            const words = str.split(' ');
            name = words[0];
            surname = words[1];
        }
        let department  = ''+this.props.userEntry.department;
        let email = ''+this.props.userEntry.email;
        let balance = ''+this.props.userEntry.balance;
        if(this.props.formID === "userEntry"){
            axios.post('http://localhost:8080/api/users/new/user/create', {
                userType: department,
                email: email,
                details : {
                    firstName :  ''+name,
                    lastName : (surname === "" || surname === " " || surname === null) ? " " : ''+ surname,
                    totalBalance : balance
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        // form={this.props.formID}
        return(
            <div className="columns">
                <div className="column is-10"/>
                <div className="column is-2 ml-3">
                    <button onClick={this.createUser} className="is-info ">{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}
export class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        // this.state = this.props;
        this.deleteUser = this.deleteUser.bind(this);
    }
    deleteUser() {
        axios.delete('http://localhost:8080/api/users/'+ this.props.userEntry.id +'/user/')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        // form={this.props.formID}
        return(
            <div className="columns">
                <div className="column is-10"/>
                <div className="column is-2 ml-3">
                    <button onClick={this.deleteUser} className="is-info ">{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}
export class AppointButton extends React.Component {
    constructor(props) {
        super(props);
        this.appointUser = this.appointUser.bind(this);
    }
    appointUser() {
        axios.patch('http://localhost:8080/api/users/'+ this.props.userEntry.subId +'/user/patch', new URLSearchParams({
          leaderId : this.props.userEntry.id }
        ) )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return(
            <div className="columns">
                <div className="column is-10"/>
                <div className="column is-2 ml-3">
                    <button onClick={this.appointUser} className="is-info ">{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}
// noinspection DuplicatedCode
export class UpdateButton extends React.Component {
    constructor(props) {
        super(props);
        // this.state = this.props;
        this.updateUser = this.updateUser.bind(this);
    }
    updateUser() {
        let surname;
        let name = this.props.userEntry.name;
        let str = ""+name;
        if (str.includes(' ')) {
            const words = str.split(' ');
            name = words[0];
            surname = words[1];
        }
        let id = ''+this.props.userEntry.id;
        let department  = ''+this.props.userEntry.department;
        let email = ''+this.props.userEntry.email;
        let balance = ''+this.props.userEntry.balance;
        if(this.props.formID === "userEntry"){
            axios.put('http://localhost:8080/api/users/' + id + '/user', {
                userType: department,
                email: email,
                details : {
                    firstName :  ''+ name,
                    lastName : (surname === "" || surname === " " || surname === null) ? " " : ''+ surname,
                    totalBalance : balance
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        // form={this.props.formID}
        return(
            <div className="columns">
                <div className="column is-10"/>
                <div className="column is-2 ml-3">
                    <button onClick={this.updateUser} className="is-info ">{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}

export class IDFields extends React.Component {
    constructor(props) {
        //appoint, Id
        super(props);
        this.state = {
            id: '',
            subId: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const ref = target.name;
        this.setState({
            [ref]: value
        });
    }
    render() {
        return (
            <section>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input name="id"   className="input" type="text" placeholder={"ID"} onChange={this.handleChange} value={this.state.id}/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-id-card"/>
                                </span>
                            </p>
                        </div>
                        {this.props.appoint === true &&
                        <div className="field">
                            <p className="control is-expanded has-icons-left has-icons-right">
                                <input name="subId"   className="input" type="text" placeholder={"Subordinate ID"} onChange={this.handleChange} value={this.state.subId}/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-id-card"/>
                                </span>
                            </p>
                        </div>
                        }
                    </div>
                </div>
                {this.props.appoint === false &&
                    <DeleteButton userEntry={ this.state } buttonText={"Delete"}/>
                }
                {this.props.appoint === true &&
                    <AppointButton userEntry={ this.state } buttonText={"Appoint"}/>
                }

            </section>
        );
    }
}

export class UpdateEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            department: 'Business Development',
            balance: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const ref = target.name;
        this.setState({
            [ref]: value
        });
    }
    render() {
        return (
            <section id={this.props.key}>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input name="id" className="input" type="text" placeholder={"ID"} onChange={this.handleChange} value={this.state.id}/>
                                <span className="icon is-small is-left">
                            <i className="fa fa-id-card"/>
                            </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal is-narrow">
                    <div className="field-label is-small">
                        <label className="label">Information</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input name="name" className="input" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}  />
                                <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
                            </span>
                            </p>
                        </div>

                        <div className="field">
                            <p className="control is-expanded has-icons-left has-icons-right">
                                <input name="email" className="input is-success" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal is-narrow">
                    <div className="field-label is-small">
                        <label className="label">Department</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name="department" value={this.state.department} onChange={this.handleChange}>
                                        <option value={"Business Development"}>Business Development</option>
                                        <option value={"Marketing"}>Marketing</option>
                                        <option value={"Sales"}>Sales</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input name={"balance"} className="input" type="text" placeholder="Balance" value={this.state.balance} onChange={this.handleChange}/>
                                <span className="icon is-small is-left">
                            <i className="fa fa-money"></i>
                            </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <UpdateButton userEntry={this.state} formID={"userEntry"}  buttonText={ this.props.buttonClass }/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
