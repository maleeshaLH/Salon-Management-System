import SliderBarComponents from "../component/sidebar/SidebarComponent.tsx";
import PaymentManagement from "../component/payment/paymentComponent.tsx";

export const PaymentPage = () =>{
    return (
        <>
            <div className="flex w-4/5">
                <SliderBarComponents/>
                <div className="flex-grow p-1">
                   <PaymentManagement/>
                </div>


            </div>
        </>
    )
}
export default PaymentPage;