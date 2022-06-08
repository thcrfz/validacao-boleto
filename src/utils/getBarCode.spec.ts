import { BarCodeBoletoBancario} from "../interfaces/barCodeBoletoBancario";
import CalculateModuleEleven from "./calculateModuleEleven";
import {checkModuleTenForBoletoConcessionaria, GetCodeBar} from "./getBarCode";
import {ResponseData} from "../interfaces/response";
import {BarCodeBoletoConcessionaria} from "../interfaces/barCodeBoletoConcessionaria";
import {ModuleTenCalculation} from "./module-ten-calculation";

describe('Código de barras do boleto bancário', () => {
    const mock = '00190500954014481606906809350314337370000000100'
    let barCode = {} as BarCodeBoletoBancario;
    barCode.codigoBanco = mock.slice(0, 3);
    barCode.codigoMoeda = mock.slice(3,4)
    barCode.fatorVencimento = mock.slice(33,37);
    barCode.valor = mock.slice(-10);
    barCode.campoLivre = mock.slice(4, 9) + mock.slice(10, 20) + mock.slice(21, 31);
    const dv = CalculateModuleEleven.getDv(barCode.codigoBanco + barCode.codigoMoeda + barCode.fatorVencimento + barCode.valor + barCode.campoLivre)
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

describe('Verificar digito verificador dos campos no modulo 10', () => {
    afterEach(() => jest.clearAllMocks());
    const linhaDigitavel = '846700000017435900240209024050002435842210108119'
    const f1 = linhaDigitavel.slice(0,12);
    const f2 = linhaDigitavel.slice(12,24);
    const f3 = linhaDigitavel.slice(24,36);
    const f4 = linhaDigitavel.slice(36,48);
    it('should f1 return first field', function () {
        expect(f1).toBe('846700000017')
    });
    it('should f2 return second field', function () {
        expect(f2).toBe('435900240209')
    });
    it('should f3 return third field', function () {
        expect(f3).toBe('024050002435')
    });
    it('should f4 return fourth field', function () {
        expect(f4).toBe('842210108119')
    });
    it('should check dv module ten for each field', function () {
        const sut = checkModuleTenForBoletoConcessionaria(f1, f2, f3, f4);
        expect(sut).toBeTruthy();

    });
})

describe('Retorno do codigo de barras de boleto concessionaria', () => {
    const linhaDigitavel = '846700000017435900240209024050002435842210108119'
    const barCode = {} as BarCodeBoletoConcessionaria;

    it('should be Identificação do Produto', function () {
        barCode.idProduto = linhaDigitavel.slice(0, 1);
        expect(barCode.idProduto).toBe('8');
    });
    it('should be Identificação do Segmento ', function () {
        barCode.idSegmento = linhaDigitavel.slice(1, 2);
        expect(barCode.idSegmento).toBe('4');
    });
    it('should be Identificação do valor real ou referência ', function () {
        barCode.idReferencia = linhaDigitavel.slice(2, 3);
        expect(barCode.idReferencia).toBe('6');
    });
    it('should be Valor ', function () {
        barCode.valor = linhaDigitavel.slice(4, 11) + linhaDigitavel.slice(12, 20)
        console.log(barCode.valor.length)
        expect(barCode.valor).toBe('000000143590024');
    });
    it('should be Identificação da Empresa/Órgão ', function () {
        barCode.idEmpresaOrgao = linhaDigitavel.slice(20, 23) + linhaDigitavel.slice(24, 25);
        expect(barCode.idEmpresaOrgao).toBe('0200');
    });
    it('should be Campo livre de utilização da Empresa/Órgão  ', function () {
        barCode.campoLivreEmpresaOrgao = linhaDigitavel.slice(25, 35) + linhaDigitavel.slice(36,47);
        expect(barCode.campoLivreEmpresaOrgao).toBe('240500024384221010811');
    });
    it('should be bar ', function () {
        const code = barCode.idProduto + barCode.idSegmento + barCode.idReferencia + barCode.valor + barCode.idEmpresaOrgao + barCode.campoLivreEmpresaOrgao + '1';
        const sut = new ModuleTenCalculation();
        const spy = jest.spyOn(sut, 'getDV');
        sut.getDV(code);
        expect(spy).toReturnWith(7)
    });


})

