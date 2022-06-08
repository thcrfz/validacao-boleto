import VerifyDigitModuleTen from "./module-ten-calculation";
import {ResponseData} from "../interfaces/response";
import {BarCodeBoletoBancario} from "../interfaces/barCodeBoletoBancario";
import CalculateModuleEleven from "./calculateModuleEleven";
import FatorVencimento from "./calculateFatorVencimento";
import {BarCodeBoletoConcessionaria} from "../interfaces/barCodeBoletoConcessionaria";

export const checkModuleTenForBoletoBancario = (firstField: string, secondField: string, thirdField: string) => {
    const dvOne = VerifyDigitModuleTen.getDV(firstField);
    const dvTwo = VerifyDigitModuleTen.getDV(secondField);
    const dvThree = VerifyDigitModuleTen.getDV(thirdField);

    const firstFieldDV = parseInt(firstField.split('').pop() as string);
    const secondFieldDV = parseInt(secondField.split('').pop() as string);
    const thirdFieldDV = parseInt(thirdField.split('').pop() as string);
    return dvOne === firstFieldDV && dvTwo === secondFieldDV && dvThree === thirdFieldDV;
}
export const checkModuleTenForBoletoConcessionaria  = (firstField: string, secondField: string, thirdField: string, fourthField: string) => {
    const dvOne = VerifyDigitModuleTen.getDV(firstField);
    const dvTwo = VerifyDigitModuleTen.getDV(secondField);
    const dvThree = VerifyDigitModuleTen.getDV(thirdField);
    const dvFour = VerifyDigitModuleTen.getDV(fourthField);


    const firstFieldDV = parseInt(firstField.split('').pop() as string);
    const secondFieldDV = parseInt(secondField.split('').pop() as string);
    const thirdFieldDV = parseInt(thirdField.split('').pop() as string);
    const fourthFieldDV = parseInt(fourthField.split('').pop() as string);

    return dvOne === firstFieldDV && dvTwo === secondFieldDV && dvThree === thirdFieldDV && dvFour === fourthFieldDV;
}

export const checkModuleElevenForBoletoBancario = (barCode: string, id: string) => {
    return barCode.slice(4, 5) === id.slice(32, 33);
}

export class GetCodeBar {
    getBoletoBancarioCode(id: string): any {
        const barCode = {} as BarCodeBoletoBancario;
        const response = {} as ResponseData

        barCode.codigoBanco = id.slice(0, 3);
        barCode.codigoMoeda = id.slice(3, 4)
        barCode.fatorVencimento = id.slice(33, 37);
        barCode.valor = id.slice(-10);
        barCode.campoLivre = id.slice(4, 9) + id.slice(10, 20) + id.slice(21, 31);
        const dv = CalculateModuleEleven.getDv(barCode.codigoBanco + barCode.codigoMoeda + barCode.fatorVencimento + barCode.valor + barCode.campoLivre);
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
        if (!checkModuleTenForBoletoBancario(firstField, secondField, thirdField) || !checkModuleElevenForBoletoBancario(bc, id)) {
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
    getBoletoConcenssionaria(linhaDigitavel: string, modulo: any){
        const barCode = {} as BarCodeBoletoConcessionaria;
        const response = {} as ResponseData
        let code = ''
        barCode.idProduto = linhaDigitavel.slice(0, 1);
        barCode.idSegmento = linhaDigitavel.slice(1, 2);
        barCode.idReferencia = linhaDigitavel.slice(2, 3);
        barCode.valor = linhaDigitavel.slice(4, 11) + linhaDigitavel.slice(12, 20);
        barCode.idEmpresaOrgao = linhaDigitavel.slice(20, 23) + linhaDigitavel.slice(24, 25);
        barCode.campoLivreEmpresaOrgao = linhaDigitavel.slice(25, 35) + linhaDigitavel.slice(36,47);
        if (modulo == 10){
            code = barCode.idProduto + barCode.idSegmento + barCode.idReferencia + barCode.valor + barCode.idEmpresaOrgao + barCode.campoLivreEmpresaOrgao + '1';
            barCode.digitoVerificador = String(VerifyDigitModuleTen.getDV(code))
        }

        const bc = barCode.idProduto + barCode.idSegmento + barCode.idReferencia + barCode.digitoVerificador + barCode.valor + barCode.idEmpresaOrgao + barCode.campoLivreEmpresaOrgao

        const valor = barCode.valor
        const valorCode = valor.replace(/^[0]+/, '');
        const valorFormatado = valorCode.substring(0, valorCode.length - 2) + '.' + valorCode.substring(valorCode.length - 2)
        console.log(valorFormatado)

        const f1 = linhaDigitavel.slice(0,12);
        const f2 = linhaDigitavel.slice(12,24);
        const f3 = linhaDigitavel.slice(24,36);
        const f4 = linhaDigitavel.slice(36,48);

        if (bc.length !== 44) {
            response.status = 400
            return response;
        }
        if (!checkModuleTenForBoletoConcessionaria(f1, f2, f3, f4)) {
            response.status = 400
            return response;
        }
        response.barCode = bc;
        response.amount = valorFormatado;
        response.status = 200;

        return response;



    }
}

export default new GetCodeBar();
