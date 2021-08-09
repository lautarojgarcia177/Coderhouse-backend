enum OperacionesEnumerable {
    suma = 'suma',
    resta = 'resta'
}

const operacion = async (num1: number, num2: number, operacion: OperacionesEnumerable) => {
    switch (operacion) {
        case OperacionesEnumerable.suma:  
            let modulo_operacion_suma = await import('./operacion_suma');
            let Suma = modulo_operacion_suma.default;
            let instancia_operacion_suma = new Suma(num1, num2);
            return instancia_operacion_suma.resultado();
        case OperacionesEnumerable.resta:
            let modulo_operacion_resta = await import('./operacion_resta');
            let Resta = modulo_operacion_resta.default;
            let instancia_operacion_resta = new Resta(num1, num2);
            return instancia_operacion_resta.resultado();
        default: 
            return new Error();
    }
}

(function operaciones() {
    operacion(1,2, OperacionesEnumerable.suma).then(resultado => console.log('suma: ', resultado));
    operacion(1,2, OperacionesEnumerable.resta).then(resultado => console.log('resta: ', resultado));
})();