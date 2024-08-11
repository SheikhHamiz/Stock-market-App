import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MarketOverview from './components/marketOverview/marketOverview';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ticker from './components/marketOverview/ticker';
import BuyStock from './components/marketOverview/boystock';
import Login from './components/login/login';
import { useAuth } from './security/auth';
import { AuthProvider } from './security/auth';
import Portfolio from './components/marketOverview/portfolio';
import Header from './components/marketOverview/header';
import SellStock from './components/marketOverview/sellStock';


const AuthenticatedRoute = ({children}) => {
  const authContext = useAuth();
  if(authContext.authenticated !== false) {
    return children;
  }
  return <Navigate to={"/login"} />
}


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route element={<MarketOverview/>} path='/'/>
          <Route element={<Ticker/>} path='/ticker/:tickerName'/>
          <Route element={
              <AuthenticatedRoute>
                <BuyStock/>
              </AuthenticatedRoute>
              } path='/buystock/:tickerName'/>
          <Route element={
              <AuthenticatedRoute>
                <SellStock/>
              </AuthenticatedRoute>
              } path='/sellstock/:tickerName'/>
          <Route element={
              <AuthenticatedRoute>
                <Portfolio/>
              </AuthenticatedRoute>
              } path='/portfolio'/>
          <Route element ={<Login/>} path='/login'/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
