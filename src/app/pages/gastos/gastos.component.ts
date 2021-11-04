import { Component, OnInit } from '@angular/core';
import { Gastos } from 'src/app/models/gastos.model';
import { GastosService } from '../../services/gastos.service';
import { BusquedasService } from '../../services/busquedas.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalGastosService } from '../../services/modal-gastos.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styles: [
  ]
})
export class GastosComponent implements OnInit {

  public cargando: boolean = true;
  
  public gastos: Gastos[] = [];
  public gastosTemp: Gastos[] = [];
  

  public totalGastos: number = 0;
  public desde: number = 0;
  public sumatoria: number = 0;

  public total2: number = 0;

  
  
  constructor(private gastosService: GastosService,
              private busquedasService: BusquedasService,
              private http: HttpClient,
              private modalGastosService: ModalGastosService) { }
    
    
  ngOnInit(): void {
    
    this.cargarGastos();
    
  }
  
  
  cargarGastos() {
  
    this.cargando = true;
    
    this.gastosService.cargarGasto(this.desde)
    .subscribe(({total, gastos, sumatoria}) => {
      
      this.cargando = false;

      this.totalGastos = total;
      this.sumatoria = sumatoria; 
      this.gastos = gastos;
      this.gastosTemp = gastos;
      
    })
  }

  

  totalGasto():any{
    
    let total=0;
    this.gastos.forEach(t => {
      total += t.importe;
    });
    return total;
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
   let desde2 = this.desde + 10
    if(this.totalGastos > desde2){
      return false;
    } else if (desde2 > this.totalGastos) {
      return true;
    } else {
      return true;
    }
  }

  
  buscar (termino: string) {

    if (termino.length === 0 ) {
      return this.cargarGastos();
    }
    
    this.busquedasService.buscar('gastos', termino)
    .subscribe(resp => {
      this.gastos = resp as Gastos[];
        
      });
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

  abrirModalGastos() {
    this.modalGastosService.abrirModalGastos();
  }

  
  
  




}
