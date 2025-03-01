import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import ServiceManagement from "../component/service/serviceComponent.tsx";

export const ServicePage = () =>{
    return (
        <>
            <div className="flex  h-screen">
                <div className="flex w-4/5">
                    <SliderBarComponents/>
                    <div className="flex-grow p-5">
                        <ServiceManagement/>
                    </div>


                </div>
            </div>

        </>
    )
}
export default ServicePage;