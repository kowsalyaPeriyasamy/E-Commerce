import Header from "./common/header/Header";
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Pages from "./pages/Pages";
import Data from "./components/Data";
import { useState } from "react";
import Cart from "./common/Cart/Cart";
import Sdata from "./components/shops/Sdata";
import Footer from "./common/footer/Footer";
function App() {
  //Step 1 : fetch daata from database
   const { productItems}= Data
   const { shopItems}= Sdata
   const [cartItem, setCartItem] = useState([])

  const addToCart =(product)=>{
    const productExist = cartItem.find((item) => item.id === product.id)
     
    if(productExist) {
      setCartItem(cartItem.map((item) => 
      (item.id === product.id?{...productExist ,qty: productExist.qty+1}
       : item )))
     } else{
       setCartItem([...cartItem,{ ...product,qty:1}])
     }
  }

  const decreaseQty=(product) =>{
    const productExist = cartItem.find((item) => item.id === product.id)
     if(productExist.qty ===1){
      setCartItem(cartItem.filter((item)=> item.id !== product.id))
     }else{
      setCartItem(cartItem.map((item) =>(item.id === product.id ? {...productExist,qty : productExist.qty-1 } : item) ))
     }
  } 
  return (
    <> 
     <Router>
       <Header cartItem={cartItem} />
       <Switch>
         <Route path='/' exact>
           <Pages productItems ={productItems} addToCart={addToCart} shopItems={shopItems}/>
         </Route>
         <Route path='/cart' exact>
           <Cart cartItem ={cartItem} addToCart={addToCart} decreaseQty={decreaseQty}/>
         </Route>
       </Switch>
       <Footer />
     </Router>
    </>
  );
}

export default App;
