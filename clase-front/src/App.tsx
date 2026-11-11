import { Producto } from './components/Producto';
import { Contador } from './components/Contador';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <h1 className="titulo-tp">Trabajo Práctico React</h1>

      {/* Línea divisoria */}
      <hr className="separador" />

      {/* Sección del Ejercicio 1 */}
      <section className="seccion-ejercicio">
        <h2>1. Tarjetas de producto</h2>
        <div className="contenedor-productos">
          <Producto nombre="Teclado" precio={45000} stock={12} />
          <Producto nombre="Mouse" precio={18000} stock={0} />
          <Producto nombre="Monitor" precio={320000} stock={3} />
        </div>
      </section>

      {/* Línea divisoria */}
      <hr className="separador" />

      {/* Sección del Ejercicio 2 */}
      <section className="seccion-ejercicio">
        <h2>2. Contador con límites</h2>
        <Contador />
      </section>
      
    </div>
  );
}

export default App;