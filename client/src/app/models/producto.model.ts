export class Producto {

    public id: String;
    public referencia: Number;
    public categoria: String;
    public nombre: String;
    public descripcion: String;
    public precio: Number;
    public tasa: Number;
    public stock: Number;
    public stockMinimo: Number;
    public proveedores: String[];

    constructor(
        id: String,
        referencia: Number,
        categoria: String,
        nombre: String,
        descripcion: String,
        precio: Number,
        tasa: Number,
        stock: Number,
        stockMinimo: Number,
        proveedores: String[]){

        this.id = id;
        this.referencia = referencia;
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tasa = tasa;
        this.stock = stock;
        this.stockMinimo = stockMinimo;
        this.proveedores = proveedores;
    

    }


}
