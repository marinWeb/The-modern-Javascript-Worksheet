import './App.css';
import About from './Components/About';
import Shop from './Components/Shop';
import Nav from './Components/Nav'
import ItemDetails from './Components/ItemDetails';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
  <div className="App">
      
      <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/shop/:id' component={ItemDetails} />
        </Switch>
      
      
  </div>
  </Router>
  );
}

const Home = () =>{
  return(
    <div>
        <h1>Home Page</h1>
    </div>
    
  )
}

export default App;
