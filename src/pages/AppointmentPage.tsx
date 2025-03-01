import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import AppointmentManagement from "../component/appointment/appointmentComponent.tsx";

export const AppointmentPage = () =>{
    return (
        <>
            <div className="flex w-4/5">
                <SliderBarComponents/>
                <div className="flex-grow p-1">
                    <AppointmentManagement/>
                </div>


            </div>
        </>
    )
}
export default AppointmentPage;