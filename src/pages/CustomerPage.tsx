import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import CustomerInputComponents from "../component/customer/CustomerInputComponent.tsx";

export  const CustomerPage =() => {
    return (
        <>
            <div className="flex w-4/5">
                <SliderBarComponents/>
                <div className="flex-grow p-1">
                   <CustomerInputComponents/>
                </div>


            </div>
        </>
    )
};
export default CustomerPage;