import VerifyDigitModuleTen from "./module-ten-calculation";
import {ResponseData} from "../interfaces/response";
import {BarCode} from "../interfaces/barCode";
import CalculateModuleEleven from "./calculateModuleEleven";
import FatorVencimento from "./calculateFatorVencimento";

export const checkModuleTen = (firstField: string, secondField: string, thirdField: string) => {
    const dvOne = VerifyDigitModuleTen.getDV(firstField);
    const dvTwo = VerifyDigitModuleTen.getDV(secondField);
    const dvThree = VerifyDigitModuleTen.getDV(thirdField);

    console.log(dvOne, dvTwo, dvThree)

    const firstFieldDV = parseInt(firstField.split('').pop() as string);
    const secondFieldDV = parseInt(secondField.split('').pop() as string);
    const thirdFieldDV = parseInt(thirdField.split('').pop() as string);
    return dvOne === firstFieldDV && dvTwo === secondFieldDV && dvThree === thirdFieldDV;
}


export const checkModuleEleven = (barCode: string, id: string) => {
    return barCode.slice(4, 5) === id.slice(32, 33);
}

export class GetCodeBar {
    getBoletoBancarioCode(id: string): any {
        const barCode = {} as BarCode;
        const response = {} as ResponseData

        barCode.codigoBanco = id.slice(0, 3);
        barCode.codigoMoeda = id.slice(3, 4)
        barCode.fatorVencimento = id.slice(33, 37);
        barCode.valor = id.slice(-10);
        barCode.campoLivre = id.slice(4, 9) + id.slice(10, 20) + id.slice(21, 31);
        const dv = CalculateModuleEleven.getDv(barCode)
        barCode.dv = dv == 0 || dv == 10 || dv == 11 ? '1' : dv.toString();

        const bc = barCode.codigoBanco + barCode.codigoMoeda + barCode.dv + barCode.fatorVencimento + barCode.valor + barCode.campoLivre;
        const date = FatorVencimento.getDate(id.slice(33, 37));
        const valor = id.slice(-10)
        const valorCode = valor.replace(/^[0]+/, '');
        const valorFormatado = valorCode.substring(0, valorCode.length - 2) + '.' + valorCode.substring(valorCode.length - 2)

        const firstField = id.slice(0, 10);
        const secondField = id.slice(10, 21);
        const thirdField = id.slice(21, 32);

        if (bc.length !== 44) {
            response.status = 400
            return response;
        }
        if (!checkModuleTen(firstField, secondField, thirdField) || !checkModuleEleven(bc, id)) {
            response.status = 400
            return response;
        }
        console.log(bc)
        response.barCode = bc;
        response.amount = valorFormatado;
        response.expirationDate = date;
        response.status = 200;
        // console.log(response)
        return response;
    }
}

export default new GetCodeBar();
