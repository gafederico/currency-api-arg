import { useState } from 'react';
import './App.css';
import { CurrentRates } from './components/CurrentRates';
import { HistoricalAverage } from './components/HistoricalAverage';
import { CurrencyConverter } from './components/CurrencyConverter';

function App() {
  // Estado para saber qué pestaña está activa
  const [activeTab, setActiveTab] = useState<'current' | 'average' | 'convert'>('current');

  return (
    <div className="container">
      <h1>Dólar API Fullstack</h1>
      
      {/* Botonera de Navegación */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setActiveTab('current')} disabled={activeTab === 'current'}>
          Cotización Hoy
        </button>
        <button onClick={() => setActiveTab('average')} disabled={activeTab === 'average'}>
          Histórico
        </button>
        <button onClick={() => setActiveTab('convert')} disabled={activeTab === 'convert'}>
          Conversor
        </button>
      </div>

      {/* Renderizado Condicional */}
      <div className="content">
        {activeTab === 'current' && <CurrentRates />}
        {activeTab === 'average' && <HistoricalAverage />}
        {activeTab === 'convert' && <CurrencyConverter />}
      </div>
    </div>
  );
}

export default App;