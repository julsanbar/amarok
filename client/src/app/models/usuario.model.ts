export class Usuario {

    public id: String;
    public nombre: String;
    public licencia: String;
    public usuario: String;
    public codigoPostal: String;
    public direccion: String;
    public dni: String;
    public apellidos: String;
    public telefono: String;
    public nacimiento: Date;
    public email: String;
    public password: String;
    public habilitado: Boolean;
    public tipo: String;
    public pedidos: String[]|undefined;

    constructor(
        id: String,
        nombre: String,
        licencia: String,
        usuario: String,
        codigoPostal: String,
        direccion: String,
        dni: String,
        apellidos: String,
        telefono: String,
        nacimiento: Date,
        email: String,
        password: String,
        habilitado: Boolean,
        tipo: String,
        pedidos: String[]|undefined
        ){

        this.id = id;
        this.nombre = nombre;
        this.licencia = licencia;
        this.usuario = usuario;
        this.codigoPostal = codigoPostal;
        this.direccion = direccion;
        this.dni = dni;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.nacimiento = nacimiento;
        this.email = email;
        this.password = password;
        this.habilitado = habilitado;
        this.tipo = tipo;
        this.pedidos = pedidos;
    
    }


}
