import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import

export default function ContactForm() {
    const [status, setStatus] = useState('Register');
    const navigate = useNavigate(); // 👈 initialize

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Registering...');

        setTimeout(() => {
            setStatus('Register Successfully!');
            setTimeout(() => {
                setStatus('Register');
                e.target.reset();
                navigate('/home');
            }, 1500);
        }, 1000);
    };
    const navigation = (() => {
        navigate('/home');
    })

    return (
        <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-indigo-800 to-purple-900">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in">

                    <h1 className="text-3xl font-bold text-white mb-2">Get In Touch</h1>
                    <p className="text-white/80">We'd love to hear from you.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">User Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300" placeholder="Enter your full name" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Address</label>
                            <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300" placeholder="Enter your email address" />
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-white mb-2">Age</label>
                            <input type="text" id="age" name="age" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300" placeholder="Enter your age" />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-white mb-2">Mobile No</label>
                            <input type="text" id="mobile" name="mobile" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300" placeholder="Enter your mobile number" />
                        </div>

                        <button
                            type="submit"
                            className={`w-full ${status === 'Register Successfully!' ? 'bg-green-500 text-white' : 'bg-white text-purple-600'} font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg`}
                            onClick={navigation}>
                            {status}
                        </button>
                        <div className="mt-6 text-center">
                            <span className="text-white/80">Do You have an account?</span>
                            <button
                                className="ml-2 text-indigo-100 underline hover:text-white transition"
                                onClick={() => navigate('/login')}
                                type="button"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}