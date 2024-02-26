import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/users";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="card">
        <h1 className="title-login">Iniciar sesión</h1>
        {/* <button onClick={async() => {
          const res = await fetch(`${URL}`);
          const data = await res.json();
          alert(JSON.stringify(data));
        }}
        >
          Dame click para recibir respuesta de servidor
        </button> */}
        <div className="login-email-password">
          <div>
            <h2 className="title-data-login">Correo:</h2>
            <input className='input-login' type="text" placeholder='Correo...'/>
          </div>
          <div>
            <h2 className="title-data-login">Password:</h2>
            <input className='input-login' type="text" placeholder='Password...'/>
          </div>
          <a href="" style={{color: "rgb(49, 49, 49)"}}>¿No tienes cuenta? Crafteate una.</a>
        </div>

      </div>
  )
}

export default App
