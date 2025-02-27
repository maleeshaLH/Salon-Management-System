import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import EmployeeManagement from "../component/employee/EmployeeComponent.tsx";

export const EmployeePage = () =>{
    return (
        <>
            <div className="flex w-4/5">
                <SliderBarComponents/>
                <div className="flex-grow p-1">
                    <EmployeeManagement/>
                </div>


            </div>
        </>
    )
}
export default EmployeePage;