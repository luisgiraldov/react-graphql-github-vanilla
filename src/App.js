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

//GraphQL query to get repositories
const GET_REPOSITORY_OF_ORGANIZATION = `{
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      name
      url
    }
  }
}`;

//GraphQL query to get Issues of repository
const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
        }
      }
    }
  } 
`;

//Same query as GET_ISSUES_OF_REPOSITORY but using template literals
const getIssuesOfRepositoryQuery = (organization, repository) => `{
  organization(login: "${organization}") {
    name
    url
    repository(name: "${repository}") {
      name
      url
      issues(last: 5) {
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  }
}`;


const getIssuesOfRepository = path => {
  //since the split method returns an array of values and it is assumed that there is only one slash in the path
  //the array should consist of two values: the organization and repository. That's why we used array destructuring here
  const [ organization, repository ] = path.split('/'); 

  //we use axios to perform a HTTP POST request with a GraphQL query as payload
  //Since axios uses promises, the promise resolves eventually and you should have the result from the GraphQL API.
  //We send the variables needed for the query along with the query itself (GraphQL)
  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
        variables: {
          organization,
          repository
        }
  });
};

//HOF high-order-function
//We use a high order function to pass the result of a promise and at the same time we provide a function to use in the this.setState
const resolveIssuesQuery = queryResult => () => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors,
});


class App extends Component {

  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
    organization: null,
    errors: null
  };

  componentDidMount() {
    //fetch data
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({
      path: event.target.value
    })
  }

  onSubmit = event => {
    //fetch data
    event.preventDefault();

    this.onFetchFromGitHub(this.state.path);
  }

  onFetchFromGitHub = path => {
    getIssuesOfRepository(path)
      .then( queryResult => this.setState(
        resolveIssuesQuery(queryResult)),
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
