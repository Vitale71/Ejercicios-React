import { useState } from 'react';
import './Buscador.css';

// Lista estática de lenguajes. Como no va a cambiar, la definimos fuera del componente.
const LENGUAJES = [
  'JavaScript',
  'Java',
  'Python',
  'C++',
  'TypeScript',
  'Ruby',
  'Go',
  'Swift'
];

export function Buscador() {
  // Estado para guardar lo que el usuario escribe en el input
  const [busqueda, setBusqueda] = useState('');

  // Filtramos la lista original basándonos en el texto de búsqueda.
  // Pasamos ambos textos a minúsculas para que "Java" y "java" coincidan.
  const lenguajesFiltrados = LENGUAJES.filter((lenguaje) =>
    lenguaje.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="tarjeta-buscador">
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar lenguaje..."
        className="input-buscador"
      />
      
      {/* Mostramos dinámicamente la cantidad de resultados encontrados */}
      <p className="cantidad-resultados">
        {lenguajesFiltrados.length} {lenguajesFiltrados.length === 1 ? 'resultado' : 'resultados'}
      </p>

      <ul className="lista-lenguajes">
        {/* Recorremos la lista ya filtrada para mostrar los elementos */}
        {lenguajesFiltrados.map((lenguaje) => (
          <li key={lenguaje} className="item-lenguaje">
            {lenguaje}
          </li>
        ))}
      </ul>
    </div>
  );
}