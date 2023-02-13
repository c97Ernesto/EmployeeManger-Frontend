import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  public obtenerEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe(
      (response: Empleado[]) => {
        this.empleados = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
