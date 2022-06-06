import {CalculateModuleEleven} from "./calculateModuleEleven";

describe('Digito verificador modulo 11', () => {
    afterEach(() => jest.clearAllMocks());
    const sut = new CalculateModuleEleven();
    it('should get the bar code', function () {
        const id = '21290001192110001210904475617405975870000002000'
        const getBarCode = jest.spyOn(sut, 'getCodeBar');
        sut.getCodeBar(id);
        expect(getBarCode).toReturnWith('21299758700000020000001121100012100447561740')
    });

})
