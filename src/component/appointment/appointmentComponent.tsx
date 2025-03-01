import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { Appointment } from "../../models/appointment.ts";
import {
    saveAppointment,
    getAllAppointment,
    deleteAppointment,
    updateAppointment,
} from "../../reducers/AppointmentReducer.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {getAllEmployee} from "../../reducers/EmployeeReducer.tsx";
import {getAllCustomer} from "../../reducers/CustomerReducer.tsx";

const AppointmentManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [appointmentId, setAppointmentId] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const appointments = useSelector((state: any) => state.appointments);
    const employees = useSelector((state: any) => state.employees);
    const customers = useSelector((state: any) => state.customer);

    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        dispatch(getAllAppointment());
    }, [dispatch,appointments.length]);

    useEffect(() => {
        dispatch(getAllEmployee())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllCustomer())
    }, [dispatch]);


    const resetForm = () => {
        setAppointmentId("");
        setDate(new Date());
        setTime("");
        setServiceType("");
        setCustomerId("");
        setEmployeeId("");
    };

    const handleAddClick = () => {
        resetForm();
        setIsEditing(false);
        setShowModal(true);
    };

    const handleSave = () => {
        const newAppointment: Appointment = { appointmentId, date, time, serviceType, customerId, employeeId };
        if (isEditing) {
            dispatch(updateAppointment(newAppointment));
            dispatch(getAllAppointment())
        } else {
            dispatch(saveAppointment(newAppointment));
            dispatch(getAllAppointment())
        }
        setShowModal(false);
    };

    const handleEdit = (appointment: Appointment) => {
        setAppointmentId(appointment.appointmentId);
        setDate(appointment.date);
        setTime(appointment.time);
        setServiceType(appointment.serviceType);
        setCustomerId(appointment.customerId);
        setEmployeeId(appointment.employeeId);
        setIsEditing(true);
        setShowModal(true);
        console.log("edit")
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            dispatch(deleteAppointment(id));
            dispatch(getAllAppointment())
        }
    };

    return (
        <div className="ml-64 w-full p-5">
            <header className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Appointment Management </h1>
                <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Appointment</button>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-3 bg-gray-100">ID</th>
                    <th className="border p-3 bg-gray-100">Date</th>
                    <th className="border p-3 bg-gray-100">Time</th>
                    <th className="border p-3 bg-gray-100">Service Type</th>
                    <th className="border p-3 bg-gray-100">Customer ID</th>
                    <th className="border p-3 bg-gray-100">Employee ID</th>
                    <th className="border p-3 bg-gray-100">Actions</th>
                </tr>
                </thead>
                <tbody>
                {appointments.length > 0 ? (
                    appointments.map((appointment: Appointment) => (
                        <tr key={appointment.appointmentId} className="hover:bg-gray-100">
                            <td className="text-center">{appointment.appointmentId}</td>
                            <td className="text-center">{appointment.date}</td>
                            <td className="text-center">{appointment.time}</td>
                            <td className="text-center">{appointment.serviceType}</td>
                            <td className="text-center">{appointment.customerId}</td>
                            <td className="text-center">{appointment.employeeId}</td>
                            <td className="text-center">
                                <button onClick={() => handleEdit(appointment)} className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button onClick={() => handleDelete(appointment.appointmentId)} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={7} className="text-center p-3">No Appointments Available</td></tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Appointment" : "Add Appointment"}</h2>
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Appointment Id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    value={appointmentId}
                                    onChange={(e) => setAppointmentId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label className="block text-gray-700">Date</label>
                                <div
                                    className="w-full mt-1 px-3 py-4 border rounded cursor-pointer bg-white"

                                    onClick={() => setShowCalendar(!showCalendar)}
                                >
                                    {/*{date|| "Select a Date"}*/}
                                </div>

                                {showCalendar && (
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="Enter  Date"
                                        value={Date}
                                        onChange={(e) => {
                                            setDate(new Date(e.target.value));
                                            setShowCalendar(false);
                                        }}
                                        className="absolute top-10 left-0 w-full mt-3 px-3 py-2 border rounded bg-white shadow-lg"
                                    />
                                )}
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700"> Time</label>
                                <input
                                    type="text"
                                    placeholder="Enter Time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Service Type</label>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    placeholder="Enter Type"*/}
                                {/*    value={serviceType}*/}
                                {/*    onChange={(e) => setServiceType(e.target.value)}*/}
                                {/*    className="w-full mt-1 px-3 py-2 border rounded"*/}
                                {/*/>*/}
                                <select
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-white"
                                >
                                    <option value="">Select an Types</option>
                                    {employees.map((employee: any) => (
                                        <option key={employee.employeeId} value={employee.designation}>
                                            {'Type : '+employee.designation+' , '+'Employee Id : '+employee.employeeId}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Employee Id</label>
                                <select
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-white"
                                >
                                    <option value="">Select an Employee</option>
                                    {employees.map((employee: any) => (
                                        <option key={employee.employeeId} value={employee.employeeId}>
                                        {employee.employeeId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Customer Id</label>
                                <select
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-white"
                                >
                                    <option value="">Select an Customer</option>
                                    {customers.map((customer: any) => (
                                        <option key={customer.customerId} value={customer.customerId}>
                                            {'Ids : '+customer.customerId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="button" onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                {isEditing ? "Update" : "Save"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentManagement;
