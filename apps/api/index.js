import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Proxy simples para MyMemory (GET) e para compatibilidade com o frontend usamos POST
app.post("/api/translate", async (req, res) => {
  try {
    const { q, source = "auto", target = "pt", format = "text" } = req.body;

    // MyMemory expects GET with q and langpair=en|pt
    // If source is 'auto', we can default to 'en' for many cases; better: use provided source if not 'auto'
    const src = source === "auto" ? "en" : source;
    const langpair = `${src}|${target}`;

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${encodeURIComponent(langpair)}`;

    const upstream = await fetch(url);
    const text = await upstream.text();

    // try parse upstream JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(502).json({ ok: false, note: "Upstream returned non-JSON", body: text });
    }

    // MyMemory returns translatedText in response.responseData.translatedText
    const translatedText = data?.responseData?.translatedText ?? "";

    return res.json({ translatedText, raw: data });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
