import { Component } from '@angular/core';
import { ExplorerLibModule } from '@critical-pass/web-lib';
import { RouterOutlet } from '@angular/router';
import { LandingsModule } from '@critical-pass/features/landing';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'critical-desktop-root',
    standalone: true,
    // imports: [CommonModule, RouterOutlet],
    imports: [RouterOutlet, ExplorerLibModule, LandingsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Critical Pass';
}
