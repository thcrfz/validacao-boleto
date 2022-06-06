import {BarCode} from "../interfaces/barCode";

export class CalculateModuleEleven{
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

