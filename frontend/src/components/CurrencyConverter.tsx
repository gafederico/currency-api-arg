import { useState } from 'react';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>('usd');
  const [to, setTo] = useState<string>('ars');
  const [result, setResult] = useState<string>('');

  const convert = async () => {
    const res = await fetch(`http://127.0.0.1:8000/convert?amount=${amount}&origin=${from}&target=${to}&dollar_type=oficial`);
    const data = await res.json();
    setResult(data.to); // Tu API devuelve "to": "XXXX ARS"
  };

  return (
    <div className="card">
      <h2>🔄 Conversor Universal</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} 
          placeholder="Monto"
        />
        <div style={{ display: 'flex', gap: '5px' }}>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="usd">USD</option>
            <option value="ars">ARS</option>
            <option value="eur">EUR</option>
          </select>
          <span>⮕</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="ars">ARS</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <button onClick={convert}>Convertir</button>
      </div>
      {result && <h3 style={{ marginTop: '20px' }}>{result}</h3>}
    </div>
  );
}