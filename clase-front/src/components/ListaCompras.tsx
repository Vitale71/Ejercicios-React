import { useState } from 'react';
import './ListaCompras.css';

// 1. Definimos la estructura de cada producto en la lista
type ItemCompra = {
  id: number;
  nombre: string;
};

export function ListaCompras() {
  // 2. Estado para la lista. Le indicamos a TypeScript que es un array de ItemCompra (<ItemCompra[]>)
  const [items, setItems] = useState<ItemCompra[]>([]);
  
  // 3. Estado para controlar el texto que el usuario escribe en el input
  const [nuevoItem, setNuevoItem] = useState('');

  const agregarItem = () => {
    // Evitamos agregar ítems vacíos comprobando si al quitar los espacios (.trim()) queda algo
    if (nuevoItem.trim() === '') return;

    // Creamos el objeto del nuevo ítem
    const item = {
      id: Date.now(), // Usamos la fecha exacta en milisegundos para tener un ID único e irrepetible[cite: 7]
      nombre: nuevoItem
    };

    // Actualizamos la lista usando el "Spread Operator" (...)[cite: 7]
    // Esto significa: "Creá un array nuevo, volcá todos los ítems anteriores, y agregá el nuevo al final"[cite: 7]
    setItems([...items, item]);
    
    // Limpiamos el input para que el usuario pueda escribir el siguiente producto
    setNuevoItem('');
  };

  const eliminarItem = (id: number) => {
    // El método .filter() crea un array nuevo dejando pasar solo los elementos que cumplan la condición[cite: 7]
    // En este caso: conservar todos los ítems cuyo ID sea distinto al que queremos borrar[cite: 7]
    const listaActualizada = items.filter(i => i.id !== id);
    setItems(listaActualizada);
  };

  return (
    <div className="tarjeta-lista">
      <div className="controles-lista">
        <input
          type="text"
          value={nuevoItem}
          onChange={(e) => setNuevoItem(e.target.value)}
          placeholder="Ej: yerba"
          className="input-lista"
        />
        <button onClick={agregarItem} className="boton-agregar">
          Agregar
        </button>
      </div>

      {/* Renderizado condicional: comprobamos si el array está vacío[cite: 7] */}
      {items.length === 0 ? (
        <p className="mensaje-vacio">No hay nada para comprar</p>
      ) : (
        <ul className="lista-items">
          {/* El método .map() recorre el array y transforma cada objeto en código HTML (JSX) */}
          {items.map(item => (
            // IMPORTANTE: En React, cada elemento generado por un .map() necesita una prop 'key' única.
            // Para eso usamos el ID que generamos antes.
            <li key={item.id} className="item-compra">
              <span className="nombre-item">{item.nombre}</span>
              <button 
                onClick={() => eliminarItem(item.id)} 
                className="boton-eliminar"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}