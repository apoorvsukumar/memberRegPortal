
export class Claims {
    constructor(public id: number, 
        public firstName: string, 
        public lastName: string, 
        public dob: string, 
        public dischargeDate: string,
        public admissionDate: string,
        public providerName: string, 
        public billAmount: number,
        public dependent: string) {}
    
}