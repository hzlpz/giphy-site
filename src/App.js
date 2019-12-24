import React, {Component} from 'react';
import './css/main.css';
import loader from './images/loader.svg';
import Gif from './Gif'
import clearButton from './images/close-icon.svg';

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}


const Header = ({clearSearch, hasResults}) => (
  <div className="header-grid">
    {/* if we have results, show the clear button, otherwise, show the title  */}
    { hasResults ? (
      <button onClick={clearSearch} className="clear">
         <img src={clearButton} />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
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
      loading: false,
      hintText: '',
      // we have an array of gifs
      gifs: []
    };
  }

  // we want an function that searches the giphy api using
  // fetch and puts the search term into the query url and 
  // and then we can do something with the results

  searchGiphy = async searchTerm => {
    //here we set our loading state to be true
    // and this will show the spinner at the bottom
   this.setState ({
     loading: true
   });
    // first we try our fetch
    try {
      // we use the await keyword to wait for our response to come back 
      const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=f25Genn1xxGavMD0g5u0otKRF2EBg2Et&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`);

      // here we convert our raw response into json data
      // const [data] gets the data part of our response
      const {data} = await response.json();

    // here we check if the array of results is empty
    // if it is, we throw an error which will stop the 
    // code here and handle it in the catch area
      if (!data.length) {
        throw `Nothing found for ${searchTerm}`
      }
      
      //here we grab a random result from our images
      const randomGif = randomChoice(data);
      
      console.log(randomGif);
      console.log(data);
      
      this.setState((prevState, props) => ({
        ...prevState,
      
        // here we use our spread to take the previous gifs and
        // spread them out, and then add our new random gif
        // onto the end
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`

      }));

// if our fetch fails, we catch it down here
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }));
    }
  };

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

  // here we set our state by clearing everything out and making 
  // default again (like in our originalv state)

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }));
    //her we grab the input and then focus the cursor back into it
    this.textInput.focus();
  }

  render() {
    const { searchTerm, gifs} = this.state;
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults}/>
        <div className="search grid">
          {/* images go here */}
        {/* Our stack of gif images here */}
        {/* Here we loop over our array of gif images of our state and we create lots of videos */}

          {this.state.gifs.map(gif => (
            <Gif {...gif}/>
           ))}

          <input className="input grid-item" 
          placeholder="Type Something" 
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={searchTerm}
          ref={input => {
            this.textInput = input;
          } }
          />
        </div>
        {/* here we pass our userHint all of our state using a spread operator */}
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
