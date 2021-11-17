import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  mensaje1: boolean = false;
  mensaje2: boolean = false;
  mensaje3: boolean = false;
  mensaje4: boolean = false;
  mensaje5: boolean = false;
  mensaje6: boolean = false;
  mensaje7: boolean = false;
  mensaje8: boolean = false;
  mensaje9: boolean = false;
  mensaje10: boolean = false;
  mensaje11: boolean = false;
  mensaje12: boolean = false;
  mensaje13: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //Inicio
  nuevoMensaje1():boolean {
    this.mensaje1 = true
    return this.mensaje1;    
  }

  //Nuevo envio
  nuevoMensaje2():boolean {
    this.mensaje2 = true
    this.mensaje3 = false
    this.mensaje4 = false
    this.mensaje5 = false
    this.mensaje6 = false
    this.mensaje7 = false
    this.mensaje8 = false
    return this.mensaje2;    
  }

  //Nuevo gasto
  nuevoMensaje3():boolean {
    this.mensaje3 = true
    this.mensaje2 = false
    this.mensaje4 = false
    this.mensaje5 = false
    this.mensaje6 = false
    this.mensaje7 = false
    this.mensaje8 = false
    return this.mensaje3;    
  }

  //Actualizar y elminar envio
  nuevoMensaje4():boolean {
    this.mensaje4 = true
    this.mensaje5 = false
    this.mensaje3 = false
    this.mensaje2 = false
    this.mensaje6 = false
    this.mensaje7 = false
    this.mensaje8 = false
    return this.mensaje4;    
  }

  //Actualizar y eliminar gasto
  nuevoMensaje5():boolean {
    this.mensaje5 = true
    this.mensaje4 = false
    this.mensaje3 = false
    this.mensaje2 = false
    this.mensaje6 = false
    this.mensaje7 = false
    this.mensaje8 = false
    return this.mensaje5;    
  }
  
  //Otras operaciones
  nuevoMensaje6():boolean {
    this.mensaje6 = true
    this.mensaje2 = false
    this.mensaje3 = false
    this.mensaje4 = false
    this.mensaje5 = false
    return this.mensaje6;    
  }
  //Clientes
  nuevoMensaje7():boolean {
    this.mensaje7 = true
    this.mensaje8 = false
    this.mensaje9 = false
    this.mensaje10 = false
    this.mensaje11 = false
    this.mensaje12 = false
    this.mensaje13 = false
    return this.mensaje7;    
  }
  //Usuarios
  nuevoMensaje8():boolean {
    this.mensaje8 = true
    this.mensaje7 = false
    this.mensaje9 = false
    this.mensaje10 = false
    this.mensaje11 = false
    this.mensaje12 = false
    this.mensaje13 = false
    return this.mensaje8;    
  }
  //Ver cliente
  nuevoMensaje9():boolean {
    this.mensaje9 = true
    this.mensaje7 = false
    this.mensaje8 = false
    this.mensaje10 = false
    this.mensaje11 = false
    this.mensaje12 = false
    this.mensaje13 = false
    return this.mensaje9;    
  }
  //Eliminar Cliente
  nuevoMensaje10():boolean {
    this.mensaje10 = true
    this.mensaje7 = false
    this.mensaje8 = false
    this.mensaje9 = false
    this.mensaje11 = false
    this.mensaje12 = false
    this.mensaje13 = false
    return this.mensaje10;    
  }
  //Datos usuario
  nuevoMensaje11():boolean {
    this.mensaje11 = true
    this.mensaje7 = false
    this.mensaje8 = false
    this.mensaje9 = false
    this.mensaje10 = false
    this.mensaje12 = false
    this.mensaje13 = false
    return this.mensaje11;    
  }
  //Contraseña usuario
  nuevoMensaje12():boolean {
    this.mensaje12 = true
    this.mensaje7 = false
    this.mensaje8 = false
    this.mensaje9 = false
    this.mensaje10 = false
    this.mensaje11 = false
    this.mensaje13 = false
    return this.mensaje12;    
  }
  //Eliminar usuario
  nuevoMensaje13():boolean {
    this.mensaje13 = true
    this.mensaje7 = false
    this.mensaje8 = false
    this.mensaje9 = false
    this.mensaje10 = false
    this.mensaje11 = false
    this.mensaje12 = false
    return this.mensaje13;    
  }

}
