import './Producto.css';

// 1. Definimos la estructura y los tipos de datos que va a recibir el componente
type ProductoProps = {
  nombre: string;
  precio: number;
  stock: number;
};

// 2. Le asignamos ese tipo a las props desestructuradas
export function Producto({ nombre, precio, stock }: ProductoProps) {
  return (
    <div className="tarjeta-producto">
      <h3 className="titulo-producto">{nombre}</h3>
      <p className="precio-producto">${precio}</p>
      
      <p className="stock-producto">
        {stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}
      </p>
    </div>
  );
}