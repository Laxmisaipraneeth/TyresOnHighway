import { Route,Routes ,BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Reports from './components/Reports'; 
import User from './components/User';
import TollLogin from './components/TollLogin';
import Tollgate from './components/Tollgate';
import DealerLogin from './components/DealerLogin';
import DetailedReports from './components/DetailedReports';
import DealerReports from './components/DealerReports';
function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path = '/reports' element={<Reports/>}/>
        <Route path = '/tollLogin' element={<TollLogin/>}/>
        <Route path = '/uploads' element={<Tollgate/>}/>
        <Route path = '/user' element={<User/>}/>
        <Route path = '/dealer' element={<DealerLogin/>}/>
        <Route path = '/dealerReports' element={<DealerReports/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
