import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {deleteService, getAllService, saveService, updateService} from "../../reducers/ServiceReducer.tsx";
import {Service} from "../../models/service.ts";

const ServiceManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [serviceId, setServiceId] = useState("");
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState(0);


    const dispatch = useDispatch<AppDispatch>();
    const services = useSelector((state: any) => state.service);

    useEffect(() => {
        dispatch(getAllService());
    }, [dispatch,services.length]);

    const resetForm = () => {
        setServiceId("");
        setName("");
        setDuration("");
        setPrice(0);
    };

    const handleAddClick = () => {
        resetForm();
        setIsEditing(false);
        setShowModal(true);
    };

    const handleSave = () => {
        const newService: Service = { serviceId,name,duration,price};
        if (isEditing) {
            dispatch(updateService(newService));
            dispatch(getAllService())
        } else {
            dispatch(saveService(newService));
            dispatch(getAllService())
        }
        setShowModal(false);
    };

    const handleEdit = (service: Service) => {
        setServiceId(service.serviceId);
        setName(service.name);
        setDuration(service.duration);
        setPrice(service.price);

        setIsEditing(true);
        setShowModal(true);
        console.log("edit")
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            dispatch(deleteService(id));
            dispatch(getAllService())
        }
    };


    return (
        <div className="ml-64 w-full p-5">
            <header className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Service Management </h1>
                <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Service</button>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-3 bg-gray-100">ID</th>
                    <th className="border p-3 bg-gray-100">name</th>
                    <th className="border p-3 bg-gray-100">duration</th>
                    <th className="border p-3 bg-gray-100">Price</th>
                    <th className="border p-3 bg-gray-100">Actions</th>
                </tr>
                </thead>
                <tbody>
                {services.length > 0 ? (
                    services.map((service: Service) => (
                        <tr key={service.serviceId} className="hover:bg-gray-100">
                            <td className="text-center">{service.serviceId}</td>
                            <td className="text-center">{service.name}</td>
                            <td className="text-center">{service.duration}</td>
                            <td className="text-center">{service.price}</td>

                            <td className="text-center">
                                <button onClick={() => handleEdit(service)} className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button onClick={() => handleDelete(service.serviceId)} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={5} className="text-center p-3">No Service Available</td></tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Service" : "Add Service"}</h2>
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Service Id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    value={serviceId}
                                    onChange={(e) => setServiceId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700"> Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Type"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            {/*<div className="mb-4">*/}
                            {/*    <label className="block text-gray-700">Duration</label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Enter Duration"*/}
                            {/*        value={duration}*/}
                            {/*        onChange={(e) => setDuration(e.target.value)}*/}
                            {/*        className="w-full mt-1 px-3 py-2 border rounded"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="mb-4">
                                <label className="block text-gray-700">Duration</label>
                                <input
                                    type="time"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700"> Price</label>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
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

export default ServiceManagement;
