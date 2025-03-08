import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Home() {
    const [text, setText] = useState("");
    const [audio, setAudio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [vectors, setVectors] = useState(null);

    const handleAudioUpload = async (event) => {
        const file = event.target.files[0];
        setAudio(file);
        setLoading(true);
        
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        setText(data.transcript);
        setLoading(false);
    };

    const handleTextEmbedding = async () => {
        setLoading(true);
        
        const response = await fetch("/api/embedding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        
        const data = await response.json();
        setVectors(data.vectors);
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Audio/Text Embedding</h1>
            <input type="file" accept="audio/*" onChange={handleAudioUpload} className="mb-4" />
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..." 
                className="w-full p-2 border rounded mb-4"
            />
            <Button onClick={handleTextEmbedding} disabled={!text || loading}>
                {loading ? "Processing..." : "Get Embeddings"}
            </Button>
            {vectors && (
                <pre className="mt-4 p-2 border rounded bg-gray-100">{JSON.stringify(vectors, null, 2)}</pre>
            )}
        </div>
    );
}