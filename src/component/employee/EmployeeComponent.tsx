import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {deleteEmployee, getAllEmployee, saveEmployee, updateEmployee} from "../../reducers/EmployeeReducer.tsx";
import {Employee} from "../../models/employee.ts";

const EmployeeManagement = () => {

    const dispatch = useDispatch<AppDispatch>();
    // @ts-ignore
    const employees = useSelector((state) => state.employees);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [employeeId,setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [designation, setDesignation] = useState("");
    const [salary, setSalary] = useState(0);


    useEffect(() => {
        dispatch(getAllEmployee());
    }, [dispatch,employees.length]);



    const resetForm = () => {
        setEmployeeId("");
        setEmployeeName("");
        setEmail("");
        setPhone(0);
        setDesignation("")
        setEmployeeId("");
    };

    const handleAddClick = () => {
        resetForm();
        setIsEditing(false);
        setShowModal(true);
    };

    const handleSave = () => {
        const newEmployee:Employee ={
            employeeId,employeeName,email,phone,designation,salary
        };
        if (isEditing) {
            dispatch(updateEmployee(newEmployee));
            dispatch(getAllEmployee())
        } else {
            dispatch(saveEmployee(newEmployee));
            dispatch(getAllEmployee())
        }
        setShowModal(false);
    };

    const handleEdit = (employee: Employee) => {
        setEmployeeId(employee.employeeId);
        setEmployeeName(employee.employeeName);
        setEmail(employee.email);
        setPhone(employee.phone);
        setDesignation(employee.designation);
        setSalary(employee.salary);
        setIsEditing(true);
        setShowModal(true);
        console.log("edit")
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            dispatch(deleteEmployee(id));
            dispatch(getAllEmployee())
        }
    };

    return (
        <div className="ml-64 w-full p-5">
            <header className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Employee Management </h1>
                <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Employee</button>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border p-3 bg-gray-100">ID</th>
                    <th className="border p-3 bg-gray-100">Name</th>
                    <th className="border p-3 bg-gray-100">Email</th>
                    <th className="border p-3 bg-gray-100">Phone Number</th>
                    <th className="border p-3 bg-gray-100">Designation</th>
                    <th className="border p-3 bg-gray-100">Salary</th>
                    <th className="border p-3 bg-gray-100">Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee: Employee) => (
                        <tr key={employee.employeeId} className="hover:bg-gray-100">
                            <td className="text-center">{employee.employeeId}</td>
                            <td className="text-center">{employee.employeeName}</td>
                            <td className="text-center">{employee.email}</td>
                            <td className="text-center">{employee.phone}</td>
                            <td className="text-center">{employee.designation}</td>
                            <td className="text-center">{employee.salary}</td>
                            <td className="text-center">
                                <button onClick={() => handleEdit(employee)}
                                        className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button onClick={() => handleDelete(employee.employeeId)}
                                        className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center p-3">No Employee Available</td></tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Employee" : "Add Employee"}</h2>
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Employee Id</label>
                                <input
                                    type="text"
                                    placeholder="id"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={employeeName}
                                    onChange={(e) => setEmployeeName(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="number"
                                    placeholder="Enter Number"
                                    value={phone}
                                    onChange={(e) => setPhone(Number(e.target.value))}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Designation</label>
                                <input
                                    type="text"
                                    placeholder="Enter designation"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Salary</label>
                                <input
                                    type="text"
                                    placeholder="Enter salary"
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
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

export default EmployeeManagement;
