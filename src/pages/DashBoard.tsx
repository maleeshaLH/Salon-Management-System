import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store.tsx";
import { getAllAppointmentCount } from "../reducers/AppointmentReducer.tsx";
import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {getAllServiceCount} from "../reducers/ServiceReducer.tsx";
import { getAllEmployeeCount} from "../reducers/EmployeeReducer.tsx";
import {getAllCustomerCount} from "../reducers/CustomerReducer.tsx";

const earningsData = [
    { name: "Jan", earnings: 7500 },
    { name: "Feb", earnings: 8200 },
    { name: "Mar", earnings: 9100 },
    { name: "Apr", earnings: 8800 },
    { name: "May", earnings: 10500 },
    { name: "Jun", earnings: 9500 },
];



export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const appointments = useSelector((state: any) => state.appointments);
    const services = useSelector((state: any) => state.service);
    const employees = useSelector((state: any) => state.employees);
    const customers = useSelector((state: any) => state.customer);

    useEffect(() => {
        dispatch(getAllAppointmentCount());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllServiceCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllEmployeeCount())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllCustomerCount())
    }, [dispatch]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <SliderBarComponents />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Top Navbar */}
                <nav className="bg-white shadow-md p-2 flex justify-between items-center rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-700">
                        Salon Management Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <span className="material-icons cursor-pointer text-gray-500 hover:text-blue-600 transition-all">notifications</span>
                        <span className="material-icons cursor-pointer text-gray-500 hover:text-blue-600 transition-all">account_circle</span>
                    </div>
                </nav>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold">Total Services</h3>
                        <p className="text-3xl font-bold mt-4">{services}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold">Total Appointments</h3>
                        <p className="text-3xl font-bold mt-4">{appointments}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold">Total Employees</h3>
                        <p className="text-3xl font-bold mt-4">{employees}</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all">
                        <h3 className="text-xl font-semibold">Total Customers</h3>
                        <p className="text-3xl font-bold mt-4">{customers}</p>
                    </div>
                </div>

                {/* Earnings Summary */}
                <div className="mt-8 bg-white p-2 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Earnings Summary</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-green-100 p-2 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-green-700">Today</h3>
                            <p className="text-2xl font-bold text-green-800">$250</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-blue-700">This Week</h3>
                            <p className="text-2xl font-bold text-blue-800">$1,800</p>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-purple-700">This Month</h3>
                            <p className="text-2xl font-bold text-purple-800">$7,500</p>
                        </div>
                        <div className="bg-orange-100 p-2 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-orange-700">This Year</h3>
                            <p className="text-2xl font-bold text-orange-800">$85,000</p>
                        </div>
                    </div>
                </div>

                {/* Earnings Chart */}
                <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Earnings Over Time</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={earningsData}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="earnings" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
