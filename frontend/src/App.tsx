import './App.css';
import Button from './Button';

function App() {
  return (
    <div className="App">
      <Button onClick={() => fetch('http://localhost:8001/get_IPlocation').then(res => res.json()).then(console.log)} label="Get IP Location" />
    </div>
  );
}

export default App;
