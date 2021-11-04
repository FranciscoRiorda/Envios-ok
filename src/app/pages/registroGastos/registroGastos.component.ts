import { Component, OnInit } from '@angular/core';
import { Gastos } from 'src/app/models/gastos.model';
import { GastosService } from '../../services/gastos.service';
import { BusquedasService } from '../../services/busquedas.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-registroGastos',
  templateUrl: './registroGastos.component.html',
  styles: []
})
export class RegistroGastosComponent implements OnInit {

  
  public cargando: boolean = true;
  
  public gastos: Gastos[] = [];
  public data: Gastos[] = [];

  public gastosTemp: Gastos[] = [];

  public totalGastos: number = 0;
  public desde: number = 0;

  public fechaInicial!: any;
  public fechaFinal!: any;

  
  constructor(private gastosService: GastosService) { }

  ngOnInit(): void {
    this.cargarGastosPorMes();
    
  }

  totalGasto():any{
    
    let total=0;
    this.gastos.forEach(t => {
      total += t.importe;
    });
    return total;
  }
  
  totalGasto2():any{
    
    let total=0;
    this.data.forEach(t => {
      total += t.importe;
      console.log(total)
    });
    return total;
  }
  
  cargarGastos() {
    
    this.cargando = true;
    
    this.gastosService.cargarGastosTotales(this.desde)
    .subscribe(({total, gastos}) => {
      
      this.cargando = false;

      this.totalGastos = total;
      this.gastos = gastos;
      this.gastosTemp = gastos;
    })
  }
  
  cargarGastosPorMes() {   
    
    // console.log(this.fechaInicial, this.fechaFinal)

    this.cargando = true;
    
    this.gastosService.cargarGastoPorFecha(this.fechaInicial, this.fechaFinal)
      .subscribe((data) => {
        // console.log('data', data);
        
        this.data = data;
        this.gastosTemp = data;
      })    
  }



  guardarCambios(gasto: Gastos) {

    this.gastosService.actualizarGasto(gasto._id!, gasto.fecha, gasto.descripcion, gasto.importe)
      .subscribe(resp => {
        Swal.fire('Actualizado', gasto.descripcion, 'success');
        this.cargarGastos();
      });
  }

  eliminarGasto(gasto: Gastos) {

    Swal.fire({
      title: 'Estás seguro que deseas borrar el gasto seleccionado?',
      text: `Estás a punto de borrar a ${gasto.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar gasto'
    }).then((result) => {
      if (result.value) {

        this.gastosService.eliminarGasto(gasto._id!)
          .subscribe(resp => {
            this.cargarGastos();
            Swal.fire('Borrado', gasto.descripcion, 'success')
          });
        
      }
    })      
  }

  cambiarPagina(valor: number) {
      
    this.desde += valor; //Si va a ser de 5 usuarios por pág, el valor 0 + 5, 5+5, 10+5

    if(this.desde <= 0 ){
      this.desde = 0;
    } else if (this.desde >= this.totalGastos) {
      this.desde -= valor; // Si tengo 10 usuarios y le sumo: 10 + 5, 'desde' suma 15 y es mayor a 'totalUsuarios', entonces se resta 5 de esta fun y queda en 10
    }

    this.cargarGastos();

  }  

  deshabilitar1() {
   
    if(this.desde <= 0){
      return true;
    } else {
      return false;
    }
  }

  deshabilitar2() {
   let desde2 = this.desde + 50
    if(this.totalGastos > desde2){
      return false;
    } else if (desde2 > this.totalGastos) {
      return true;
    } else {
      return true;
    }
  }

}
