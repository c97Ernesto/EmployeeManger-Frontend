import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../model/empleado';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(`${this.apiServerUrl}/empleado/obtenerEmpleados`);
  }

  public agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(`${this.apiServerUrl}/empleado/agregar`, empleado);
  }

  public actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.apiServerUrl}/empleado/actualizar`, empleado);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/empleado/eliminar/${id}`);
  }
}
