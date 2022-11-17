// import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Tokenomics from './pages/Tokenomics.jsx'
import BlackMarket from './pages/BlackMarket.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import Minter from './pages/Minting.jsx'
import Assets from './pages/Assets.jsx'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/aboutUs' component={AboutUs} />
        <Route path='/roadmap' component={Roadmap} />
        <Route path='/tokenomics' component={Tokenomics} />
        <Route path='/minting' component={Minter} />
        <Route path='/marketplace' component={BlackMarket} />
        <Route path='/contact' component={Contact} />
        <Route path='/assets' component={Assets} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
