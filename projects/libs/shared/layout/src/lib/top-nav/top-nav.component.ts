import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService, MsalService } from '@critical-pass/auth';
import { EnvironmentService } from '@critical-pass/core';
@Component({
    selector: 'cp-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    public isElectron: boolean = false;
    public isAuthorized: boolean = true;

    constructor(
        private router: Router,
        private msalService: MsalService,
        private envService: EnvironmentService,
        private accountData: ClaimsService,
        private ngZone: NgZone,
    ) {}

    ngOnInit(): void {
        this.isElectron = this.envService.isElectron;
        this.isAuthorized = this.accountData.isAdmin() || this.accountData.isAuthorized();
    }

    navigate(url: string) {
        this.ngZone.run(() => {
            this.router.navigateByUrl(url);
        });
    }

    logout() {
        this.msalService.logout();
    }
}
