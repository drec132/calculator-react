import './App.css';
import CalculatorBody from './components/CalculatorBody/CalculatorBody';
function App() {
  return (
    <div className="App">
      <div style={{position: "relative", width: "320px", height: "480px"}}> 
        <CalculatorBody />
      </div>
    </div>
  );
}

export default App;
