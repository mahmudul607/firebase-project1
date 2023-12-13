import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Register = () => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [show, setShow] = useState(false);

    const handleLoginData = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const emailField = e.target.email.value;
        const passwordField = e.target.password.value;
        const checker = e.target.checker.checked;

        setRegisterError(null);
        if (!checker) {
            setRegisterError("Please see our terms and conditions");
            return;


        }
        if (passwordField < 6) {
            setRegisterError("Password length must be at least 6 characters")
            return;
        }
        if (!/[A-Z]/.test(passwordField)) {
            setRegisterError("At least one password character must be Uppercase");
            return;
        }
        // console.log(emailField, passwordField);
        createUserWithEmailAndPassword(auth, emailField, passwordField, name)
            .then(result => {
                console.log(result.user)
                setUser(result.user)
                setRegisterError("User Created Successfully..!")
                updateProfile(result.user,{
                    displayName: name, photoURL:"https://i.ibb.co/ygth6MP/1mh.png"
                })
                .then(() =>
                    setRegisterError("User Updated Successfully")
                )
                sendEmailVerification(result.user)
                .then(() =>{
                    alert("Please check your email and verified your account")
                })
            }

            )
            .catch(error => {
                console.error(error)
                setRegisterError("Already have an account in against this email!")

            }


            )

    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">

                        <div>
                            <h1 className="text-5xl font-bold">Register Now..!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>

                        <div>
                            {
                                (registerError && user) ? <div>
                                    <h3 className="text-green-600">{registerError}</h3>
                                </div> : <div>
                                    <h3 className="text-red-700">{registerError}</h3>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLoginData}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered" name="name" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="password"
                                        className="input input-bordered w-full relative"
                                        name="password" required />
                                    <span className="absolute right-2 top-4" onClick={() => setShow(!show)}> {show ? <FaEye /> : <FaEyeSlash />}</span>

                                </div>


                                <div>
                                    <div className="flex">
                                    <input className="mr-2" type="checkBox" name="check" id="checker" />
                                    <label htmlFor="checker" className=""> Agree With Our <a href="#">Terms and Conditions</a></label>
                                    </div>
                                    <label><p> Already have an account<Link className="text-green-800 font-extrabold ml-2" to="/login">Login</Link></p>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;