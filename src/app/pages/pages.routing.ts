import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { RegistroEnviosComponent } from './registroEnvios/registroEnvios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Envios2Component } from './envios2/envios2.component';
import { GastosComponent } from './gastos/gastos.component';
import { RegistroGastosComponent } from './registroGastos/registroGastos.component';
import { PagesComponent } from './pages.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RendimientosComponent } from './rendimientos/rendimientos.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PedidoComponent } from './pedidos/pedido.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { ClavesComponent } from './mantenimientos/usuarios/claves.component';
import { AdminGuard } from '../guards/admin.guard';
import { PdfComponent } from './pdf/pdf.component';
import { TerminosYCondicionesComponent } from '../auth/terminos-y-condiciones.component';
import { TerminosGuard } from '../guards/terminos.guard';



const routes: Routes = [

  //canActivate debe pasar por el guard para validar el token y que nos permita navegar a cada una de las páginas detalladas abajo.

    {path:'dashboard',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {path:'', component: DashboardComponent, data: {titulo: ''}},
    //Mi cuenta
    {path:'cuenta', canActivate: [TerminosGuard], component: CuentaComponent, data: {titulo: 'Mi Cuenta'}},
    //Gestión de pedidos
    // {path:'envios2', component: Envios2Component, data: {titulo: 'Envíos2'}},
    {path:'gastos', canActivate: [TerminosGuard], component: GastosComponent, data: {titulo: 'Últimos gastos'}},
    {path:'pedidos', canActivate: [TerminosGuard], component: PedidosComponent, data: {titulo: 'Envíos en curso'}},
    {path:'pedidos/:id', canActivate: [TerminosGuard], component: PedidoComponent, data: {titulo: 'Actualizar Envío'}},
    {path:'remito/:id', canActivate: [TerminosGuard], component: PdfComponent, data: {titulo: 'Remito'}},
    
    //Manteniminetos
    {path:'usuarios/claves/:id', canActivate: [TerminosGuard], component: ClavesComponent, data: {titulo: 'Mantenimiento de claves'}},
    {path:'clientes', canActivate: [TerminosGuard], component: ClientesComponent, data: {titulo: 'Mantenimiento de clientes'}},
    {path:'clientes/:id', canActivate: [TerminosGuard], component: ClienteComponent, data: {titulo: 'Mantenimiento del cliente'}},
    {path:'terminosYcondiciones', component: TerminosYCondicionesComponent, data: {titulo: 'Términos y condiciones'}},
    
    //Rutas de Admin
    {path:'usuarios', canActivate: [TerminosGuard, AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
    {path:'usuarios/:id', canActivate: [TerminosGuard, AdminGuard], component: UsuarioComponent, data: {titulo: 'Mantenimiento del usuario'}},
    //Registros
    {path:'registroEnvios', canActivate: [TerminosGuard, AdminGuard], component: RegistroEnviosComponent, data: {titulo: 'Registros de Envíos'}},
    {path:'registroGastos', canActivate: [TerminosGuard, AdminGuard], component: RegistroGastosComponent, data: {titulo: 'Registro de gastos'}},
    {path:'rendimientos', canActivate: [TerminosGuard, AdminGuard], component: RendimientosComponent, data: {titulo: 'Tablero de control'}},
  ]
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
