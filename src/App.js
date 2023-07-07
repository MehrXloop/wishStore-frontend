import './App.css';
import ProductList from './components/ProductList';
import { Header } from './components/Header';
import CartList from './components/CartList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import { ProductForm } from './components/ProductForm';
import Thankyou from './components/Thankyou';


function App() {

  // const [cart, setCart] = useState([
  // ])
  
  // const addtoCart = (data) =>{
  //   setCart([...cart,data])
  //   console.log(data);
  // }
  return (
    <>
    <Router>
    <Header></Header>
    <Routes>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/Cart' element={<CartList ></CartList>}/>
      <Route path='/Detailpage/:id' element={<DetailPage/>}/>
      <Route path='/Productform' element={<ProductForm/>}/>
      <Route path='/Thankyou' element={<Thankyou/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
