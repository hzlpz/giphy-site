import React, {Component} from 'react';
import './css/main.css';
import loader from './assets/loader.svg'

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}


const Header = () => (
  <div className="header-grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({loading, hintText}) => (
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
      hintText: '',
      gif: null
    };
  }

  // we want an function that searches the giphy api using
  // fetch and puts the search term into the query url and 
  // and then we can do something with the results

  searchGiphy = async searchTerm => {
    // first we try our fetch
    try {
      // we use the await keyword to wait for our response to come back 
      const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=f25Genn1xxGavMD0g5u0otKRF2EBg2Et&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`);

      // here we convert our raw response into json data
      // const [data] gets the data part of our response
      const {data} = await response.json();
      
      //here we grab a random result from our images
      const randomGif = randomChoice(data);
      
      console.log(randomGif);
      console.log(data);
      
      this.setState((prevState, props) => ({
        ...prevState,
        // get the first resilt and put it in the state
        gif: randomGif
      }));

// if our fetch fails, we catch it down here
    } catch (error) {}
  };

  // we can also write async methods into our components 
  // that let us use the async/await style function




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
      // here we call our searchGiphy function using the search term
      this.searchGiphy(value);
    }
  }


  render() {
    const { searchTerm, gif} = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* images go here */}
        {/* its only going to render our video when we have a gif in the state */ }
        {gif && (
          <video className="grid-item video" autoPlay loop src=
          {gif.images.original.mp4} />
        )}

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
