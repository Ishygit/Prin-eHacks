// /api/transcribe.js
export default async function handler(req, res) {
   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
   const formData = new FormData();
   formData.append("file", req.body);
   
   const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
       method: "POST",
       headers: {
           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
       },
       body: formData,
   });
   const data = await response.json();
   res.status(200).json({ transcript: data.text });
}