import { TestBed } from '@angular/core/testing';
import { Project } from '@critical-pass/project/types';
import { DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ArrowChartComponent } from './arrow-chart.component';
import { ArrowChartModule } from './arrow-chart.module';
import { ArrowStateService } from './arrow-state/arrow-state';
import { configureDashboard } from '../../../../../../../cypress/support/utils';
import { NodeArrangerService } from '../../../../../shared/project-utils/src/lib/services/node-arranger/node-arranger.service';
import { LoggerModule, NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';
import { ErrorHandler } from '@angular/core';

let data: Project[] | undefined;
const serializer = new ProjectSerializerService();
const dashboard = configureDashboard();
const state = new ArrowStateService();

describe(ArrowChartComponent.name, () => {
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
                ArrowChartModule,
                LoggerModule.forRoot({ level: NgxLoggerLevel.ERROR }), // Configured here
            ],
            declarations: [ArrowChartComponent],
            providers: [
                { provide: DASHBOARD_TOKEN, useValue: dashboard },
                { provide: EVENT_SERVICE_TOKEN, useClass: EventService },
                { provide: ArrowStateService, useValue: state },
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
        cy.mount(ArrowChartComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
                rebuild: false,
                showFastCreator: false,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('lowMedHighCritCriticality');
    });

    it('Test with 2 critical paths', () => {
        dashboard.updateProject(data![1], true);
        cy.mount(ArrowChartComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
                rebuild: false,
                showFastCreator: false,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('twoCriticalPaths');
    });
    it('Test with 2 critical paths different floats', () => {
        dashboard.updateProject(data![2], true);
        cy.mount(ArrowChartComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
                rebuild: false,
                showFastCreator: false,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('twoCriticalPathsDifferentFloats');
    });

    it('Test with higher day ranges for criticalities', () => {
        dashboard.updateProject(data![3], true);
        cy.mount(ArrowChartComponent, {
            componentProperties: {
                id: 0,
                width: 1200,
                height: 700,
                rebuild: false,
                showFastCreator: false,
            },
        });
        cy.wait(1000);

        cy.get('svg').matchImageSnapshot('higherDayRangesForCriticalities');
    });
});
