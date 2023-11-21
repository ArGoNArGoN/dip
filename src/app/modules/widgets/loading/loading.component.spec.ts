import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingComponent} from './loading.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('создан', () => {
        expect(component).toBeTruthy();
    });

    it('должен отображаться spinner при loading = true', () => {
        component.loading = true;
        fixture.detectChanges(); // заставляем обновить шаблон

        const preloader = fixture.debugElement.query(By.css('.spinner'));

        expect(preloader).not.toBeNull();
    });

    it('НЕ должен отображаться spinner при loading = null', () => {
        component.loading = null;
        fixture.detectChanges(); // заставляем обновить шаблон

        const preloader = fixture.debugElement.query(By.css('.spinner'));

        expect(preloader).toBeNull();
    });

    it('НЕ должен отображаться spinner при loading = false', () => {
        component.loading = false;
        fixture.detectChanges(); // заставляем обновить шаблон

        const preloader = fixture.debugElement.query(By.css('.spinner'));

        expect(preloader).toBeNull();
    });
});
