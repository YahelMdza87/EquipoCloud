import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="card">
        <h1>DomotiCloud</h1>
        <button onClick={async() => {
          const res = await fetch(`${URL}`);
          const data = await res.json();
          alert(JSON.stringify(data));
        }}
        >
          Dame click para recibir respuesta de servidor
        </button>
      </div>
  )
}

export default App
