// /api/embedding.js
export default async function handler(req, res) {
   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
   
   const { text } = req.body;
   const response = await fetch("https://api.openai.com/v1/embeddings", {
       method: "POST",
       headers: {
           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
           "Content-Type": "application/json",
       },
       body: JSON.stringify({ model: "text-embedding-3-large", input: text }),
   });
   const data = await response.json();
   res.status(200).json({ vectors: data.data });
}