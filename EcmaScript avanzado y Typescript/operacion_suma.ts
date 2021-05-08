import { Operacion } from './operacion';

export default class Suma extends Operacion {

    constructor(num1: number, num2: number) {
        super(num1, num2);
    }

    public resultado(): number {
        return this.num1 + this.num2;
    }
}