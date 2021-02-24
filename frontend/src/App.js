import React, { Component } from 'react';
import './App.css';
import Articles from './ArticlesList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './ProductsList';

//Router define
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Products}/>
          <Route path='/articles' exact={true} component={Articles}/>
        </Switch>
      </Router>
    )
  }
}

export default App;