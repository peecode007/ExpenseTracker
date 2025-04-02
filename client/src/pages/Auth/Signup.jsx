import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API_URI from '@/config';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        const host = API_URI;
        try {
            const response = await fetch(`${host}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });
            const data = await response.json();
            // console.log(data);

            if (data.success) {
                toast.success(data.message);
                // console.log(data)
                // localStorage.setItem('token', data.authtoken);
                navigate('api/auth/login');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            console.error(error.message);

        }
    };
    const handleSubmit = () => {

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Signup</CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">Create your account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                    <div>
                        <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </form>

            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>Signup</Button>
            </CardFooter>
        </Card>
    );
};

export default Signup;
