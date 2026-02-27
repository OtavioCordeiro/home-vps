import { useEffect, useState } from 'react'
import './App.css'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/v1/WeatherForecast', {
      headers: { accept: 'text/plain' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: WeatherForecast[]) => {
        setForecasts(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Weather Forecast</h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {!loading && !error && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
              <th style={th}>Date</th>
              <th style={th}>Temp (°C)</th>
              <th style={th}>Temp (°F)</th>
              <th style={th}>Summary</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map((f) => (
              <tr key={f.date} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={td}>{new Date(f.date).toLocaleDateString('pt-BR')}</td>
                <td style={td}>{f.temperatureC} °C</td>
                <td style={td}>{f.temperatureF} °F</td>
                <td style={td}>{f.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const th: React.CSSProperties = {
  padding: '10px 16px',
  textAlign: 'left',
  fontWeight: 600,
}

const td: React.CSSProperties = {
  padding: '10px 16px',
}

export default App
