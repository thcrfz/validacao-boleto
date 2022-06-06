import {Request, Response} from "express";
import VerifyDigitModuleTen from "../utils/module-ten-calculation";
import {BarCode} from "../interfaces/barCode";
import CalculateModuleEleven from "../utils/calculateModuleEleven";

export const checkModuleTen = (id: string) => {
    const firstField = id.slice(0,10);
    const secondField = id.slice(10, 21);
    const thirdField = id.slice(21,32);

    const dvOne = VerifyDigitModuleTen.getDV(parseInt(firstField));
    const dvTwo = VerifyDigitModuleTen.getDV(parseInt(secondField));
    const dvThree = VerifyDigitModuleTen.getDV(parseInt(thirdField));

    const firstFieldDV = parseInt(firstField.split('').pop() as string);
    const secondFieldDV = parseInt(secondField.split('').pop() as string);
    const thirdFieldDV = parseInt(thirdField.split('').pop() as string);
    console.log(dvOne, dvTwo, dvThree)
    return dvOne === firstFieldDV && dvTwo === secondFieldDV && dvThree === thirdFieldDV;
}

export const getCodeBar = (id: string) => {
   const barCode = {} as BarCode;

   barCode.codigoBanco = id.slice(0, 3);
   barCode.codigoMoeda = id.slice(3,4)
   barCode.fatorVencimento = id.slice(33,37);
   barCode.valor = id.slice(-10);
   barCode.campoLivre = id.slice(4, 9) + id.slice(10, 20) + id.slice(21, 31);
   barCode.dv = CalculateModuleEleven.getDv(barCode)

   return barCode.codigoBanco + barCode.codigoMoeda + barCode.dv + barCode.fatorVencimento + barCode.valor + barCode.campoLivre;
}

class HomeController {
    index(req: Request, res: Response) {
        const {id} = req.params;
       if (!checkModuleTen(id)){
           res.status(400).send('Código inválido')
       }
       const barCode = getCodeBar(id);
        console.log(barCode)
        return res.status(200).send(`Código válido`)
        // return res.send(id.slice(21, 32))
    }
}

export default new HomeController();
