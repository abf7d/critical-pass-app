import { TestBed } from '@angular/core/testing';
import { DashboardService, DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN, ZametekApiService } from '@critical-pass/shared/data-access';
import { TimeCostComponent } from './time-cost.component';
import { TimeCostModule } from './time-cost.module';
import { Observable, of } from 'rxjs';
import { Project } from '@critical-pass/project/types';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

describe(TimeCostComponent.name, () => {
    beforeEach(() => {
        const zametek = {
            compileMsProject(file: File): Observable<Project | null> {
                return of(null);
            },
            compileArrowGraph(project: Project): Observable<Project | null> {
                return of(null);
            },
        };

        const ngxLoggerStub = {
            debug: cy.stub().as('debug'),
            info: cy.stub().as('info'),
            log: cy.stub().as('log'),
            error: cy.stub().as('error'),
        };
        TestBed.configureTestingModule({
            imports: [
                TimeCostModule,
                LoggerModule.forRoot({ level: NgxLoggerLevel.ERROR }), // Configured here
            ],
            declarations: [TimeCostComponent],
            providers: [
                { provide: ZametekApiService, useValue: zametek },
                { provide: DASHBOARD_TOKEN, useClass: DashboardService },
                { provide: EVENT_SERVICE_TOKEN, useClass: EventService },
                { provide: NGXLogger, useValue: ngxLoggerStub },
            ],
        }).compileComponents();
    });

    it('renders', () => {
        cy.mount(TimeCostComponent, {
            componentProperties: {
                id: 0,
                width: 0,
                height: 0,
            },
        });
    });
});
