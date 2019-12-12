import React, {Component} from 'react';



const Header = () => (
  <div className="header-grid">
    <h1 className="title">Jiffy</h1>
  </div>
);


class App extends Component {
  // with create react app we can write methods as arrow
  //functions, meaning we don't need the constructor and bind
  handleChange = event =>  {
    const {value} = event.target;
    console.log(value);
    if (value.lenght > 2) {
      console.log('this is a valid search term');
    }
  };
  render() {
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* images go here */}
          <input className="input grid-item" placeholder="Type Something" onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default App;
