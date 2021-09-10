const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Directory extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Index</Link>
                            </li>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/customers">Customers</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/home">
                            <Index/>
                        </Route>
                        <Route path="/customers">
                            <Customers/>
                        </Route>
                        <Route path="/index">
                            <Index/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ulist: [],
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
            <table className="table is-bordered is-narrow is-hoverable">
                <tbody>
                {/*{*/}
                {/*    this.state.currentView === "index" ?*/}
                {/*        <ViewOne onClick={page => this.setState({ currentView: this.state.currentView = page })} /> :*/}
                {/*        <ViewTwo onClick={page => this.setState({ currentView: this.state.currentView = page })} />*/}
                {/*}*/}
                <tr>
                    <th>ID</th>
                    <th>Leader</th>
                    <th>User Type</th>
                    <th>Email</th>
                    <th>Details</th>
                </tr>
                {this.renderRow()}
                </tbody>
            </table>
        )
    }

    renderRow() {
        let person, data, key;
        let row = this.state.users.map((user, index) => {
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

class Overview extends React.Component {
    render() {
        return(
            <section className="hero is-info welcome is-small">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Overview
                        </h1>
                        <h2 className="subtitle">
                            Glance of internal statistics
                        </h2>
                    </div>
                </div>
            </section>
        )
    }
}
class Tiles extends React.Component{
    render(){
        return (
            <section className="info-tiles">
                <div className="tile is-ancestor has-text-centered">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">100</p>
                            <p className="subtitle">Users</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">100</p>
                            <p className="subtitle">Products</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">100</p>
                            <p className="subtitle">Unpaid Orders</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">100</p>
                            <p className="subtitle">Exceptions</p>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}
class Index extends React.Component{
    render(){
        return <h2>Index</h2>;
    }
}

class Customers extends React.Component {
    render(){
        return <h2>Customers</h2>;
    }
}

class Index2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentView: "index"
        };

    }
    handleClick = (page) => {
        this.setState({ currentView : page});
    }
    render() {
        return (
            <div>
                Index <br />
                <button onClick={() => this.handleClick("home")}>Go to HOME</button>
            </div>
        )
    }
}

class User{
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
ReactDOM.render(
    <Overview/>,
    document.getElementById('overview')
)
ReactDOM.render(
    <Tiles/>,
    document.getElementById('tiles')
)
// ReactDOM.render(
//         <Directory/>,
//     document.getElementById('directory')
// )
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)