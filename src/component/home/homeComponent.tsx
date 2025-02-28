import {Link} from "react-router-dom";
import HomeImage from '../../assets/HomeImage.png'
export const HomeComponent = () => {


    return (
        <>
            <div>
                {/* Navbar */}
                <nav className="bg-pink-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Luxury Salon & Spa</h1>
                    <ul className="flex space-x-6">
                        <li><a href="#about" className="hover:text-gray-300">About</a></li>
                        <li><a href="#services" className="hover:text-gray-300">Services</a></li>
                        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
                        {/*<li>*/}
                        {/*    <Link to="/signIn" className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded">*/}
                        {/*        Login*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                    </ul>
                </nav>

                {/* Hero Section */}
                <header className="relative w-full h-screen">
                    <img src={HomeImage} alt="A scenic farming landscape" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
                        <h1 className="text-5xl font-bold">Experience the Best in Beauty & Relaxation</h1>
                        <p className="text-xl mt-4">
                            Indulge in premium salon & spa services tailored just for you.
                        </p>
                        <Link to="/signIn">
                            <button className="mt-6 bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded text-lg">
                                Login
                            </button>
                        </Link>
                    </div>
                </header>
            </div>
        </>

    )
}