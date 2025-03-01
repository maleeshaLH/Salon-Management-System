import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import CustomerManagement from "../component/customer/customerComponent.tsx";

export  const CustomerPage =() => {
    return (
        <>
            <div className="flex w-4/5">
                <SliderBarComponents/>
                <div className="flex-grow p-1">
                    <CustomerManagement/>

                </div>



            </div>
        </>
    )
};
export default CustomerPage;