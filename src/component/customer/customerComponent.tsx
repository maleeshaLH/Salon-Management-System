import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    deleteCustomer,
    getAllCustomer,
    saveCustomer,
    updateCustomer
} from "../../reducers/CustomerReducer.tsx";
import {Customer} from "../../models/customer.ts";

const CustomerManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector((state:any) => state.customer);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState(0);

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [dispatch,customers.length]);

    const resetForm = () => {
        setCustomerId("");
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone(0);
    };

    const handleAddClick = () => {
        resetForm();
        setIsEditing(false);
        setShowModal(true);
    };
    const handleSave = () => {
        const newCustomer:Customer ={
            customerId,customerName,customerEmail,customerPhone
        };
        if (isEditing) {
            dispatch(updateCustomer(newCustomer));
             dispatch(getAllCustomer())
        } else {
            dispatch(saveCustomer(newCustomer));
             dispatch(getAllCustomer())
        }
        setShowModal(false);
    };

    const handleEdit = (customer: Customer) => {
        setCustomerId(customer.customerId);
        setCustomerName(customer.customerName);
        setCustomerEmail(customer.customerEmail);
        setCustomerPhone(customer.customerPhone);
        setIsEditing(true);
        setShowModal(true);
        console.log("edit")
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(id));
            dispatch(getAllCustomer())
        }
    };

    return (
        <div className="ml-64 w-full p-5">
            <header className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Appointment</button>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-3 bg-gray-100">ID</th>
                    <th className="border p-3 bg-gray-100">Name</th>
                    <th className="border p-3 bg-gray-100">Email</th>
                    <th className="border p-3 bg-gray-100">Phone Number</th>
                    <th className="border p-3 bg-gray-100">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.length > 0 ? (
                    customers.map((customer: Customer) => (
                        <tr key={customer.customerId} className="hover:bg-gray-100">
                            <td className="text-center">{customer.customerId}</td>
                            <td className="text-center">{customer.customerName}</td>
                            <td className="text-center">{customer.customerEmail}</td>
                            <td className="text-center">{customer.customerPhone}</td>
                            <td className="text-center">
                                <button onClick={() => handleEdit(customer)}
                                        className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button onClick={() => handleDelete(customer.customerId)}
                                        className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center p-3">No Appointments Available</td></tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Customer" : "Add Customer"}</h2>
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Customer Id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700"> Customer Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700"> Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Number"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(parseInt(e.target.value)||0)}
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

export default CustomerManagement;
