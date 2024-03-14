import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// import { useHistory } from 'react-router-dom'; 
import '../App.css';

export default function Login() {
    const navigate = useNavigate();
    function handleSuccess(credentialResponse) {
        console.log(credentialResponse);
        navigate('/principal')
    }
    function handleError() {
        console.log("Login failed");
      }
    return(
        
        <div>
            <div className="card">
                <h1 className="title-login">Iniciar sesión</h1>
                <div className="login-email-password">
                    <div>
                        <h3 className="title-data-login">Correo:</h3>
                        <input className='input-login' type="text" placeholder='Correo...' />
                    </div>
                    <div>
                        <h3 className="title-data-login">Password:</h3>
                        <input className='input-login' type="text" placeholder='Password...' />
                    </div>
                    <a href="" style={{ color: "#BB98FF" }}>¿No tienes cuenta? Crafteate una.</a>
                </div>
                <div style={{ border: "solid 1px #BB98FF", marginTop: "20%" }}></div><br />
                <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;
            </div>
            
        </div>
    );
}