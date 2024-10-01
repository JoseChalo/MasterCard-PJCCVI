import React from 'react';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;

/*function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/tarjetas')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const addItem = () => {
    /*
        Tomen como ejemplo pero no es correcto ya que no esta echo 
        para las tablas de nuestra base de datos

    axios.post('http://localhost:3001/items', { name: newItem })
      .then(() => {
        setItems([...items, { name: newItem }]);
        setNewItem('');
      })
      .catch(error => console.error('Error al agregar el ítem:', error));
    */
 // };
/*
  return (
    <div>
      <h1>Lista de Ítems</h1>
      <ul>
        {items.map(item => (
          <li key={item.numero}>Titular:  {item.titular}, Tipo: {item.tipo}, fecha Vencimineto: {item.fecha_venc}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Agregar Ítem</button>
    </div>
  );
}

export default App;
*/