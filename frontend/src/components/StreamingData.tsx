

import { useEffect, useState } from "react";
import api from "../services/api";

// 🔹 Define the TypeScript type for a Twitch stream
interface Stream {
    id: string;
    title: string;
    user_name: string;
    viewer_count: number;
    thumbnail_url: string;
}

const StreamingData = () => {
    // 🔹 Explicitly define the type of streams as `Stream[]`
    const [streams, setStreams] = useState<Stream[]>([]);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const { data } = await api.get("/streaming");
                setStreams(data); // TypeScript now understands the data structure
            } catch {
                console.error("Error fetching streams");
            }
        };

        fetchStreams();
    }, []);

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <h2 className="text-lg font-bold">Live Streams</h2>
            <ul>
                {streams.length === 0 ? (
                    <p className="text-gray-400">No live streams available.</p>
                ) : (
                    streams.map((stream) => (
                        <li key={stream.id} className="text-gray-300">
                            <a
                                href={`https://www.twitch.tv/${stream.user_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                {stream.title} - {stream.viewer_count} viewers
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default StreamingData;
