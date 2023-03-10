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
  public deleteEmpleado: Empleado;

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

  public onAgregarEmpleado(formulario: NgForm): void {
    //cerramos la ventana del formulario una vez hecho el click en agregar el nuevo empleado
    document.getElementById('add-employee-form').click(); 
    // enviamos al servicio un JSON con los valores de cada input del formulario
    this.empleadoService.agregarEmpleado(formulario.value).subscribe(
      (response: Empleado) => {
        console.log(response);
        this.obtenerEmpleados();
        formulario.reset();
      },(error: HttpErrorResponse) => {
        alert(error.message);
        formulario.reset();
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

  public onEliminarEmpleado(id: number): void {
    this.empleadoService.eliminarEmpleado(id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerEmpleados();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //devolver empleados que coincidan con el string ingresado
  public buscarEmpleados(palabraClave: string): void {
    const resultados: Empleado[] = [];
    for (const empleado of this.empleados) {
      if (empleado.nombre.toLowerCase().indexOf(palabraClave.toLowerCase()) !== -1
      || empleado.email.toLowerCase().indexOf(palabraClave.toLowerCase()) !== -1 
      || empleado.telefono.toLowerCase().indexOf(palabraClave.toLowerCase()) !== -1 
      || empleado.tituloTrabajo.toLowerCase().indexOf(palabraClave.toLowerCase()) !== -1 ){
        resultados.push(empleado);
      }
    }
    this.empleados = resultados;
    if (resultados.length === 0 || !palabraClave) {
      this.obtenerEmpleados();
    }
  }

  //empleado: que se est?? agregando/editando/borrando
  //modo: lo que est?? tratando de hacer el usuario (en que boton est?? la acci??n)
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
      this.editEmpleado = empleado;
      boton.setAttribute('data-target', '#editarEmpleadoModal');
    }
    if ( modo === 'eliminar') {
      this.deleteEmpleado = empleado;
      boton.setAttribute('data-target', '#eliminarEmpleadoModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }

}
