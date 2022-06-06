import {CalculateFatorVencimento} from "./calculateFatorVencimento";

describe('Calcular fator vencimento', () => {
    afterEach(() => jest.clearAllMocks());
    const sut = new CalculateFatorVencimento();
    it('should return correct expiration code', () => {
        const field = '21290001192110001210904475617405975870000002000'
        const getDate = jest.spyOn(sut, 'getDate');
        sut.getDate(field);
        expect(getDate.mockName('fatorVencimento')).toBe('7587');
    })
    it('should return correct date expiration', () => {
        const field = '21290001192110001210904475617405975870000002000'
        const getDate = jest.spyOn(sut, 'getDate');
        sut.getDate(field);
        expect(getDate).toReturnWith('2018-07-16')
    });
})
