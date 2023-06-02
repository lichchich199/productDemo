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
  return (
    <div className="App">
      <header className="App-header">
          {testWin}
      </header>
    </div>
  );
}

export default App;
