import {ModuleTen} from "../interfaces/module-ten";

export class ModuleTenCalculation {

    private calculateFieldOfNumber(field: string[]): number[] {
        let array: number[] = [];

        field.reverse().map((value, index) => {
            const digit = parseInt(value);
            const result = index % 2 === 0 ? digit * 2 : digit;
            return result >= 10 ? result.toString().split('').map((r) => array.push(parseInt(r))) : array.push(result);
        });
        return array;
    }

    getSumOfDigit(numbers: number[]): number {
        return numbers.reduce((ac, value) => ac + value);
    }

    getRemainder(number: number): number {
        return number % 10;
    }

    getNextDozen(number: number): number {
        return Math.ceil(number / 10) * 10;
    }

    getDV(number: string): number {
        let sum = 0;
        let remainder = 0;
        let dozen = 0
        const field = number.split('');
        field.pop();
        console.log(field)
        const array = this.calculateFieldOfNumber(field);
        if (array.length) {
            sum = this.getSumOfDigit(array);
            remainder = this.getRemainder(sum);
            dozen = this.getNextDozen(remainder);
        } else {
            throw Error('Campo inválido');
        }

        return dozen - remainder
    }
}
export default new ModuleTenCalculation();
