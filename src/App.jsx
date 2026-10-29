import  { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Home,Auth,Orders,Menu } from "./pages"
import Header from "./components/shared/Header";
import BottomNav from "./components/shared/BottomNav";
import CartProvider from "./context/CartProvider";
import OrdersProvider from "./context/OrdersProvider";

function App() {
  

  return (
    <>
<OrdersProvider>
<CartProvider>
<Router>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}  />
    <Route path="/auth" element={<Auth/>}  />
    <Route path="/orders" element={<Orders/>}  />
    <Route path="/menu" element={<Menu/>}  />

    </Routes>
  <BottomNav/>
    </Router>
</CartProvider>
</OrdersProvider>

    </>
  )
}

export default App
