import {Request, Response} from "express";
import VerifyDigitModuleTen from "../utils/module-ten-calculation";
import CalculateModuleEleven from "../utils/calculateModuleEleven";
import FatorVencimento from "../utils/calculateFatorVencimento";
import {BarCode} from "../interfaces/barCode";

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

class HomeController {
    index(req: Request, res: Response) {
        const {id} = req.params;

        let CODE_TYPE = '';
        let BOLETO_TYPE = '';
        let MODULO = 0;

        if (id.length === 47 || id.length === 48) {
            CODE_TYPE = 'LINHA DIGITAVEL'
        } else if (id.length === 44) {
            CODE_TYPE = 'CODIGO DE BARRAS'
        } else {
            return res.status(400).send('Linha digitável inválida');
        }

        if (id.substring(0, 1) === '8'){
            if (id.substring(2, 1) === '1'){
                BOLETO_TYPE = 'Prefeituras'
            }
            if (id.substring(2, 1) === '2'){
                BOLETO_TYPE = 'Saneamento'
            }
            if (id.substring(2, 1) === '3'){
                BOLETO_TYPE = 'Energia Elétrica e Gás'
            }
            if (id.substring(2, 1) === '4'){
                BOLETO_TYPE = 'Telecomunicações'
            }
            if (id.substring(2, 1) === '5'){
                BOLETO_TYPE = 'Órgãos Governamentais'
            }
            if (id.substring(2, 1) === '6'){
                BOLETO_TYPE = 'CNPJ/Carnes/Outros'
            }
            if (id.substring(2, 1) === '7'){
                BOLETO_TYPE = 'Multas de trânsito'
            } if (id.substring(2, 1) === '9'){
                BOLETO_TYPE = 'Banco'
            }
        }
        if (id.substring(3,4) === '6' || id.substring(3, 4) === '7'){
            MODULO = 10;
        }
        if (id.substring(3, 4) === '8' || id.substring(3, 4) === '9'){
            MODULO = 11;
        }
        if (BOLETO_TYPE === '' || BOLETO_TYPE === '9'){
            const barCode = {} as BarCode;

            barCode.codigoBanco = id.slice(0, 3);
            barCode.codigoMoeda = id.slice(3,4)
            barCode.fatorVencimento = id.slice(33,37);
            barCode.valor = id.slice(-10);
            barCode.campoLivre = id.slice(4, 9) + id.slice(10, 20) + id.slice(21, 31);
            const dv = CalculateModuleEleven.getDv(barCode)
            barCode.dv = dv == 0 || dv == 10 || dv == 11 ? '1' : dv.toString();

            const bc = barCode.codigoBanco + barCode.codigoMoeda + barCode.dv + barCode.fatorVencimento + barCode.valor + barCode.campoLivre;
            const date = FatorVencimento.getDate(id.slice(33,37));
            const valor = id.slice(-10)
            const valorCode = valor.replace(/^[0]+/, '');
            const valorFormatado = valorCode.substring(0, valorCode.length - 2) + '.' + valorCode.substring(valorCode.length - 2)

            const firstField = id.slice(0, 10);
            const secondField = id.slice(10, 21);
            const thirdField = id.slice(21, 32);

            if (bc.length !== 44) {
                return res.status(400).send('Código de barras inválido');
            }
            if (!checkModuleTen(firstField, secondField, thirdField) || !checkModuleEleven(bc, id)) {
                return res.status(400).send('Digito verificador inválido')
            }
            return res.status(200).send({
                barCode: bc,
                amount: valorFormatado,
                expirationDate: date
            })
        }
    }
}

export default new HomeController();
