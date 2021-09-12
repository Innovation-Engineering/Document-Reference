const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const axios = require('axios').default;

import { GenericButton, PostButton, UpdateEntry, IDFields, Test, Overview, Banner} from "./components/html/container";
import { User } from "./components/domain/structure";
import { Button } from 'react-bulma-components';
import { BrowserRouter as Router, Switch, useHistory, Route, Link } from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ulist: [],
            users: [],
            currentView: "index"
        };
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/users'}).done(response => {
            this.setState({ulist: response.entity._embedded.users});
            let user;
            const usersList = this.state.ulist.map(users =>
                user = { key: users._links.self.href, values:users}
            );
            this.setState({users: usersList});
        });
    }
    render(){
        return(
            <div  className="columns">
                {/*<SideBar/>*/}

                <div className="column is-3 ">
                    <aside className="menu is-hidden-mobile">
                        <p className="menu-label">
                            General
                        </p>
                        <ul className="menu-list">
                            <Link to="/home">Dashboard</Link>
                            <Link to="/users">Users</Link>
                        </ul>
                        <p className="menu-label">
                            Product Overview
                        </p>
                        <ul className="menu-list">
                            <li>
                                Manage sectors
                                <ul>
                                    <li><Link to="/business">Business Development</Link></li>
                                    <li><Link to="/marketing">Marketing</Link></li>
                                    <li><Link to="/sales">Sales</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div className="column is-9">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">_____________</a></li>
                            {/*<li className="is-active"><a href="home" aria-current="page">Home</a></li>*/}
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/users:control">
                        </Route>
                        <Route path="/users">
                            <UserControls users={this.state.users}/>
                        </Route>
                        <Route path="/business">
                            <Table key={"business"} url={"/api/users/search/findByUserType?type=Business%20Development"}/>
                        </Route>
                        <Route path="/marketing">
                            <Table key={"marketing"} url={"/api/users/search/findByUserType?type=Marketing"}/>
                        </Route>
                        <Route path="/sales">
                            <Table key={"sales"} url={"/api/users/search/findByUserType?type=Sales"}/>
                        </Route>
                        <Route path="/">
                            <Overview/>
                            {/*<Table users={this.state.users}/>*/}
                        </Route>

                    </Switch>
                </div>
            </div>
        );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: [],
            rows: []
        };
    }
    componentDidMount() {
        client({method: 'GET', path: this.props.url }).done(response => {
            this.setState({body: response.entity._embedded.users});
            let user;
            const usersList = this.state.body.map(users =>
                user = { key: users._links.self.href, values:users}
            );
            this.setState({ rows: usersList });
        });
    }

    render(){
        return(
            <div className="table-container">
                <table className="table is-bordered is-narrow is-hoverable is-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Leader</th>
                        <th>User Type</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRow()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRow() {
        let person, data, key;
        let row = this.state.rows.map((user, index) => {
            try{
                data = user["values"];
                key = user["key"];
                person = new User(key, data.reportsTo, data.userType, data.email, data.details);
                person.print();
            }catch (e) {
                console.log(e);
                return null
            }
            return (
                <tr>
                    <td>{person.id}</td>
                    <td>{person.reportsTo}</td>
                    <td>{person.userType}</td>
                    <td>{person.email}</td>
                    <td>{person.details}</td>
                </tr>
            );
        });
        return row;
    }
}
class UserControls extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section>
                <Router>
                <div className="field has-addons">
                    <p className="control">
                        <Button className="button" to="/user/create" renderAs={Link}>
                    <span className="icon is-small">
                        <i className="fa fa-plus-square"/>
                    </span>
                            <span>Create</span>
                        </Button>
                    </p>
                    <p className="control">
                        <Button className="button" to="/user/update" renderAs={Link}>
                    <span className="icon is-small">
                        <i className="fa fa-pencil-square-o"/>
                    </span>
                            <span>Update</span>
                        </Button>
                    </p>
                    <p className="control">
                        <Button className="button" to="/user/delete" renderAs={Link}>
                            <span className="icon is-small">
                            <i className="fa fa-trash"/>
                            </span>
                            <span>Delete</span>
                        </Button>
                    </p>
        {/*            <p className="control">*/}
        {/*                <Button className="button" to="/user/search" renderAs={Link}>*/}
        {/*<span className="icon is-small">*/}
        {/*<i className="fa fa-search"/>*/}
        {/*</span>*/}
        {/*                    <span>Search</span>*/}
        {/*                </Button>*/}
        {/*            </p>*/}
                    <p className="control">
                        <Button className="button" to="/user/appoint" renderAs={Link}>
        <span className="icon is-small">
        <i className="fa fa-level-up"/>
        </span>
                            <span>Appoint</span>
                        </Button>
                    </p>
                </div>
                <div>
                    <Switch>
                        <Route path="/user/create">
                            <UserEntry buttonClass={"Submit"} />
                        </Route>
                        <Route path="/user/update">
                            <UpdateEntry buttonClass={"Submit"}/>
                        </Route>
                        <Route path="/user/delete">
                            <IDFields appoint={false} />

                            {/*<GenericButton buttonText={"Submit"}/>*/}
                        </Route>
                        {/*<Route path="/user/search">*/}

                        {/*    /!*<Table key={"search"} url={"localhost:8080/api/users'"}/>*!/*/}
                        {/*</Route>*/}
                        <Route path="/user/appoint">

                            <IDFields appoint={true} />
                        </Route>
                    </Switch>
                </div>
                </Router>
            </section>
                    );
    }
}
class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <section>

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
                            <PostButton userEntry={this.state} formID={"userEntry"}  buttonText={ this.props.buttonClass }/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);