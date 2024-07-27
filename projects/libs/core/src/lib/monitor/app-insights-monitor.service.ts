import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from '../../../../shared/environments/src/lib/environment';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AppInsightsMonitorService {
    private angularPlugin = new AngularPlugin();
    private appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: environment.appInsightsInstrKey,
            extensions: [this.angularPlugin],
            extensionConfig: {
                [this.angularPlugin.identifier]: {
                    router: this.router,
                },
            },
        },
    });

    constructor(private router: Router) {
        if (environment.appInsightsOn) {
            this.appInsights.loadAppInsights();

            // Telemetry data is already sent by default, but you can add additional data
            // const systemInfo = this.systemInfoService.getUserSystemInfo();
            // this.appInsights.addTelemetryInitializer(envelope => {
            //     envelope.tags = envelope.tags || {};
            //     envelope.tags['ai.cloud.role'] = 'Angular App';
            //     envelope.data = envelope.data || {};
            //     envelope.data['systemInfo'] = systemInfo;
            // });
        }
    }

    logPageView(name?: string, url?: string) {
        // option to call manually
        this.appInsights.trackPageView({
            name: name,
            uri: url,
        });
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        this.appInsights.trackEvent({ name: name }, properties);
    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
        this.appInsights.trackMetric({ name: name, average: average }, properties);
    }

    logException(exception: Error, severityLevel?: number) {
        this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        this.appInsights.trackTrace({ message: message }, properties);
    }
}
