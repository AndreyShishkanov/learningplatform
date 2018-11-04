import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {AuthenticationService} from '@shared/services/auth/authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let authService: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(
                    [{path: '', component: HomeComponent}]
                )
            ],
            declarations: [
                HomeComponent
            ]
        });
        authService = TestBed.get(AuthenticationService);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        authService = null;
        component = null;
    });

    it('should create the home component', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should get user name',
        inject(
            [HttpTestingController, AuthenticationService],
            (httpMock: HttpTestingController, service: AuthenticationService) => {
        const mockReq = httpMock.expectOne('/api/currentUser');
        mockReq.flush({name: 'userName'});

        component.ngOnInit();

        expect(component.name).toBe('userName');
        fixture.detectChanges();


        httpMock.verify();
    }));
});
