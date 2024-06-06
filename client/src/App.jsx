import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './components/themeProvider';
import Budgets from './pages/Dashboard/Budgets';
import Expenses from './pages/Dashboard/Expenses';
import Update_Budget from './components/Update_Budget';
import AuthTabs from './pages/Auth/AuthTabs';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/api/auth/*' element={<AuthTabs />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/budgets' element={<Budgets />} />
            <Route path='/dashboard/budgets/:bid' element={<Update_Budget />} />
            <Route path='/dashboard/expenses' element={<Expenses />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
