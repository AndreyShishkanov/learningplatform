import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        compiled = fixture.debugElement.nativeElement;
    });

    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it('should include app-header', () => {
        expect(compiled.querySelector('app-header')).toBeDefined();
    });
    it('should include app-sidebar', () => {
        expect(compiled.querySelector('app-sidebar')).toBeDefined();
    });
    it('should include router-outlet', () => {
        expect(compiled.querySelector('router-outlet')).toBeDefined();
    });
});
