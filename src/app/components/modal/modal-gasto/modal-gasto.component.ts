import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalGastosService } from '../../../services/modal-gastos.service';
import { GastosService } from '../../../services/gastos.service';
import Swal from 'sweetalert2';
import { Gastos } from 'src/app/models/gastos.model';

@Component({
  selector: 'app-modal-gasto',
  templateUrl: './modal-gasto.component.html',
  styles: [
  ]
})
export class ModalGastoComponent implements OnInit {

  public gastos: Gastos[] = [];
  public gastosTemp: Gastos[] = [];
  public cargando: boolean = true;

  public totalGastos: number = 0;
  public desde: number = 0;

  public total2: number = 0;

  public formEnviado = false;

  public registerForm = this.fb.group({
    fecha: ['', Validators.required],
    descripcion: ['', Validators.required],
    importe: ['', Validators.required],
  });

  constructor(public modalGastosService: ModalGastosService,
              private fb: FormBuilder,
              private gastosService: GastosService,
              ) { }

  ngOnInit(): void {
  }

  refresh(): void { window.location.reload(); }

  campoNoValido(campo: string): boolean {
    
    if(this.registerForm.get(campo)?.invalid && this.formEnviado) {
      return true;
    } else {
      return false;
    }
  }

  cerrarModal() {
    this.modalGastosService.cerrarModalGastos();    
  }

  cargarGastos() {
    
    this.cargando = true;
    
    this.gastosService.cargarGasto(this.desde)
    .subscribe(({total, gastos}) => {
      this.totalGastos = total;
      this.gastos = gastos;
      this.gastosTemp = gastos;
      
      this.cargando = false;

    })
  }

  crearGasto() {
      
    this.formEnviado = true;
    console.log(this.registerForm.value);

  if (this.registerForm.invalid) {
    return;
  }
  //Si el formulario de arriba es váilido, realizar el posteo
  this.gastosService.crearGasto(this.registerForm.value)
    .subscribe( resp => {
      Swal.fire({
        title: 'Nuevo gasto',
  text: "Gasto creado correctamente",
  icon: 'success',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed){
          this.cerrarModal();
          this.refresh();
        }
      })
      
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    
}

}



//ng g c components/modal/modalGasto --skipTests -is 

