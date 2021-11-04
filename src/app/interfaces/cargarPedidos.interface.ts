import { Pedidos } from "../models/pedidos.model";



export interface CargarPedidos {
    total: number;
    pedidos: Pedidos[];
}
