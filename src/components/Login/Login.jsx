import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const emailRef = useRef(null);
    console.log(user)



    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => 
                setUser(result.user)
            )
            .catch(error => 
                console.error(error.message)
            );
    };

    const handleLogOut = () => {
        signOut(auth)
        .then(result =>
            {setUser(null);
            console.log(result)
            setLoginError("Logged Out Successfully");
        })
            .catch(error =>{
                console.log(error);
            })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;
        setLoginError(null)
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>
            {
            if(result.user.emailVerified){
                setLoginError("Your are logged in successfully");

            }
            else{
                alert("Please check your email and verify account");
                return;
                
            }
            console.log(result.user)
            setUser(result.user)
            setLoginError("Your are logged in successfully");
        
        }

            )
        .catch(error => {
            console.log(error)
            setLoginError("Please Check Your Email and Password")}
        );

    }
    const handleForgotPassword = () =>{
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        setLoginError(null)
        sendPasswordResetEmail(auth, email)
        .then(() => alert("Please Check Your Email"))
        .catch(() =>
           {
            setLoginError("Please Use a valid email address")}
            )

    }



    return (
        <div className="text-center pt-24">
            <div className="md:max-w-3/6 mx-auto mb-4">
                <div>
                    {
                        (loginError & user )? <div>
                            <h3 className="text-red-700">{loginError}</h3>
                        </div> : <div>
                             <h3 className="text-green-700">{loginError}</h3>
                        </div>
                    }
                </div>
                <form onSubmit={handleLogin} >
                    
                    <input 
                    className="border rounded border-black py-2 px-4 mb-4 w-2/6"
                     type="email"
                     ref={emailRef}
                      name="loginEmail" 
                      id="email" />
                    <br />
                    <input className="border rounded border-black py-2 px-4 w-2/6" type="password" name="loginPassword" id="password" />
                    <br />
                    <div className=" w-2/6 mx-auto">
                   <div className="flex justify-between">
                   <label className="label " >
                                    <a href="#" className="label-text-alt link link-hover" onClick={handleForgotPassword}>Forgot password?</a>
                                </label>
                    <label>
                        <p> If You New Please<Link className="text-green-800 font-extrabold" to="/register"> SignUp</Link></p>
                    </label>
                   </div>
                    <br />
                    <input className="btn btn-outline btn-accent" type="submit" value="Submit" />
                    </div>
                    
              
                </form>
            </div>
            {user && <div>
                    <h2>{user.displayName}</h2>
                    <h4>Email Address:{user.email}</h4>
                </div>
            }
            {
                user? <button className="btn btn-error" onClick={handleLogOut}>SingOut</button>:
                <button className="btn btn-primary" onClick={handleGoogleLogin}>Google</button>
            }

        </div>
    );
};

export default Login;