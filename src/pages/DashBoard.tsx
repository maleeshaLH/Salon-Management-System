import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";

export const Dashboard = () => {
    return (
        <>
            <div style={{display: "flex"}}>
                <SliderBarComponents/>
                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navbar */}
                    <nav className="bg-gray-100 border-b p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Welcome to Your Advanced Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded px-4 py-2"
                            />
                            <span className="material-icons cursor-pointer">notifications</span>
                            <span className="material-icons cursor-pointer">account_circle</span>
                        </div>
                    </nav>

                    {/* Dashboard Widgets */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">Users</h3>
                            <p className="text-2xl font-bold mt-4">5</p>
                        </div>
                        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">Revenue</h3>
                            <p className="text-2xl font-bold mt-4">21</p>
                        </div>
                        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold">Performance</h3>
                            <p className="text-2xl font-bold mt-4">7.51%</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default Dashboard;
