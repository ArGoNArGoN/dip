type GetFunctionOnType<TService, VMethods extends keyof TService> = {
    [PMethod in keyof TService]: TService[PMethod] extends Function ? PMethod extends VMethods ? PMethod : never : never
}[keyof TService];

type GetOnlyFunctionOnType<TService, VMethods extends keyof TService> = Pick<TService, GetFunctionOnType<TService, VMethods>>;

type ToSpyFunctions<TService> = {
    [VMethod in keyof TService]: jasmine.Spy<jasmine.Func>;
};

export type SpyService<TService, VMethods extends keyof TService> = ToSpyFunctions<GetOnlyFunctionOnType<TService, VMethods>>;

