import {ModuleTenCalculation} from "./module-ten-calculation";

const sut = ModuleTenCalculation.prototype;

describe('Verificar digito verificador dos 3 primeiros campos linhas digitaveis do boleto bancário', () => {
    const f1 = '001905009';
    const f2 = '40144816069';
    const f3 = '06809350314';

    describe('Digito verificador - Field One', () => {
        afterEach(() => jest.clearAllMocks());
        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(25);
        })
        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(5);
        })
        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f1)
            // System under test
            expect(sut.getDV(f1)).toBe(5);
        })
    })

    describe('Digito verificador - Field Two', () => {
        afterEach(() => jest.clearAllMocks());

        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(31);
        })
        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(1);
        })
        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f2)
            // System under test
            expect(sut.getDV(f2)).toBe(9);
        })
    })

    describe('Digito verificador - Field Three', () => {
        afterEach(() => jest.clearAllMocks());

        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(36);
        })

        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(6);
        })

        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f3)
            // System under test
            expect(sut.getDV(f3)).toBe(4);
        })

    })
})

describe('Verificar digito verificador dos campos dos boletos tipo convenio', () => {
    const f1 = '846700000017';
    const f2 = '435900240209';
    const f3 = '024050002435';
    const f4 = '842210108119';


    describe('Digito verificador - Field One', () => {
        afterEach(() => jest.clearAllMocks());
        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(23);
        })
        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(3);
        })
        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f1)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f1)
            // System under test
            expect(sut.getDV(f1)).toBe(7);
        })
    })

    describe('Digito verificador - Field Two', () => {
        afterEach(() => jest.clearAllMocks());

        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(31);
        })
        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(1);
        })
        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f2)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f2)
            // System under test
            expect(sut.getDV(f2)).toBe(9);
        })
    })

    describe('Digito verificador - Field Three', () => {
        afterEach(() => jest.clearAllMocks());

        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(25);
        })

        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(5);
        })

        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f3)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f3)
            // System under test
            expect(sut.getDV(f3)).toBe(5);
        })

    })

    describe('Digito verificador - Field four', () => {
        afterEach(() => jest.clearAllMocks());

        it('should sum values', () => {
            const sum = jest.spyOn(sut, 'getSumOfDigit');
            sut.getDV(f4)
            // System under test
            expect(sum).toReturnWith(31);
        })

        it('should get remainder', () => {
            const sum = jest.spyOn(sut, 'getRemainder');
            sut.getDV(f4)
            // System under test
            expect(sum).toReturnWith(1);
        })

        it('should get the next dozen', () => {
            const sum = jest.spyOn(sut, 'getNextDozen');
            sut.getDV(f4)
            // System under test
            expect(sum).toReturnWith(10);
        })
        it('should return valid DV', () => {
            sut.getDV(f4)
            // System under test
            expect(sut.getDV(f4)).toBe(9);
        })

    })
})

describe('Digito verificador geral para o boleto de concessionaria', () => {
    afterEach(() => jest.clearAllMocks());
    const field = '84600000014359002402002405000243842210108114'
    it('should return 7 as valid digit', function () {
        sut.getDV(field);
        // System under test
        expect(sut.getDV(field)).toBe(7);
    });
})


