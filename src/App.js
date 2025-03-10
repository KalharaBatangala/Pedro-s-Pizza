import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from "./pages/Contact";
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
         <Switch>
          <Route path='/' exact component={Home}/>
          <Route path="/menu" exact component={Menu}/>
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          
         </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
