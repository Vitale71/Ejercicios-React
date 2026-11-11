import { useState } from 'react';
import './Conversor.css';

export function Conversor() {
  // Guardamos el valor del input como texto, inicializado vacío
  const [celsius, setCelsius] = useState('');

  // Convertimos el texto a número para poder calcular[cite: 6]
  const celsiusNum = Number(celsius);

  // Calculamos Fahrenheit directamente a partir de Celsius en cada renderizado[cite: 6]
  // Fórmula: F = C * 9/5 + 32[cite: 6]
  const fahrenheit = (celsiusNum * 9) / 5 + 32;

  return (
    <div className="tarjeta-conversor">
      <input
        type="number"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
        className="input-celsius"
        placeholder="Ingrese grados °C"
      />
      
      {/* 
        Usamos una validación para mostrar el resultado 
        solo si el usuario escribió algo (celsius !== '') 
      */}
      {celsius !== '' && (
        <>
          {/* toFixed(1) nos asegura que siempre muestre un decimal (ej: 95.0) */}
          <h2 className="resultado-fahrenheit">
            {fahrenheit.toFixed(1)} °F
          </h2>
          
          {/* Si la temperatura supera los 30 °C, mostramos el mensaje extra[cite: 6] */}
          {celsiusNum > 29 && (
            <p className="mensaje-calor">Hace calor</p>
          )}
        </>
      )}
    </div>
  );
}