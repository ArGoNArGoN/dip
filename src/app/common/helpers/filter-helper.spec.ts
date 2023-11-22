import {FilterHelper} from "@common/helpers/filter-helper";

describe('FilterHelper', () => {
    it('isDefined для 0 должен вернуть true', () => {
        expect(FilterHelper.isDefined(0)).toBeTruthy();
    });
    it('isDefined для object должен вернуть true', () => {
        expect(FilterHelper.isDefined({})).toBeTruthy();
    });
    it('isDefined для false должен вернуть true', () => {
        expect(FilterHelper.isDefined(false)).toBeTruthy();
    });
    it('isDefined для true должен вернуть true', () => {
        expect(FilterHelper.isDefined(true)).toBeTruthy();
    });

    it('isDefined для null должен вернуть false', () => {
        expect(FilterHelper.isDefined(null)).not.toBeTruthy();
    });
    it('isDefined для undefined должен вернуть false', () => {
        expect(FilterHelper.isDefined(undefined)).not.toBeTruthy();
    });
})
