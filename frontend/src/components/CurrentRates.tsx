import { useEffect, useState } from 'react';

// Definimos la estructura de CADA tarjeta de dólar
interface DollarRate {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export function CurrentRates() {
  // Ahora el estado es un ARRAY (lista) de DollarRate
  const [rates, setRates] = useState<DollarRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Pedimos "type=usd" para que traiga TODOS los dólares
    fetch('http://127.0.0.1:8000/current?type=usd')
      .then(res => res.json())
      .then(data => {
        setRates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando cotizaciones...</p>;

  return (
    <div className="card-container">
      <h2>💵 Cotizaciones del Día</h2>
      
      <div className="rates-grid">
        
        {rates.map((rate) => (
          <div 
            key={rate.casa} 
            style={{ 
              border: '1px solid #444', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#2a2a2a',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            <h3 style={{ color: '#646cff', marginBottom: '10px' }}>{rate.nombre}</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
              <div>
                <span style={{ display: 'block', opacity: 0.7 }}>Compra</span>
                <strong style={{ fontSize: '1.2em' }}>${rate.compra}</strong>
              </div>
              <div>
                <span style={{ display: 'block', opacity: 0.7 }}>Venta</span>
                <strong style={{ fontSize: '1.2em' }}>${rate.venta}</strong>
              </div>
            </div>
            
            <small style={{ display: 'block', marginTop: '10px', fontSize: '0.7em', color: '#888' }}>
              Actualizado: {new Date(rate.fechaActualizacion).toLocaleTimeString()}
            </small>
          </div>
        ))}
      
      </div>
    </div>
  );
}