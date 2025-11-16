import React, { useState } from "react"
import { translateText } from "./translator"

export default function App() {
  const [text, setText] = useState("")
  const [to, setTo] = useState("pt")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const r = await translateText(text, to)
      setResult(r)
    } catch (e) {
      setResult("Erro: " + (e.message || e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Translator PWA</h1>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} cols={60}/>
      <div style={{ marginTop: 8 }}>
        <label>Dest: </label>
        <select value={to} onChange={(e)=>setTo(e.target.value)}>
          <option value="en">English</option>
          <option value="pt">Português</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <button onClick={handleTranslate} disabled={loading} style={{ marginLeft: 8 }}>
          {loading ? "Traduzindo..." : "Traduzir"}
        </button>
      </div>
      <h3>Resultado</h3>
      <pre data-testid="translation-result">{result}</pre>
      <div data-testid="api-ok" style={{display:"none"}}>ok</div>
    </div>
  )
}
