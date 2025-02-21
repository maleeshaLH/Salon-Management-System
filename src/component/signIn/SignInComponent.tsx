import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../models/user.ts";
import {AppDispatch} from "../../store/store.tsx";
import {loginUser} from "../../reducers/UserReducer.tsx";

export const SignInComponent =()=> {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // @ts-ignore
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);

    const checkUser= ()=>{
        const user: User = {username,email,password};
        dispatch(loginUser(user));

    }
    useEffect(() => {
        if(isAuthenticated){
            navigate('/dashboard');
        }
    }, [isAuthenticated]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Login In</h2>

                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="UserName"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <button
                    type="button"
                    onClick={()=>checkUser()}

                    className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >

                    Sign In
                </button>
                <div className="text-center mt-4">
                    <a href="/dashboard" className="text-gray-400 text-sm hover:text-white">
                        Forgot Password?
                    </a>

                </div>
                <div className="text-center mt-2">
                    <a href="/signUp" className="text-gray-400 text-sm hover:text-white">
                        Not a member? Sign Up
                    </a>

                </div>
            </form>
        </div>
    );
};
export default SignInComponent;