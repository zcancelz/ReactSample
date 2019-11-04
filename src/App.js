import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Home} from './pages/common/component';
import WatchTemplate from "./pages/watch/component/WatchTemplate";
import Translate from "./pages/translate/component/Translate";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
          <Route exact path="/translate" component={Translate}/>
        <Route exact path="/watch/:type" component={WatchTemplate}/>
      </div>
    );
  }
}

export default App;