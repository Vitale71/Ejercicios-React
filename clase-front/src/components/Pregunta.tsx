import { useState } from 'react';
import './Pregunta.css';

type PreguntaProps = {
  pregunta: string;
  respuesta: string;
};

export function Pregunta({ pregunta, respuesta }: PreguntaProps) {
  // Inicializamos el estado en 'false' para que la respuesta arranque oculta
  const [visible, setVisible] = useState(false);

  // Esta función invierte el valor actual del estado al hacer clic[cite: 5]
  const alternarVisibilidad = () => {
    setVisible(!visible); // Si es true pasa a false, si es false pasa a true[cite: 5]
  };

  return (
    <div className="tarjeta-pregunta">
      <h3 className="titulo-pregunta">{pregunta}</h3>
      
      {/* El operador ternario cambia el texto del botón según el estado 'visible' */}
      <button onClick={alternarVisibilidad} className="boton-alternar">
        {visible ? "Ocultar respuesta" : "Mostrar respuesta"}
      </button>

      {/* 
        Renderizado condicional con el operador lógico AND (&&).
        Si 'visible' es true, se renderiza el párrafo. Si es false, React lo ignora.
      */}
      {visible && (
        <p className="texto-respuesta">{respuesta}</p>
      )}
    </div>
  );
}