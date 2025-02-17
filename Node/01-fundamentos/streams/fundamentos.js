// Importa o módulo 'stream' do Node.js
const { Readable } = require('stream');

// Cria uma classe que herda de Readable, que é uma classe do módulo 'stream'
class OneToOneHundredStream extends Readable {
    // O construtor da classe é chamado quando uma instância dela é criada
    constructor() {
        // Chama o construtor da classe pai (Readable)
        super();
        // Inicializa o contador para 1
        this.index = 1;
    }

    // O método _read() é chamado quando a stream precisa de dados
    _read() {
        // Incrementa o contador
        const i = this.index++;
        // Verifica se o contador já ultrapassou o valor 100
        if (i > 100) {
            // Finaliza a stream quando chegar ao número 100
            this.push(null);
        } else {
            // Converte o número atual para um buffer e o envia para a stream
            const buff = Buffer.from(String(i));
            this.push(buff);
        }
    }
}


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        // Converte o chunk para número
        const number = Number(chunk.toString());

        // Transforma o dado (inverte o sinal)
        const transformed = number * -1;

        // Envia o dado transformado para o próximo pipe
        callback(null, Buffer.from(String(transformed)));
    }
}

class MultiplyByTenStream extends Readable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    
    }

}

new OneToOneHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());