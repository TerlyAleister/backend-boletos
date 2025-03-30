import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Eventos from "./pages/Eventos";
import Admin from "./pages/Admin";
import axios from "axios";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Eventos} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}


function App() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/eventos").then((res) => {
      setEventos(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Eventos Disponibles</h1>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            {evento.nombre} - {evento.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
