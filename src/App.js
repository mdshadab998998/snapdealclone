import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage';
import { Home } from './Pages/Home';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Components/Auth/Authprovider';
import store from './store';
import Footer from './Components/Footer';
import { Provider } from 'react-redux';
import Products from './Pages/Product';
import ProductDetails from './Pages/singleproduct';
import CartPage from './Pages/Cart';


function App() {
  return (
    <Provider store={store}>


    <BrowserRouter>
    <AuthProvider>

    <div className=' fixed w-[100%] top-0 z-10'>    <Navbar />
</div>
<div className='mt-[110px]'>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />

    </Routes>
    <Footer />
    </div>
    </AuthProvider>

    </BrowserRouter>
        </Provider>


  );
}

export default App;
