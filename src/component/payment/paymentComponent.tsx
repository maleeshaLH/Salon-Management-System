import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {deletePayment, getAllPayment, savePayment, updatePayment} from "../../reducers/PaymentReducer.tsx";
import {Payment} from "../../models/payment.ts";
import {getAllAppointment} from "../../reducers/AppointmentReducer.tsx";

const PaymentManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [paymentId, setPaymentId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [paymentDate, setPymentDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    const payments = useSelector((state: any) => state.payment);
    const appointments = useSelector((state: any) => state.appointments);


    useEffect(() => {
        dispatch(getAllPayment());
    }, [dispatch,payments.length]);

    useEffect(() => {
        dispatch(getAllAppointment());
    }, [dispatch]);

    const resetForm = () => {
        setPaymentId("")
        setAppointmentId("");
        setPymentDate(new Date());
        setAmount(0);

    };

    const handleAddClick = () => {
        resetForm();
        setIsEditing(false);
        setShowModal(true);
    };

    const handleSave = () => {
        const newPayment: Payment = { paymentId,appointmentId,paymentDate,amount};
        if (isEditing) {
            dispatch(updatePayment(newPayment));
            dispatch(getAllPayment())
        } else {
            dispatch(savePayment(newPayment));
            dispatch(getAllPayment())
        }
        setShowModal(false);
    };

    const handleEdit = (payment: Payment) => {
        setPaymentId(payment.paymentId);
        setAppointmentId(payment.appointmentId);
        setPymentDate(payment.paymentDate);
        setAmount(payment.amount);

        setIsEditing(true);
        setShowModal(true);
        console.log("edit")
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            dispatch(deletePayment(id));
            dispatch(getAllPayment())
        }
    };

    return (
        <div className="ml-64 w-full p-5">
            <header className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Payment Management </h1>
                <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Appointment</button>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-3 bg-gray-100">ID</th>
                    <th className="border p-3 bg-gray-100">Appointment Id</th>
                    <th className="border p-3 bg-gray-100">Date</th>
                    <th className="border p-3 bg-gray-100">Price</th>
                    <th className="border p-3 bg-gray-100">Amount</th>
                </tr>
                </thead>
                <tbody>
                {[payments].length > 0 ? (
                    payments.map((payment: Payment) => (
                        <tr key={payment.paymentId} className="hover:bg-gray-100">
                            <td className="text-center">{payment.paymentId}</td>
                            <td className="text-center">{payment.appointmentId}</td>
                            <td className="text-center">{payment.paymentDate}</td>
                            <td className="text-center">{payment.amount}</td>
                            <td className="text-center">
                                <button onClick={() => handleEdit(payment)} className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button onClick={() => handleDelete(payment.paymentId)} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={7} className="text-center p-3">No Payment Available</td></tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Payment" : "Add Payment"}</h2>
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Payment Id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    value={paymentId}
                                    onChange={(e) => setPaymentId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>
                            {/*<div className="mb-4">*/}
                            {/*    <label className="block text-gray-700"> Appointment Id</label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Enter id"*/}
                            {/*        value={appointmentId}*/}
                            {/*        onChange={(e) => setAppointmentId(e.target.value)}*/}
                            {/*        className="w-full mt-1 px-3 py-2 border rounded"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="mb-4">
                                <label className="block text-gray-700">Appointment Id</label>
                                <select
                                    value={appointmentId}
                                    onChange={(e) => setAppointmentId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-white"
                                >
                                    <option value="">Select an Appointment</option>
                                    {appointments.map((appointment: any) => (
                                        <option key={appointment.appointmentId} value={appointment.appointmentId}>
                                            {appointment.appointmentId}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700">Date</label>
                                <div
                                    className="w-full mt-1 px-3 py-2 border rounded cursor-pointer bg-white"

                                    onClick={() => setShowCalendar(!showCalendar)}
                                >
                                    {/*{date|| "Select a Date"}*/}
                                </div>

                                {showCalendar && (
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="Enter  Date"
                                        value={paymentDate}
                                        onChange={(e) => {
                                            setPymentDate(new Date(e.target.value));
                                            setShowCalendar(false);
                                        }}
                                        className="absolute top-10 left-0 w-full mt-1 px-3 py-2 border rounded bg-white shadow-lg"
                                    />
                                )}
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700"> Amount</label>
                                <input
                                    type="text"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
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

export default PaymentManagement;
