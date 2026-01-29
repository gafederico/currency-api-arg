import { useState } from 'react';

// Interface ajustada al JSON real de Python
interface AverageResponse {
  average: number;
  days: number; // Corregido: antes era total_days
  type: string;
}

export function HistoricalAverage() {
  const [dateStart, setDateStart] = useState<string>('2025-11-01');
  const [dateEnd, setDateEnd] = useState<string>('2025-11-30');
  const [data, setData] = useState<AverageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/average?dateStart=${dateStart}&dateEnd=${dateEnd}&type=oficial`
      );
      if (!response.ok) throw new Error('Error en API');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert('Error al buscar promedio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📅 Promedio Histórico</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1rem' }}>
        <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
        <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
      </div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular'}
      </button>

      {data && (
        <div style={{ marginTop: '20px' }}>
          <p>Promedio: <strong>${data.average}</strong></p>
          <p>Días analizados: {data.days}</p>
        </div>
      )}
    </div>
  );
}