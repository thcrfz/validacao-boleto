import {BarCode} from "../interfaces/barCode";

export class CalculateModuleEleven{
    getCodeBar = (id: string) => {
        const barCode = {} as BarCode;

        barCode.codigoBanco = id.slice(0, 3);
        barCode.codigoMoeda = id.slice(3,4)
        barCode.fatorVencimento = id.slice(33,37);
        barCode.valor = id.slice(-10);
        barCode.campoLivre = id.slice(4, 9) + id.slice(10, 20) + id.slice(21, 31);
        barCode.dv = String(this.getDv(barCode))

        return barCode.codigoBanco + barCode.codigoMoeda + barCode.dv + barCode.fatorVencimento + barCode.valor + barCode.campoLivre;
    }

    getDv(barCode: BarCode){
        const code = barCode.codigoBanco + barCode.codigoMoeda + barCode.fatorVencimento + barCode.valor + barCode.campoLivre
        let sequencia = [4, 3, 2, 9, 8, 7, 6, 5];
        let digit = 0;
        let j = 0;
        let DAC = 0;

        for (let i = 0; i < code.length; i++) {
            let mult = sequencia[j];
            j++;
            j %= sequencia.length;
            digit += mult * parseInt(code.charAt(i));
        }

        DAC = digit % 11;

        if (DAC == 0 || DAC == 1)
            return 0;
        if (DAC == 10)
            return 1;

        return (11 - DAC);
    }
}

export default new CalculateModuleEleven();

