import React, {Component} from 'react';
import './css/main.css';
import loader from './assets/loader.svg'




const Header = () => (
  <div className="header-grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({loading = true, hintText}) => (
  <div className="user-hint">
    {/* Here we check whether we have a loading state and render our spinner or hint text */}
    {loading ? 
    <img className="block mx-auto" src={loader}/> :
     hintText}
  </div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      hintText: ''
    };
  }

  // with create react app we can write methods as arrow
  //functions, meaning we don't need the constructor and bind

  handleChange = event =>  {
    const {value} = event.target;
    // by setting the searchTerm in our state and also using that
    // on the input as the value, we have created what is called 
    // a controlled input
    this.setState((prevState, props) => ({
      // we take our old props and spread them out after
      ...prevState,
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
      // and then we overwrite the ones we want after
    if (value.length > 2) {
      console.log('this is a valid search term');
    }
  };


  handleKeyPress = event => {
    const {value} = event.target;
  // when we have 2 or more characters in our search box
  // and we have also pressed enter, we then want to run a search
    if (value.length > 2 && event.key === "Enter") {
      alert(`search for ${value}`);
    }
  }


  render() {
    const { searchTerm } = this.state
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* images go here */}
          <input className="input grid-item" 
          placeholder="Type Something" 
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={searchTerm}
          />
        </div>
        {/* here we pass our userHint all of our state using a spread operator */}
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
