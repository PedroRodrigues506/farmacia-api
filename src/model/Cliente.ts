import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; 

class Cliente {

    // Atributos
    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private data_nascimento: number;
    private telefone: string;
    private email: string;
    static cadastrarCliente: any;

    /**
     * Construtor da classe Cliente
     * @param _nome Nome do cliente
     * @param _cpf CPF do cliente
     * @param _telefone Telefone do cliente
     */
    constructor(
        _nome: string,
        _cpf: string,
        _data_nascimento: number,
        _telefone: string,
        _email: string

    ) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.data_nascimento = _data_nascimento;
        this.telefone = _telefone;
        this.email = _email;
    }


    public getIdCliente(): number {
        return this.idCliente;
    }

   
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }


    public getNome(): string {
        return this.nome;
    }

  
    public setNome(nome: string): void {
        this.nome = nome;
    }

   
    public getCpf(): string {
        return this.cpf;
    }

   
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }



    public getdata_nascimento(): number {
        return this.data_nascimento;
    }


    public setdata_nascimento(data_nascimento: number): void {
        this.data_nascimento = data_nascimento;
    }



    public getTelefone(): string {
        return this.telefone;
    }

   
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }


     public getemail(): string {
        return this.email;
    }

     public setemail(email: string): void {
        this.email = email;
    }
 
    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
           
            let listaDeClientes: Array<Cliente> = [];

            
            const querySelectClientes = `SELECT * FROM clientes;`;

           
            const respostaBD = await database.query(querySelectClientes);

          
            respostaBD.rows.forEach((clienteBD) => {
                
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome,
                    clienteBD.cpf,
                    clienteBD.data_nascimento,
                    clienteBD.telefone,
                    clienteBD.email
                );

                
                novoCliente.setIdCliente(clienteBD.id_cliente);

                
                listaDeClientes.push(novoCliente);
            });

            
            return listaDeClientes;
        } catch (error) {
           
            console.error(`Erro na consulta ao banco de dados. ${error}`);

        
            return null;
        }
    }
     static async listarCliente(cpf:number):Promise<Cliente | null>{
        try {
            const querySelectClientes = 'SELECT * FROM clientes WHERE cpf=$1;';

            const respostaBD = await database.query(querySelectClientes, [cpf]);

            if(respostaBD.rowCount != 0) {
                const cliente:  Cliente = new Cliente(
                    respostaBD.rows [0].nome,
                    respostaBD.rows [0].cpf,
                    respostaBD.rows [0].data_nascimento,
                    respostaBD.rows [0].telefone,
                    respostaBD.rows [0].email
                );
                cliente.setCpf(respostaBD.rows[0].cpf);
                
                return cliente;

            }
            return null;

        } catch (error) {
            console.error ('Erro ao buscar cliente no banco de dados. ${error}');
            return null
        }
     }
}

export default Cliente;