// Interface para sacar info, de quien genero el pedido
interface _PedidoUser {
    _id: string,
    nombre: string,
    apellido: string
    img: string
}


export class Pedidos {

    constructor(
        
        public nombreCliente: string,
        public mailCliente: string,
        public diaRetiro: Date,
        public domicilioRetiro: string,
        public telEntregaPaq: string,
        public estadoRetiro: string,
        public diaEntrega: Date,
        public domicilioEntrega: string,
        public telRecibePaq: string,
        public estadoEntrega: string,
        public costoEnvio: number,
        public observaciones: string,
        public _id?: string,
        public usuario?: _PedidoUser
    ){}

    
}