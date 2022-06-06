export class CalculateFatorVencimento{
    fatorVencimento: string | undefined
    getDate(id: string){
        const fatorVencimento = id.slice(33,37);
        const date = new Date('10/07/1997');
        date.setTime(date.getTime() + (parseInt(fatorVencimento) * 24 * 60 * 60 * 1000 ));
        return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2)  ;
    }
}
