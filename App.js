import './App.css';
import useCount from './hooks/usecount';


function App() {
const [value,add,substract] = useCount(10); 
return (
    <div className="App">
     <h2>Value:{value}</h2>
      <button onClick={add}>add</button>
      <button onClick={substract}>substract</button>
    </div>
  );
}

export default App;
