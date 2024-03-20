import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
// import { useHistory } from 'react-router-dom'; 
import '../App.css';

export default function Login({handleLogin}) {
    
    function enviarDatosUsuario(userData,userEmail) {
        console.log("este es tu correo"+ userEmail)
        fetch('https://domoticloud.onrender.com/usu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usu: userData ,
                correo: userEmail
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Hacer algo con la respuesta del servidor si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const navigate = useNavigate();
    //Funcion por si el login se hace correctamente
    function handleSuccess(credentialResponse) {
        //Decodifica la key del usuario por google y obtiene solamente el nombre  y el gmail.
        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        const userData = {
            'name' : credentialResponseDecoded.name,
            'email' : credentialResponseDecoded.email,
            'image' : credentialResponseDecoded.picture
        };
        console.log(userData);
        //Llamamos este metodo ubicado en App.js para pasarle los parametros de email y nombre.
        handleLogin(userData);
        enviarDatosUsuario(userData.name,userData.email)
        navigate('/principal')
    }
    function handleError() {
        console.log("Login failed");
      }
    return(
        
        <body className="body-login">
            <div className="card">
                <h1 className="title-login">Iniciar sesión</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Correo:</h3>
                        <input className='input-login' type="text" placeholder='Correo...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Password:</h3>
                        <input className='input-login' style={{marginBottom: "5%"}} type="text" placeholder='Password...' />
                    </div>
                    <div>
                        <a href="" >¿No tienes cuenta? Crafteate una.</a>
                    </div>
                </div>
                <div style={{ border: "solid 1px #BB98FF", marginTop:"4%"}}></div>
                <div style={{marginTop:"5%", display:"flex", justifyContent:"center"}}>
                    <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                </div>
            </div>
            
        </body>
    );
}