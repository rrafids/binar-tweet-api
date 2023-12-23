"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("../formatter");
describe('formatToRupiah', () => {
    it('should return a list of Tweets', () => {
        const moneyAmount = '15000';
        const moneyRupiahFormatted = (0, formatter_1.formatToRupiah)(moneyAmount);
        expect(moneyRupiahFormatted).toEqual(`Rp ${moneyAmount}`);
    });
});
