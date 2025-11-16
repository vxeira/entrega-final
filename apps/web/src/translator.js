export async function translateText(text, target="pt") {
  // chamamos o proxy local /api/translate (Vite redireciona para http://localhost:3000)
  const res = await fetch(`/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target,
      format: "text"
    })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`API error: ${res.status} ${txt}`)
  }
  const data = await res.json()
  return data.translatedText
}
