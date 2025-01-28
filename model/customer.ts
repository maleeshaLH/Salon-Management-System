export class Customer {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: number;

    constructor(customerId: string, customerName: string, customerEmail: string, customerPhone: number) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
    }

}