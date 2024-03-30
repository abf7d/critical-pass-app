import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@critical-pass/auth';
import { EnvironmentService } from '@critical-pass/core';
@Component({
    selector: 'cp-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    public isElectron: boolean = false;

    constructor(
        private router: Router,
        private msalService: MsalService,
        private envService: EnvironmentService,
        private ngZone: NgZone,
    ) {}

    ngOnInit(): void {
        this.isElectron = this.envService.isElectron;
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
