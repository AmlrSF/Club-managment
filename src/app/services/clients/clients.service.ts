import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly apiEndpoint = `${API_BASE_URL}/api/v1/clients`;

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEndpoint);
  }

  getClientById(clientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/Client/${clientId}`);
  }

  addClient(client: any): Observable<any> {
    return this.http.post<any>(this.apiEndpoint, client);
  }

  updateClient(clientId: string, updatedClient: any): Observable<any> {
    return this.http.put<any>(`${this.apiEndpoint}/Client/${clientId}`, updatedClient);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiEndpoint}/Client/${clientId}`);
  }

  deleteAllClients(): Observable<any> {
    return this.http.delete<any>(`${this.apiEndpoint}`);
  }
}
