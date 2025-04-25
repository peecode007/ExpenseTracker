import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API_URI from '@/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    // const host = import.meta.env.VITE_API_URI;
    const host = API_URI;
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include credentials to allow cookies
      });

      const data = await response.json();
      // console.log(data);

      if (data.success) {
        toast.success(data.message);
        navigate('/dashboard')
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(`Error during login: ${error.message}`);
      console.error('Error during login:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Login</CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-300">Login to your account here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
