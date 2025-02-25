


import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate("/");
        } catch {
            toast.error("Invalid credentials!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0B0B1E] text-white p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-3xl" />
                <div className="relative bg-[#1a1a3a] p-8 rounded-2xl border border-purple-500/20 shadow-xl backdrop-blur-xl">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent"
                    >
                        Welcome Back
                    </motion.h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="bg-[#0B0B1E]/50 rounded-xl p-3 border border-purple-500/20 focus-within:border-purple-500/50 transition-colors">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-purple-400 mr-3" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-transparent w-full outline-none placeholder:text-gray-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="bg-[#0B0B1E]/50 rounded-xl p-3 border border-purple-500/20 focus-within:border-purple-500/50 transition-colors">
                                <div className="flex items-center">
                                    <Lock className="w-5 h-5 text-purple-400 mr-3" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-transparent w-full outline-none placeholder:text-gray-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-[1.02] transition-all duration-300 font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
