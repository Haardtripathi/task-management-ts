
"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0B0B1E] text-white p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        404
                    </h1>
                    <p className="text-2xl text-gray-400">Page Not Found</p>
                </motion.div>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                        Return Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default NotFound

