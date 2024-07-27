import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SystemInfoService {
    constructor() {}

    public getUserSystemInfo(): any {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const appVersion = navigator.appVersion;
        const vendor = navigator.vendor;
        const language = navigator.language;

        return {
            userAgent,
            platform,
            appVersion,
            vendor,
            language,
        };
    }
}
