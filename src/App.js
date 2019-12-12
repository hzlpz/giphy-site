import React, {Component} from 'react';


const Header = () => (
  <div className="header-grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="page">
        <Header />
      </div>
    );
  }
}

export default App;
