import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesPages from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <RoutesPages></RoutesPages>
    </BrowserRouter>
  );
}

export default App;
