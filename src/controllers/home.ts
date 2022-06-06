import {Request, Response} from "express";
import VerifyDigitModuleTen from "../utils/module-ten-calculation";
import CalculateModuleEleven from "../utils/calculateModuleEleven";
import FatorVencimento from "../utils/calculateFatorVencimento";

export const checkModuleTen = (id: string) => {
    const firstField = id.slice(0, 10);
    const secondField = id.slice(10, 21);
    const thirdField = id.slice(21, 32);

    const dvOne = VerifyDigitModuleTen.getDV(parseInt(firstField));
    const dvTwo = VerifyDigitModuleTen.getDV(parseInt(secondField));
    const dvThree = VerifyDigitModuleTen.getDV(parseInt(thirdField));

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
        if (id.length !== 47){
            return res.status(400).send('Linha digitável inválida');
        }

        const barCode = CalculateModuleEleven.getCodeBar(id);
        const date = FatorVencimento.getDate(id);
        const valor = id.slice(-10)
        const valorCode = valor.replace(/^[0]+/,'');
        const valorFormatado = valorCode.substring(0, valorCode.length - 2) + '.' + valorCode.substring(valorCode.length - 2)

        if (barCode.length !== 44){
            return res.status(400).send('Código de barras inválido');
        }
        if (!checkModuleTen(id) || !checkModuleEleven(barCode, id)) {
            return res.status(400).send('Digito verificador inválido')
        }
        return res.status(200).send({
            barCode: barCode,
            amount: valorFormatado,
            expirationDate: date
        })
    }
}

export default new HomeController();
