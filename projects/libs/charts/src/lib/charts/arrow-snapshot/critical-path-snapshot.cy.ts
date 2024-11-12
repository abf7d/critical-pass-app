import { TestBed } from '@angular/core/testing';
import { Project } from '@critical-pass/project/types';
import { DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { configureDashboard } from '../../../../../../../cypress/support/utils';
import { LoggerModule, NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';
import { ArrowSnapshotComponent } from './arrow-snapshot.component';
import { ArrowSnapshotModule } from './arrow-snapshot.module';

let data: Project[] | undefined;
const serializer = new ProjectSerializerService();
const dashboard = configureDashboard();

describe(ArrowSnapshotComponent.name, () => {
    afterEach(() => {});
    beforeEach(() => {
        const ngxLoggerStub = {
            debug: cy.stub().as('debug'),
            info: cy.stub().as('info'),
            log: cy.stub().as('log'),
            error: cy.stub().as('error'),
        };
        TestBed.configureTestingModule({
            imports: [
                ArrowSnapshotModule,
                LoggerModule.forRoot({ level: NgxLoggerLevel.ERROR }), // Configured here
            ],
            declarations: [ArrowSnapshotComponent],
            providers: [
                { provide: DASHBOARD_TOKEN, useValue: dashboard },
                { provide: EVENT_SERVICE_TOKEN, useClass: EventService },
                { provide: NGXLogger, useValue: ngxLoggerStub },
            ],
        }).compileComponents();
        cy.fixture('critical-path-projects.json').then(function (json) {
            data = json.map((projectJson: any) => {
                return serializer.fromJson(projectJson);
            });
        });
    });

    it('Test with 4 different criticality branches', () => {
        dashboard.updateProject(data![0], true);
        cy.mount(ArrowSnapshotComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('lowMedHighCritCriticalitySnapshot');
    });

    it('Test with 2 critical paths', () => {
        dashboard.updateProject(data![1], true);
        cy.mount(ArrowSnapshotComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('twoCriticalPathsSnapshot');
    });
    it('Test with 2 critical paths different floats', () => {
        dashboard.updateProject(data![2], true);
        cy.mount(ArrowSnapshotComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('twoCriticalPathsDifferentFloatsSnapshot');
    });

    it('Test with higher day ranges for criticalities', () => {
        dashboard.updateProject(data![3], true);
        cy.mount(ArrowSnapshotComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('higherDayRangesForCriticalitiesSnapshot');
    });
});
