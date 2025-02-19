import {Link} from "react-router-dom";

export const SliderBarComponents = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="bg-blue-900 text-white w-64 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold p-4">Dashboard</h2>
                    <ul className="space-y-4 mt-6">
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                DashBoard
                            </Link>
                            </span>

                        </li>
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/customer" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Customer
                            </Link>
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/employee" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Employee
                            </Link>
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/appointment" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Appointment
                            </Link>
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/payment" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Payment
                            </Link>
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-blue-800">
                            <span className="material-icons mr-3">
                                <Link to="/service" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Service
                            </Link>
                            </span>
                        </li>

                    </ul>
                </div>
                <div className="p-4 hover:bg-blue-800 flex items-center cursor-pointer">
                    <span className="material-icons mr-3">
                        <Link to="/" className="custom-link hover:bg-blue-500 px-3 py-2 rounded">
                                Sign Out
                            </Link>
                    </span>
                </div>
            </aside>


        </div>
    );
};

export default SliderBarComponents;
