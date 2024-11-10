import './App.css';
import { Form } from './components/Form';
import { Info } from './components/Info';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Waitlist Manager</h1>
        <Info />
        <Form />
      </header>
    </div>
  );
}

export default App;
