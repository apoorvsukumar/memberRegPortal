export class Registration{
    constructor(
        public name: string,
        public address: string,
        public country: string,
        public state: string,
        public email: string,
        public password: string,
        public pan: string,
        public contactNo: string,
        public dob: string,
        public oldEmail: string
    ) {}
}