export class Appointment {
    appointmentId: string;
    date: Date;
    time: string;
    serviceType: string;
    customerId: string;

    constructor(appointmentId: string, date: Date, time: string,
    serviceType: string, customerId: string) {
        this.appointmentId = appointmentId;
        this.date = date;
        this.time = time;
        this.serviceType = serviceType;
        this.customerId = customerId;
    }


}