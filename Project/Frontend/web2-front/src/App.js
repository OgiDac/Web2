import logo from './logo.svg';
import './App.css';
import Register from './components/Register/Register';
import Container from './components/Container/Container';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <><Navbar /><div className="container">
      <Container />
    </div></>
  );
}

export default App;
