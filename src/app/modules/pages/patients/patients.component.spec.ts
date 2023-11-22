import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {By} from "@angular/platform-browser";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {delay, of, throwError} from "rxjs";

import {SpyService} from "@common/spy/spy.interfaces";

import {PatientsComponent} from "@pages/patients/patients.component";

import {AbstractPatientsService} from "@infrastructure-services/abstract-patients.service";
import {AbstractContactsService} from "@infrastructure-services/abstract-contacts.service";
import {AbstractMessageService} from "@infrastructure-services/abstract-message.service";

import {ALL_PATIENTS, PATIENT_WITH_CONTACT} from "@mock/data/mock-patients.consts";
import {MOCK_DELAY} from "@mock/data/mock.consts";

import {LoadingModule} from "@widgets/loading/loading.module";

describe('Регистр пациентов', () => {
    /**
     * Initialized for each test
     * */
    let component: PatientsComponent;
    let fixture: ComponentFixture<PatientsComponent>;

    /**
     * fake dependencies
     * */
    const fakeMessageService: SpyService<AbstractMessageService, 'error'> = jasmine.createSpyObj(['message', 'error']);
    const fakePatientService: SpyService<AbstractPatientsService, 'getAllPatient'> = jasmine.createSpyObj(['getAllPatient']);
    const fakeContactsService: SpyService<AbstractContactsService, 'setContacts'> = {
        setContacts: jasmine.createSpy('setContacts').and.returnValue(of(ALL_PATIENTS)),
    };

    beforeEach(async () => {
        fakePatientService.getAllPatient.and.returnValue(of(ALL_PATIENTS));
        fakeContactsService.setContacts.and.returnValue(of(ALL_PATIENTS));

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,

                MatTableModule,
                LoadingModule,
            ],
            declarations: [PatientsComponent],
            providers: [
                {provide: AbstractPatientsService, useValue: fakePatientService},
                {provide: AbstractContactsService, useValue: fakeContactsService},
                {provide: AbstractMessageService, useValue: fakeMessageService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('ngOnInit должен проинициализировать rows$', () => {
        const rows = spyOn(component.rows$, "next");

        component.ngOnInit();

        expect(rows).toHaveBeenCalledWith(ALL_PATIENTS);
    });

    it('ngOnInit должен вызвать метод getAllPatient сервиса AbstractPatientsService', () => {
        component.ngOnInit();

        expect(fakePatientService.getAllPatient).toHaveBeenCalled();
    });

    it('ngOnInit должен вызвать метод setContacts сервиса AbstractContactsService', () => {
        component.ngOnInit();

        expect(fakeContactsService.setContacts).toHaveBeenCalled();
    });

    it('ngOnInit строки не должны меняться, если getAllPatient сервиса AbstractPatientsService вернул ошибку', () => {
        // метод сервиса возвращает ошибку
        fakePatientService.getAllPatient.and.returnValue(throwError(() => 'error: Непредвиденная ошибка'));
        const rows = spyOn(component.rows$, "next");

        component.ngOnInit();

        // проверяем, что строки изменились
        expect(rows).not.toHaveBeenCalled();
    });

    it('ngOnInit должен отправить сообщение error, если getAllPatient сервиса AbstractPatientsService вернул ошибку', () => {
        const message = 'error: Непредвиденная ошибка';

        // метод сервиса возвращает ошибку
        fakePatientService.getAllPatient.and.returnValue(throwError(() => message));
        fakeMessageService.error.calls.reset();

        component.ngOnInit();

        expect(fakeMessageService.error).toHaveBeenCalledWith({title: 'Ошибка!', message});
    });

    it('ngOnInit должен отправить сообщение error, если setContacts сервиса AbstractContactsService вернул ошибку', () => {
        const message = 'error: Непредвиденная ошибка';

        // метод сервиса возвращает ошибку
        fakeContactsService.setContacts.and.returnValue(throwError(() => message));
        fakeMessageService.error.calls.reset();

        component.ngOnInit();

        expect(fakeMessageService.error).toHaveBeenCalledWith({title: 'Ошибка!', message});
    });

    it('ngOnInit должен показать preloader при вызове getAllPatient сервиса AbstractPatientsService', () => {
        fakePatientService.getAllPatient.and.returnValue(of(ALL_PATIENTS).pipe(delay(MOCK_DELAY)));

        const preloader = spyOn(component.preloaderGrid$, 'next');

        component.ngOnInit();

        expect(preloader).toHaveBeenCalledWith(true);
    });

    it('ngOnInit должен скрыть preloader после получения данных из getAllPatient сервиса AbstractPatientsService', fakeAsync(() => {
        fakePatientService.getAllPatient.and.returnValue(of(ALL_PATIENTS).pipe(delay(MOCK_DELAY)));

        component.ngOnInit();
        const preloader = spyOn(component.preloaderGrid$, 'next');

        tick(MOCK_DELAY);

        expect(preloader).toHaveBeenCalledWith(false);
    }));

    it('ngOnInit должен скрыть preloader, если вернулась ошибка из getAllPatient сервиса AbstractPatientsService', () => {
        const message = 'error: Непредвиденная ошибка';

        // метод сервиса возвращает ошибку
        fakePatientService.getAllPatient.and.returnValue(throwError(() => message));
        const preloader = spyOn(component.preloaderGrid$, 'next');

        component.ngOnInit();

        expect(preloader).toHaveBeenCalledWith(false);
    });

    it('ngOnInit должен показать preloader контактов при вызове setContacts сервиса AbstractContactsService', () => {
        fakeContactsService.setContacts.and.returnValue(of([]).pipe(delay(MOCK_DELAY)));

        const preloader = spyOn(component.preloaderContacts$, 'next');

        component.ngOnInit();

        expect(preloader).toHaveBeenCalledWith(true);
    });

    it('ngOnInit должен скрыть preloader контактов после получения данных из setContacts сервиса AbstractContactsService', fakeAsync(() => {
        fakeContactsService.setContacts.and.returnValue(of([]).pipe(delay(MOCK_DELAY)));

        component.ngOnInit();
        const preloader = spyOn(component.preloaderContacts$, 'next');

        tick(MOCK_DELAY);

        expect(preloader).toHaveBeenCalledWith(false);
    }));

    it('ngOnInit должен скрыть preloader контактов, если вернулась ошибка из setContacts сервиса AbstractContactsService', () => {
        const message = 'error: Непредвиденная ошибка';

        // метод сервиса возвращает ошибку
        fakeContactsService.setContacts.and.returnValue(throwError(() => message));
        const preloader = spyOn(component.preloaderContacts$, 'next');

        component.ngOnInit();

        expect(preloader).toHaveBeenCalledWith(false);
    });

    it('контакты пользователя должны отображаться', fakeAsync(() => {
        component.rows$.subscribe({
            next: () => {
                fixture.detectChanges();

                const contact = fixture.debugElement.query(By.css('.contact__row'));

                expect(contact).not.toBeNull();
            },
        });

        component.rows$.next([PATIENT_WITH_CONTACT]);
        fixture.detectChanges();
    }));
});
