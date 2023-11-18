import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventService } from '@critical-pass/shared/data-access'
import { Project } from '@critical-pass/project/types';

@Component({
  selector: 'cw-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'critical-web';
  constructor(private eventService: EventService) {
    this.eventService.get('test').next('test');
    this.eventService.get('test').subscribe((data) => {
      console.log(data);
    });
  }
}
