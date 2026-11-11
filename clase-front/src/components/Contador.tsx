import { useState } from 'react';
import './Contador.css';

export function Contador() {
  // Declaramos el estado 'valor' (que arranca en 0) 
  // y la función 'setValor' que usaremos para modificarlo.
  const [valor, setValor] = useState(0);

  // Funciones para manejar los clicks, aplicando la lógica de límites
  const sumar = () => {
    if (valor < 10) {
      setValor(valor + 1);
    }
  };

  const restar = () => {
    if (valor > 0) {
      setValor(valor - 1);
    }
  };

  const reiniciar = () => {
    setValor(0);
  };

  return (
    <div className="tarjeta-contador">
      {/* Mostramos el valor actual del estado */}
      <h2 className="numero-contador">{valor}</h2>
      
      <div className="botones-contador">
        {/* Deshabilitamos el botón de restar si el valor es 0 */}
        <button onClick={restar} disabled={valor === 0}>-</button>
        
        {/* Deshabilitamos el botón de sumar si el valor es 10 */}
        <button onClick={sumar} disabled={valor === 10}>+</button>
        
        <button onClick={reiniciar}>Reiniciar</button>
      </div>

      {/* Renderizado condicional: Esto solo se muestra si la condición es verdadera */}
      {valor === 10 && <p className="mensaje-limite">Llegaste al máximo</p>}
    </div>
  );
}