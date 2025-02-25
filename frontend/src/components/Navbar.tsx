


// import { Link, useNavigate } from "react-router-dom"
// import { useAuthStore } from "../store/useAuthStore"
// import { LogOut } from "lucide-react"

// const Navbar = () => {
//     const { token, logout } = useAuthStore()
//     const navigate = useNavigate()

//     return (
//         <nav className="fixed w-full z-50 backdrop-blur-xl bg-[#0B0B1E]/80 border-b border-purple-500/10">
//             <div className="max-w-7xl mx-auto px-6 py-4">
//                 <div className="flex justify-between items-center">
//                     <Link
//                         to="/"
//                         className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
//                     >
//                         Task Manager
//                     </Link>

//                     <div className="flex items-center space-x-8">
//                         {token ? (
//                             <>
//                                 <Link
//                                     to="/"
//                                     className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
//                                 >
//                                     Home
//                                 </Link>
//                                 <Link
//                                     to="/streams"
//                                     className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
//                                 >
//                                     Streams
//                                 </Link>
//                                 <button
//                                     onClick={() => {
//                                         logout()
//                                         navigate("/login")
//                                     }}
//                                     className="flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/25"
//                                 >
//                                     <LogOut size={18} className="mr-2" />
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
//                                 >
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="fixed w-full z-50 backdrop-blur-xl bg-[#0B0B1E]/80 border-b border-purple-500/10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                        Task Manager
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 hover:text-white"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {token ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/streams"
                                    className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
                                >
                                    Streams
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                    }}
                                    className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/25"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-purple-500/10 space-y-4">
                        {token ? (
                            <>
                                <Link
                                    to="/"
                                    className="block py-2 text-gray-300 hover:text-white"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/streams"
                                    className="block py-2 text-gray-300 hover:text-white"
                                    onClick={toggleMenu}
                                >
                                    Streams
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                        toggleMenu();
                                    }}
                                    className="flex items-center w-full py-2 mt-2 text-white"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block py-2 text-gray-300 hover:text-white"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block py-2 text-gray-300 hover:text-white"
                                    onClick={toggleMenu}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;