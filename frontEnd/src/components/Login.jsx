import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    function handleSuccess() {
    }
    function handleError() {
        console.log("Login failed");
      }
    return(
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        </div>
    );
}