import {useDispatch} from "react-redux";
import {useState} from "react";
import {User} from "../../models/user.ts";
import {registerUser} from "../../reducers/UserReducer.tsx";
import {AppDispatch} from "../../store/store.tsx";

export const SignUpComponent = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        const newUser : User = {username,email,password};
        dispatch(registerUser(newUser))
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
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
                {/* */}
                <button
                    type="button"
                     onClick={()=>handleSubmit()}
                    className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                    Sign Up
                </button>
                <div className="text-center mt-2">
                    <a href="/signIn" className="text-gray-400 text-sm hover:text-white">
                        Already a member? Sign In
                    </a>
                </div>
            </form>

        </div>
    );
};
