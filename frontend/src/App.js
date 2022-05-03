import Front from "./pages/Front";
import Login from "./pages/Login";
import './App.css';

function App() {
  return (
    // this is likely going to be a routing thing (if logged in, go to front, if not go to register/login pages) 
    // i just have front here as a placeholder to see what im doing
    
    <Front user="user1" />
    // <Login />
  );
}

export default App;
