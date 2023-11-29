import {FilterHelper} from "@common/helpers/filter-helper";

describe('FilterHelper', () => {
    it('isDefined для 0 должен вернуть true', () => {
        const object = 0;

        const result = FilterHelper.isDefined(object);

        expect(result).toBeTruthy();
    });
    it('isDefined для object должен вернуть true', () => {
        const object = {};

        const result = FilterHelper.isDefined(object);

        expect(result).toBeTruthy();
    });
    it('isDefined для false должен вернуть true', () => {
        const object = false;

        const result = FilterHelper.isDefined(object);

        expect(result).toBeTruthy();
    });
    it('isDefined для true должен вернуть true', () => {
        const object = true;

        const result = FilterHelper.isDefined(object);

        expect(result).toBeTruthy();
    });

    it('isDefined для null должен вернуть false', () => {
        const object = null;

        const result = FilterHelper.isDefined(object);

        expect(result).not.toBeTruthy();
    });
    it('isDefined для undefined должен вернуть false', () => {
        const object = undefined;

        const result = FilterHelper.isDefined(object);

        expect(result).not.toBeTruthy();
    });
})
