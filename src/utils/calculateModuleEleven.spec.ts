import {CalculateModuleEleven} from "./calculateModuleEleven";

describe('Digito verificador modulo 11', () => {
    afterEach(() => jest.clearAllMocks());
    const sut = new CalculateModuleEleven();
    it('should get the bar code', function () {
        const id = '21290001192110001210904475617405975870000002000'

    });

})

describe('Digito verificador geral para o boleto de concessionaria', () => {
    afterEach(() => jest.clearAllMocks());
    const sut = new CalculateModuleEleven();
    const field = '84600000014359002402002405000243842210108114'
    it('should return 7 as valid digit', function () {
        sut.getDv(field);
        // System under test
        expect(sut.getDv(field)).toBe(7);
    });
})
