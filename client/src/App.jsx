import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './components/themeProvider';
import Budgets from './pages/Dashboard/Budgets';
import Expenses from './pages/Dashboard/Expenses';
import Update_Budget from './components/Update_Budget';
import AuthTabs from './pages/Auth/AuthTabs';
import { ToastProvider } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <ToastProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/api/auth/*' element={<AuthTabs />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/dashboard/budgets' element={<Budgets />} />
              <Route path='/dashboard/budgets/:bid' element={<Update_Budget />} />
              <Route path='/dashboard/expenses' element={<Expenses />} />
              {/* Additional routes can be uncommented and used as needed */}
              {/* <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/category/:slug' element={<CategoryProduct />} />
            <Route path='/search' element={<Search />} />
            <Route path='/product/:slug/:pid' element={<ProductDetails />} />
            <Route path='/dashboard' element={<PrivateRoute />} >
              <Route path='user' element={<Dashboard />} />
              <Route path='user/profile' element={<UpdateProfile />} />
              <Route path='user/orders' element={<Orders />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />} >
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/add-category' element={<CreateCategory />} />
              <Route path='admin/add-product' element={<CreateProduct />} />
              <Route path='admin/products' element={<Products />} />
              <Route path='admin/products/:slug' element={<Update_Delete_Product />} />
              <Route path='admin/users' element={<Users />} />
            </Route>
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ForgotPassword />} />
            <Route path='/reset-password-auth' element={<ChangePassword />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<Page_Not_Found />} /> */}
            </Routes>
          </BrowserRouter>
          {/* </AuthProvider> */}
        </ThemeProvider>
      </ToastProvider>
    </>
  );
}

export default App;
