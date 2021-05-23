import React, { Component } from 'react';
// import React, {useState, useEffect} from 'react';
import axios from 'axios';

//components
import Organization from './components/organization/organization.component';

//The process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN comes from the .env file that contains our personal access token from github
//remember to add your personal github access token inside .env (if you don't have one file named like such, please create one)
const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  }
})

const TITLE = "React GraphQL GitHub Client";

//GraphQL query, we use template literals in JS to define the query as a string with multiple lines.
const GET_ORGANIZATION = `{
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}`;

class App extends Component {

  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
    organization: null,
    errors: null
  };

  componentDidMount() {
    //fetch data
    this.onFetchFromGitHub();
  }

  onChange = event => {
    this.setState({
      path: event.target.value
    })
  }

  onSubmit = event => {
    //fetch data
    event.preventDefault();
  }

  //we use axios to perform a HTTP POST request with a GraphQL query as payload
  //Since axios uses promises, the promise resolves eventually and you should have the result from the GraphQL API.
  onFetchFromGitHub = () => {
    axiosGitHubGraphQL.post('', {
      query: GET_ORGANIZATION
    })
    .then(result => this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors,
      })),
    );
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          {/* Controlled component */}
          <input id="url" type="text" value={path} onChange={this.onChange} style={{ width: "300px"}} />
          <button type="submit">Search</button>
        </form>
        <hr />
        {/* Here comes the result! */}
        { organization ? (
            <Organization organization={organization} errors={errors} />) 
            :
            (<p>No Information yet...</p>)
        }
      </div>
    );
  }
}

//Using Hooks
// const App = () => { 
//   const [path, setPath] = useState("the-road-to-learn-react/the-road-to-learn-react");

//   const onSubmitHandler = event => {
//     //fetch data
//     event.preventDefault();
//     console.log("submitted");
//   };
  
//   const onChangeHandler = event => {
//     setPath(event.target.value);
//   }

//   useEffect(() => {
//     //fetch data
//     console.log("Fetch data");
//   },[path]);

//   return (
//     <div>
//         <h1>{TITLE}</h1>
//         <form onSubmit={onSubmitHandler}>
//           <label htmlFor="url">
//             Show open issues for https://github.com/
//           </label>
//           <input id="url" type="text" onChange={onChangeHandler} style={{ width: "300px"}} />
//           <button type="submit">Search</button>
//         </form>
//         <hr />
//         {/* Here comes the result! */}
//     </div>
//   );
// };

export default App;
