import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';

import { RegistroEnviosComponent } from './registroEnvios/registroEnvios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Envios2Component } from './envios2/envios2.component';
import { GastosComponent } from './gastos/gastos.component';
import { PagesComponent } from './pages.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RendimientosComponent } from './rendimientos/rendimientos.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ModalImgComponent } from '../components/modal/modal-img/modal-img.component';
import { ModalPerfilComponent } from '../components/modal/modal-perfil/modal-perfil.component';
import { ModalUsuarioComponent } from '../components/modal/modal-usuario/modal-usuario.component';
import { ModalGastoComponent } from '../components/modal/modal-gasto/modal-gasto.component';
import { PedidoComponent } from './pedidos/pedido.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { ModalClienteComponent } from '../components/modal/modalCliente/modal-cliente.component';
import { ClavesComponent } from './mantenimientos/usuarios/claves.component';
import { RegistroGastosComponent } from './registroGastos/registroGastos.component';
import { PdfComponent } from './pdf/pdf.component';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    DashboardComponent,
    PedidosComponent,
    GastosComponent,    
    RegistroEnviosComponent,
    RegistroGastosComponent,
    RendimientosComponent,
    Envios2Component,
    PagesComponent,
    CuentaComponent,
    UsuariosComponent,
    ModalImgComponent,
    ModalPerfilComponent,
    ModalUsuarioComponent,
    ModalGastoComponent,
    PedidoComponent,
    UsuarioComponent,
    ClientesComponent,
    ClienteComponent,
    ModalClienteComponent,
    ClavesComponent,
    PdfComponent
    
    
  ],
  exports: [
    DashboardComponent,
    PedidosComponent,
    GastosComponent,
    RegistroEnviosComponent,
    RegistroGastosComponent,
    RendimientosComponent,
    Envios2Component,
    PagesComponent,
    ModalImgComponent,
    ModalPerfilComponent,
    ModalUsuarioComponent,
    ModalGastoComponent,
    ModalClienteComponent
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
})
export class PagesModule { }
