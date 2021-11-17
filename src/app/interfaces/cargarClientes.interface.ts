import { Clientes } from '../models/clientes.model';


export interface CargarClientes {
    nombre: string,
    dni: string,
    telefono: string,
    email: string,
    domicilio: string,
    observaciones: string,
    _id?: string,
    usuario?: string,
    total: number;
    clientes: Clientes[];
}
