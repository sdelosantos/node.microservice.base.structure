export interface CreateCustomerInput {
    Name: string,
    LastName:string,
    Email:string,
    Phone:string,
    Address:string[]
}
export interface UpdateCustomerInput {
    CustomerId: string,
    Name: string,
    LastName:string,
    Email:string,
    Phone:string
}
export interface UpdateCustomerAddressInput {
    CustomerId: string,
    Address:string[]
}