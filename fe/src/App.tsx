import { useEffect } from 'react';
import './App.css';
interface Person {
  lastName: string,
  firstName: string,
  age?: number
}

type window = 'open' | 'close'

function App() {
  var test : Person = {lastName: 'Cao', firstName: 'Trọng'}
  var testWin : window = 'close'
  useEffect(() => {
    const data = async () => {
      await fetch('http://localhost:5000/api/products').then((data) => data.json()).then(data => console.log('data', data))
    }
    data()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
          {testWin}
      </header>
    </div>
  );
}

export default App;
