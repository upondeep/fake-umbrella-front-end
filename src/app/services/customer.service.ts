import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../model/icustomer.interface';

const apiBaseUrl = "http://localhost:3000";
// const apiBaseUrl = "http://localhost:30001";
// const apiBaseUrl = "http://back-end:3000"; //
// const apiBaseUrl = "http://docker.for.win.localhost:3000"; //
// const apiBaseUrl = "http://10.0.0.219:3000"; //

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getAllCustomers() {
    return this.http.get<ICustomer[]>(`${apiBaseUrl}/customers`);
  }

  getCustomer(id: String) {
    return this.http.get<ICustomer>(`${apiBaseUrl}/customers/${id}`);
  }

  createCustomer(json: ICustomer) {
    return this.http.post<ICustomer>(`${apiBaseUrl}/customers`, json);
  }

  deleteCustomer(id: String) {
    return this.http.delete(`${apiBaseUrl}/customers/${id}`);
  }

  updateCustomer(json: ICustomer) {
    console.log("update json:", json);
    return this.http.put<ICustomer>(`${apiBaseUrl}/customers`, json);
  }
}
