import { Route, Routes } from "react-router";
import LayoutWrapper from "./components/layout";
import Forgot from "./Forgot";
import SignUp from "./Signup";
import Explore from "./Explore";
import Detail from "./components/Detail";
import Login from "./Login";
import CreateProduct from "./components/CreateProduct";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ExploreNo from "./ExploreNo";
import MyOrders from "./Dashboard/Orders";
import MyUserOrders from "./Dashboard/MyUserOrders";

import Admin from "./Dashboard/Admin";
import Users from "./Dashboard/Users";
import Brands from "./Dashboard/Brands";
import UsersCreate from "./Dashboard/UsersCreate";
import BrandsCreate from "./Dashboard/BrandsCreate";
import Products from "./Dashboard/Products";
import ProductsCreate from "./Dashboard/ProductsCreate";
import Coupons from "./Dashboard/Coupons";
import CouponsCreate from "./Dashboard/CouponsCreate";
import BrandsEdit from "./Dashboard/BrandsEdit";
import UsersEdit from "./Dashboard/UsersEdit";
import ProductsEdit from "./Dashboard/ProductsEdit";
import CouponsEdit from "./Dashboard/CouponsEdit";


function App() {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="/explore/detail/:id" element={<Detail />} />
        <Route path="/exploreno/detail/:id" element={<Detail />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="explore" element={<Explore />} />
        <Route path="/cart/explore" element={<Explore />} />
        <Route path="exploreno" element={<ExploreNo />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/my-orders" element={<MyUserOrders />} />

      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route index element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="brands" element={<Brands />} />
        <Route path="products" element={<Products />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="user-create" element={<UsersCreate />} />
        
        <Route path="brand-create" element={<BrandsCreate />} />
        <Route path="product-create" element={<ProductsCreate />} />
        <Route path="coupon-create" element={<CouponsCreate />} />
        <Route path="brands-edit/:id" element={<BrandsEdit />} />
        <Route path="users-edit/:id" element={<UsersEdit />} />
        <Route path="products-edit/:id" element={<ProductsEdit />} />
        <Route path="coupons-edit/:id" element={<CouponsEdit />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot" element={<Forgot />} />
    </Routes>
  );
}

export default App;
