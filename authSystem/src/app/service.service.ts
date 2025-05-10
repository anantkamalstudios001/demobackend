import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  login( data :any)
  {
    return this.http.post('http://localhost:4000/api/login', data);
  }
}
