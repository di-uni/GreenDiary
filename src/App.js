import React from "react";
import './App.css';
import { BrowserRrouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Diary from './pages/diary/Diary';
import My from "./pages/my/My";
import ZeroWaste from "./pages/share/ZeroWaste";
import CarbonFootprint from "./pages/share/CarbonFootprint";
import Food from "./pages/share/Food";
import Others from "./pages/share/Others";
// import Example from "./pages/my/My";

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/diary" component={Diary} />
      {/* <Route path="/share" component={Share} /> */}
      <Route path="/zerowaste" component={ZeroWaste} />
      <Route path="/carbonfootprint" component={CarbonFootprint} />
      <Route path="/food" component={Food} />
      <Route path="/others" component={Others} />
      <Route path="/my" component={My} />
    </div>
  )
}

export default App;
