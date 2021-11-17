import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '' ) || [];

  };

  // menu: any[] = [
  //   {
  //     titulo: 'Gestión de pedidos',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
      
  //       {titulo: 'Envíos', url: 'envios'},
  //         {titulo: 'Gastos', url: 'gastos'},
  //         {titulo: 'Pedidos', url: 'pedidos'}
        
  //     ]
  //   },

  //   {
  //     titulo: 'Registros',
  //     icono: 'mdi mdi-calendar',
  //     submenu: [
      
  //         {titulo: 'Balances del mes', url: 'balance'},
  //         {titulo: 'Histórico', url: 'historico'},
  //         {titulo: 'Rendimientos', url: 'rendimientos'}
        
  //     ]  
  //   },

  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
      
  //         {titulo: 'Clientes', url: 'clientes'},
  //         {titulo: 'Usuarios', url: 'usuarios'},
          
  //     ]  
  //   }
  // ]
  
  // menu2: any[] = [

  //   {
  //     titulo: 'Registros',
  //     icono: 'mdi mdi-calendar',
  //     submenu2: [
      
  //         {titulo: 'Balances del mes', url: 'balance'},
  //         {titulo: 'Histórico', url: 'historico'},
  //         {titulo: 'Rendimientos', url: 'rendimientos'}
        
  //     ]
  //   }
  // ]
  

  
}
