const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ulist: [], users: []};

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

    render() {

        // let person, user, data, key;
        // // let id, reportsTo, userType, email, details;
        // try{
        //     user = this.state.users[0];
        //     data = user["values"];
        //     key = user["key"];
        //     person = new User(key, data.reportsTo, data.userType, data.email, data.details);
        //     person.print();
        // }catch (e) {
        //     console.log(e);
        //     return null
        // }
        return (
            <table className="table is-bordered is-narrow is-hoverable">
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Leader</th>
                    <th>User Type</th>
                    <th>Email</th>
                    <th>Details</th>
                </tr>
                <tr>
                    <td>{person.id}</td>
                    <td>{person.reportsTo}</td>
                    <td>{person.userType}</td>
                    <td>{person.email}</td>
                    <td>{person.details}</td>
                </tr>
                </tbody>
            </table>
        )
    }
    renderRow() {
        let person, user, data, key;

        let usersList = this.state.users.map((user, index) => {
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
        return usersList;
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
        let str = '';
        return JSON.stringify(this._details);;
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
    <App/>,
    document.getElementById('react')
)