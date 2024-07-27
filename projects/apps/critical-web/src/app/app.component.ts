import { Component } from '@angular/core';
import { ExplorerLibModule } from '@critical-pass/web-lib';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { LandingsModule } from '@critical-pass/features/landing';
import { AppInsightsMonitorService } from '../../../../libs/core/src/lib/monitor/app-insights-monitor.service';
@Component({
    selector: 'critical-pass-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, AppModule, ExplorerLibModule, LandingsModule],
})
export class AppComponent {
    title = 'Critical Pass';
    constructor(private appInsightsService: AppInsightsMonitorService) {
        this.appInsightsService.logPageView('AppComponent');
    }
}
