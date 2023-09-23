import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './component/Home'
import Header from './component/Header'
import Coin from './component/Coin'
import Exchange from './component/Exchange'
import CoinDetails from './component/CoinDetails'
import Footer from './component/Footer'
 


function App() {
  return (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/coin' element={<Coin/>}/>
      <Route path='/exchange' element={<Exchange/>}/>
      <Route path='/coin/:id' element={<CoinDetails/>}/>
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
