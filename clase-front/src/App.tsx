import { Producto } from './components/Producto';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <Producto nombre="Teclado" precio={45000} stock={12} />
      <Producto nombre="Mouse" precio={18000} stock={0} />
      <Producto nombre="Monitor" precio={320000} stock={3} />
    </div>
  );
}

export default App;