import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public empleados: Empleado[] = [];
  public editEmpleado: Empleado;

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

  public onAgregarEmpleado(nuevoFormulario: NgForm): void {
    //cerramos la ventana del formulario una vez hecho el click en agregar el nuevo empleado
    document.getElementById('add-employee-form').click(); 
    // enviamos al servicio un JSON con los valores de cada input del formulario
    this.empleadoService.agregarEmpleado(nuevoFormulario.value).subscribe(
      (response: Empleado) => {
        console.log(response);
        this.obtenerEmpleados();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onActualizarEmpleado(empleado: Empleado): void {
    this.empleadoService.actualizarEmpleado(empleado).subscribe(
      (response: Empleado) => {
        console.log("Actualizado");
        this.obtenerEmpleados();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //empleado: que se está agregando/editando/borrando
  //modo: lo que está tratando de hacer el usuario (en que boton está la acción)
  public onOpenModal(empleado: Empleado, modo: string): void {
    const contenedor = document.getElementById('main-container');
    const boton = document.createElement('button');   //creamos el elemento
    

    // <!-- Button trigger modal -->
    //   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //     Launch demo modal
    //   </button>
    boton.type = 'button';
    boton.style.display = 'none'; //escondemos el boton (ya tenemos otro)
    boton.setAttribute('data-toggle', 'modal');

    if ( modo === 'agregar') {
      boton.setAttribute('data-target', '#agregarEmpleadoModal');
    }
    if ( modo === 'editar') {
      this.editEmpleado = empleado
      boton.setAttribute('data-target', '#editarEmpleadoModal');
    }
    if ( modo === 'eliminar') {
      boton.setAttribute('data-target', '#eliminarEmpleadoModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }

}
