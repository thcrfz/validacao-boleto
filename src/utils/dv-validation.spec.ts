import {ModuleTenCalculation} from "./module-ten-calculation";

const sut = ModuleTenCalculation.prototype;

describe('Digito verificador - Field One', () => {
    afterEach(() => jest.clearAllMocks());

    let field = 212900011;

    it('should sum values', () => {
        const sum = jest.spyOn(sut, 'getSumOfDigit');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(25);
    })

    it('should get remainder', () => {
        const sum = jest.spyOn(sut, 'getRemainder');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(5);
    })

    it('should get the next dozen', () => {
        const sum = jest.spyOn(sut, 'getNextDozen');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(10);
    })

    // it('should throw error if field is empty', () => {
    //     sut.getDV(field)
    //     // System under test
    //     expect(sut.getDV(0)).toThrowError();
    // })

    it('should return valid DV', () => {
        sut.getDV(field)
        // System under test
        expect(sut.getDV(field)).toBe(5);
    })

})

describe('Digito verificador - Field Two', () => {
    afterEach(() => jest.clearAllMocks());

    let field = 4014481606;

    it('should sum values', () => {
        const sum = jest.spyOn(sut, 'getSumOfDigit');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(31);
    })

    it('should get remainder', () => {
        const sum = jest.spyOn(sut, 'getRemainder');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(1);
    })

    it('should get the next dozen', () => {
        const sum = jest.spyOn(sut, 'getNextDozen');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(10);
    })

    // it('should throw error if field is empty', () => {
    //     sut.getDV(field)
    //     // System under test
    //     expect(sut.getDV(0)).toThrowError();
    // })

    it('should return valid DV', () => {
        sut.getDV(field)
        // System under test
        expect(sut.getDV(field)).toBe(9);
    })

})

describe('Digito verificador - Field Three', () => {
    afterEach(() => jest.clearAllMocks());

    let field = 680935031;

    it('should sum values', () => {
        const sum = jest.spyOn(sut, 'getSumOfDigit');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(36);
    })

    it('should get remainder', () => {
        const sum = jest.spyOn(sut, 'getRemainder');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(6);
    })

    it('should get the next dozen', () => {
        const sum = jest.spyOn(sut, 'getNextDozen');
        sut.getDV(field)
        // System under test
        expect(sum).toReturnWith(10);
    })

    // it('should throw error if field is empty', () => {
    //     sut.getDV(field)
    //     // System under test
    //     expect(sut.getDV(0)).toThrowError();
    // })

    it('should return valid DV', () => {
        sut.getDV(field)
        // System under test
        expect(sut.getDV(field)).toBe(4);
    })

})

