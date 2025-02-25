

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "../services/api"
import { Loader2 } from 'lucide-react'

interface Stream {
    id: string
    title: string
    viewer_count: number
    thumbnail_url: string
    user_name: string
}

const TwitchStreams = () => {
    const [streams, setStreams] = useState<Stream[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const { data } = await api.get("/twitch")
                setStreams(data)
            } catch (error) {
                console.error("Error fetching Twitch streams:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStreams()
    }, [])

    return (
        <div className="rounded-xl backdrop-blur-sm bg-black/20 p-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {streams.map((stream, index) => (
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={stream.id}
                            href={`https://www.twitch.tv/${stream.user_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-xl overflow-hidden bg-black/30 hover:bg-black/40 transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <img
                                    src={stream.thumbnail_url.replace("{width}", "320").replace("{height}", "180")}

                                    alt={stream.title}
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-xs font-medium">
                                    {stream.viewer_count.toLocaleString()} viewers
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg line-clamp-1 group-hover:text-purple-400 transition-colors">
                                    {stream.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Streaming: {stream.user_name}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TwitchStreams
