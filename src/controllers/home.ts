import {Request, Response} from "express";
import VerifyDigitModuleTen from "../utils/module-ten-calculation";

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
    return dvOne === firstFieldDV && dvTwo === secondFieldDV && dvThree === thirdFieldDV;
}

class HomeController {
    index(req: Request, res: Response) {
        const {id} = req.params;
        console.log(id.length)
       if (!checkModuleTen(id)){
           res.status(400).send('Código inválido')
       }
        return res.status(200).send(`Código válido`)
        // return res.send(id.slice(21, 32))
    }
}

export default new HomeController();
