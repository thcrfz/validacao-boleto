import {BarCode} from "../interfaces/barCode";
import CalculateModuleEleven from "./calculateModuleEleven";
import getBarCode, {GetCodeBar} from "./getBarCode";
import {ResponseData} from "../interfaces/response";

describe('Código de barras do boleto bancário', () => {
    const mock = '00190500954014481606906809350314337370000000100'
    let barCode = {} as BarCode;
    barCode.codigoBanco = mock.slice(0, 3);
    barCode.codigoMoeda = mock.slice(3,4)
    barCode.fatorVencimento = mock.slice(33,37);
    barCode.valor = mock.slice(-10);
    barCode.campoLivre = mock.slice(4, 9) + mock.slice(10, 20) + mock.slice(21, 31);
    const dv = CalculateModuleEleven.getDv(barCode)
    barCode.dv = dv == 0 || dv == 10 || dv == 11 ? '1' : dv.toString();
    const bc = barCode.codigoBanco + barCode.codigoMoeda + barCode.dv + barCode.fatorVencimento + barCode.valor + barCode.campoLivre;

    it('should codigoBanco be the 3 first index', function () {
        expect(barCode.codigoBanco).toBe('001')
    });
    it('should codigoMoeda be the 4 index ', function () {
        expect(barCode.codigoMoeda).toBe('9')
    });
    it('should return Fator de Vencimento ', function () {
        expect(barCode.fatorVencimento).toBe('3737')
    });
    it('should return valor', function () {
        expect(barCode.valor).toBe('0000000100')
    });
    it('should return campoLivre  ', function () {
        expect(barCode.campoLivre).toBe('0500940144816060680935031')
    });
    it('should return dv', function () {
        expect(barCode.dv).toBe('3')
    });
    it('should return code bar', function () {
        expect(bc).toBe('00193373700000001000500940144816060680935031')
    });
})

describe('Retorno do codigo de barras de boleto bancario', () => {
    const sut = new GetCodeBar();
    const mock = '00190500954014481606906809350314337370000000100'
    const response = {} as ResponseData
    response.barCode = '00193373700000001000500940144816060680935031';
    response.amount = '1.00';
    response.expirationDate = '2007-12-31';
    response.status = 200;
    it('should return response', function () {
        const spy = jest.spyOn(sut, 'getBoletoBancarioCode');
        sut.getBoletoBancarioCode(mock);
        expect(spy).toReturnWith(response)
    });


})
