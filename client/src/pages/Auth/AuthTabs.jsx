import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import { ModeToggle } from '@/components/ModeToggle';

const AuthTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.includes('login') ? 'login' : 'signup';

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url(/bg.jpg)' }}>

      <div className="w-full max-w-md p-8  rounded shadow-lg bg-cover" style={{ backgroundImage: 'url(/bg.jpg)' }}>
        <h1 className="text-2xl font-semibold mb-6 text-center bg-black">Authentication</h1>
        <Tabs defaultValue={currentTab} value={currentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup" onClick={() => navigate('/api/auth/signup')} className="text-center">Signup</TabsTrigger>
            <TabsTrigger value="login" onClick={() => navigate('/api/auth/login')} className="text-center">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
          <TabsContent value="login">
            <Login />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthTabs;
