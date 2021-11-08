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
import { TerminosCondicionesComponent } from './mantenimientos/terminosCondiciones.component';



const routes: Routes = [

  //canActivate debe pasar por el guard para validar el token y que nos permita navegar a cada una de las páginas detalladas abajo.

    {path:'dashboard',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {path:'', component: DashboardComponent, data: {titulo: 'Inicio'}},
    //Mi cuenta
    {path:'cuenta', component: CuentaComponent, data: {titulo: 'Mi Cuenta'}},
    //Gestión de pedidos
    // {path:'envios2', component: Envios2Component, data: {titulo: 'Envíos2'}},
    {path:'gastos', component: GastosComponent, data: {titulo: 'Últimos gastos'}},
    {path:'pedidos', component: PedidosComponent, data: {titulo: 'Envíos en curso'}},
    {path:'pedidos/:id', component: PedidoComponent, data: {titulo: 'Actualizar Envío'}},
    
    //Manteniminetos
    {path:'usuarios/claves/:id', component: ClavesComponent, data: {titulo: 'Mantenimiento de claves'}},
    {path:'clientes', component: ClientesComponent, data: {titulo: 'Mantenimiento de clientes'}},
    {path:'clientes/:id', component: ClienteComponent, data: {titulo: 'Mantenimiento del cliente'}},
    {path:'terminosYcondiciones', component: TerminosCondicionesComponent, data: {titulo: 'Términos y condiciones'}},
    
    //Rutas de Admin
    {path:'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
    {path:'usuarios/:id', canActivate: [AdminGuard], component: UsuarioComponent, data: {titulo: 'Mantenimiento del usuario'}},
              //Registros
    {path:'registroEnvios', canActivate: [AdminGuard], component: RegistroEnviosComponent, data: {titulo: 'Registros de Envíos'}},
    {path:'registroGastos', canActivate: [AdminGuard], component: RegistroGastosComponent, data: {titulo: 'Registro de gastos'}},
    {path:'rendimientos', canActivate: [AdminGuard], component: RendimientosComponent, data: {titulo: 'Tablero de control'}},
  ]
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
