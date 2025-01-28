import { useState } from "react";
import {useDispatch} from "react-redux";
import {Customer} from "../../models/customer.ts";
import { saveCustomer} from "../../reducers/CustomerReducer.tsx";
import {AppDispatch} from "../../store/store.tsx";

export const CustomerInputComponents = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState(0);

    const handleAddFieldClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveCrop = (type:string) => {
        // Logic to save the field data goes here
        setShowModal(false); // Close the modal after saving
        const newCustomer:Customer ={
            customerId,customerName,customerEmail,customerPhone
        };
        console.log("Add Field button clicked");

        switch (type){
            case "Add_Customer":
                dispatch(saveCustomer(newCustomer))
                console.log(newCustomer)

                break;

        }
    };

    return (
        <>
            <div>
                {/* Main Content */}
                <div className="ml-64 w-full p-5">
                    <header className="flex justify-between items-center mb-5">
                        <h1 className="text-2xl font-bold">Customer Management</h1>
                        <button
                            onClick={handleAddFieldClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >

                            Add Customer
                        </button>
                    </header>

                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">Add Customer</h2>
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >

                        </button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    // value="F-111"
                                    // disabled
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700"> Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter  name"
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700"> Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">prone</label>
                                <input
                                    type="text"
                                    placeholder="Enter number"
                                    onChange={(e) => setCustomerPhone(parseInt(e.target.value)||0)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => handleSaveCrop('Add_Customer')}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>

                        </form>
                    </div>

                </div>

            )}

        </>
    );
};

export default CustomerInputComponents;
