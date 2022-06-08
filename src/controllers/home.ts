import {Request, Response} from "express";
import VerifyDigitModuleTen from "../utils/module-ten-calculation";
import CalculateModuleEleven from "../utils/calculateModuleEleven";
import FatorVencimento from "../utils/calculateFatorVencimento";
import {BarCode} from "../interfaces/barCode";
import CodeBar from '../utils/getBarCode'

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

        if (id.substring(0, 1) === '8') {
            if (id.substring(2, 1) === '1') {
                BOLETO_TYPE = 'Prefeituras'
            }
            if (id.substring(2, 1) === '2') {
                BOLETO_TYPE = 'Saneamento'
            }
            if (id.substring(2, 1) === '3') {
                BOLETO_TYPE = 'Energia Elétrica e Gás'
            }
            if (id.substring(2, 1) === '4') {
                BOLETO_TYPE = 'Telecomunicações'
            }
            if (id.substring(2, 1) === '5') {
                BOLETO_TYPE = 'Órgãos Governamentais'
            }
            if (id.substring(2, 1) === '6') {
                BOLETO_TYPE = 'CNPJ/Carnes/Outros'
            }
            if (id.substring(2, 1) === '7') {
                BOLETO_TYPE = 'Multas de trânsito'
            }
            if (id.substring(2, 1) === '9') {
                BOLETO_TYPE = 'Banco'
            }
        }
        if (id.substring(3, 4) === '6' || id.substring(3, 4) === '7') {
            MODULO = 10;
        }
        if (id.substring(3, 4) === '8' || id.substring(3, 4) === '9') {
            MODULO = 11;
        }
        if (BOLETO_TYPE === '' || BOLETO_TYPE === '9') {
            const response = CodeBar.getBoletoBancarioCode(id);
            if (response.status == 400) {
                return res.status(400).send('Código inválido')
            }
            console.log(response)
            return res.status(200).send(response)
        }
    }
}

export default new HomeController();
