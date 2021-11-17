import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../models/clientes.model';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedidos } from '../../models/pedidos.model';
import { PedidosService } from '../../services/pedidos.service';

import * as printJS from 'print-js'

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styles: [
  ]
})
export class PdfComponent implements OnInit {

  public cliente: Clientes [] = [];
  public pedidos: Pedidos[] = [];

  public pdfForm!: FormGroup;

  public clienteSeleccionado!: Clientes;
  public pedidoSeleccionado!: Pedidos;

  public desde: number = 0;
  public pedidosTemp: Pedidos[] = [];
  public totalPedidos: number = 0;

  public nombre: string = '';
  public correo: string = '';
  public domicilioRetiro: string = '';
  public domicilioEntrega: string = '';
  public telefono: number = 0;
  public numRemito: string = '';
  public fechaRetiro: string = '';
  public fechaEntrega: string = '';
  public costoEnvio: number = 0;


  constructor(private clienteService: ClientesService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private pedidosService: PedidosService) { 

              }

  ngOnInit(): void {

    
    this.activatedRoute.params
    .subscribe(({id}) => this.cargarPedido(id));
    
    
        
    this.pdfForm = this.fb.group({
      
      nombreCliente: [''],
      mailCliente: [''],
      diaRetiro: [''],
      domicilioRetiro: [''],
      telEntregaPaq: [''],
      estadoRetiro: [''],
      diaEntrega: [''],
      domicilioEntrega: [''],
      telRecibePaq: [''],
      estadoEntrega: [''],
      costoEnvio: [''],
      observaciones: [''],
      _id: [''],
    });
    
  }

  cargarPedido(id: string) {

    this.pedidosService.obtenerPedidoPorId(id)
      .subscribe(pedido => {
        console.log(pedido);
        this.pedidoSeleccionado = pedido;
        const { nombreCliente, mailCliente, diaRetiro, domicilioRetiro, telEntregaPaq, estadoRetiro, diaEntrega, domicilioEntrega, telRecibePaq, estadoEntrega, costoEnvio, observaciones, _id} = pedido;
        this.pdfForm.setValue({ nombreCliente, mailCliente, diaRetiro, domicilioRetiro, telEntregaPaq, estadoRetiro, diaEntrega, domicilioEntrega, telRecibePaq, estadoEntrega, costoEnvio, observaciones, _id});
        this.nombre = nombreCliente;
        this.correo = mailCliente;
        this.domicilioRetiro = domicilioRetiro
        this.domicilioEntrega = domicilioEntrega
        this.telefono = telRecibePaq
        this.numRemito = _id
        this.fechaRetiro = diaRetiro
        this.fechaEntrega = diaEntrega
        this.costoEnvio = costoEnvio
      })

  }



  public downloadPDF(): void {
    const DATA: any = document.getElementById('pdfForm');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_EnviosOk!.pdf`);
    });
  }

  

}
 