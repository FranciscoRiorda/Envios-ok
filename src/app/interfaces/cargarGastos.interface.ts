import { Gastos } from '../models/gastos.model';


export interface CargarGastos {
    total: number;
    sumatoria: number;
    gastos: Gastos[];
}
