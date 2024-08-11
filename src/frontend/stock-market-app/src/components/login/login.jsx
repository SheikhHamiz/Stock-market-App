import { useState } from "react"
import { useAuth } from "../../security/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const authContext = useAuth();
    const login = authContext.login;
    const register = authContext.signUp;
    const [userLogin, setUserLogin] = useState(false);
    const [userRegister, setUserRegister] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();


    const checkPasswordsMatch = () => {
        return password === checkPassword || password === "" || checkPassword ==="";
    }

    const updateValue = (e,callback) => {
        callback(e.target.value);
    }
    const checkAllInputs = () => {
        if(userRegister)
            if(username.length >= 8 && (password.length >= 8 && password === checkPassword)) 
            return false;
        if(userLogin)
            if(username.length >= 8 && (password.length >= 8)) 
                return false;
        return true;
    }

    return (
        <form className="container"
        onSubmit={ async (e)=>  {
            e.preventDefault();
            console.log(userRegister);
            console.log(userLogin);
            if(userRegister) {
                if( register(username, password)) {
                    console.log("hi");
                    navigate("/portfolio");
                }
            } else {
                if(login(username, password)) {
                    console.log("hello");
                    navigate("/portfolio");
                } else {
                    setErrMsg("Wrong credentials");
                }
                
            }
            
        }}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp"
                value={username} onChange={(e)=> updateValue(e,setUsername)}
                />
                <div class="form-text text-danger">
                    {
                    !(username.length>=8 || username === "") 
                        &&  
                    "username should have at least 8 characters"
                    }
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" 
                value={password} onChange={(e) => updateValue(e,setpassword)}
                />
                <div class="form-text text-danger">
                    {
                    !(password.length >= 8 || password ==="" )
                    &&  
                    "Passwords should at least 8 characters"
                }
                </div>
            </div>
            {userRegister && <div className="mb-3">
                <label htmlFor="reTypePassword" className="form-label">Retype Password</label>
                <input type="password" className="form-control" id="reTypePassword" value={checkPassword}
                onChange={(e) => updateValue(e,setCheckPassword)}
                />
                <div class="form-text text-danger">{!checkPasswordsMatch() &&  "Passwords don't match"}</div>
            </div>}

            <div className="mb-3">
                <div class="form-text text-danger">{errMsg}</div>
                {userRegister &&<div className="form-text" onClick={()=> {
                    setUserLogin(true);
                    setUserRegister(false);
                    setCheckPassword("");
                    setpassword("");
                    setUsername("");
                }}>Login</div>}
                {userLogin &&<div className="form-text" onClick={()=> {
                    setUserLogin(false);
                    setUserRegister(true);
                    setCheckPassword("");
                    setpassword("");
                    setUsername("");
                }}>create an account</div>}

            </div>
            
            <button type="submit" className="btn btn-success"
            disabled={checkAllInputs()}
            >
                Submit
            </button>
        </form>
    );
}
export default Login;