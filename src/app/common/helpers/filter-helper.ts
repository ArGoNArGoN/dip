export class FilterHelper {
    public static isDefined<T>(argument: T | undefined | null): argument is T {
        return argument !== undefined && argument !== null;
    }
}
