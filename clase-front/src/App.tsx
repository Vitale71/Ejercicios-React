import { Producto } from './components/Producto';
import { Contador } from './components/Contador';
import { Pregunta } from './components/Pregunta';
import { Conversor } from './components/Conversor';
import { ListaCompras } from './components/ListaCompras';
import { Buscador } from './components/Buscador';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <h1 className="titulo-tp">Trabajo Práctico React</h1>

      {/* Sección del Ejercicio 1 */}
      <section className="seccion-ejercicio">
        <h2>1. Tarjetas de producto</h2>
        <div className="contenedor-productos">
          {/* Le pasamos la prop 'oferta' solo al teclado[cite: 9] */}
          <Producto nombre="Teclado" precio={45000} stock={12} oferta={true} />
          
          {/* El Mouse y el Monitor no necesitan la prop porque es opcional */}
          <Producto nombre="Mouse" precio={18000} stock={0} />
          <Producto nombre="Monitor" precio={320000} stock={3} />
        </div>
      </section>

      <hr className="separador" />

      <section className="seccion-ejercicio">
        <h2>2. Contador con límites</h2>
        <Contador />
      </section>

      <hr className="separador" />

      <section className="seccion-ejercicio">
        <h2>3. Mostrar y ocultar</h2>
        <Pregunta 
          pregunta="¿Qué es JSX?" 
          respuesta="Una sintaxis que permite escribir estructura parecida a HTML dentro de JavaScript. Se transforma en llamadas a funciones de React." 
        />
      </section>

      <hr className="separador" />

      <section className="seccion-ejercicio">
        <h2>4. Conversor de temperatura</h2>
        <Conversor />
      </section>

      <hr className="separador" />

      {/* Sección del Ejercicio 5 */}
      <section className="seccion-ejercicio">
        <h2>5. Lista de compras</h2>
        <ListaCompras />
      </section>

      <hr className="separador" />

      {/* Sección del Ejercicio 6 */}
      <section className="seccion-ejercicio">
        <h2>6. Buscador</h2>
        <Buscador />
      </section>

    </div>
  );
}

export default App;