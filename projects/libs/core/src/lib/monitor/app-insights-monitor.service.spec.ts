import { TestBed } from '@angular/core/testing';

import { AppInsightsMonitorService } from './app-insights-monitor.service';

describe('AppInsightsMonitorService', () => {
    let service: AppInsightsMonitorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppInsightsMonitorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
