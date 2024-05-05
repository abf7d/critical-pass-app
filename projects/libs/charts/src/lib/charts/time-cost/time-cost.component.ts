import { Component, ElementRef, Inject, inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimeCostUiService } from './time-cost-ui/time-cost-ui.service';
import { EVENT_SERVICE_TOKEN, EventService } from '@critical-pass/shared/data-access';
import * as CONST from '../../constants/constants';
import { filter, Subscription } from 'rxjs';
import { TimeCostPoint } from '../../../../../project/types/src/lib/planning';
@Component({
    selector: 'cp-time-cost',
    template: `
        <div class="btn-container">
            <a class="calc-button" href="javascript:void(0)" (click)="calculateTimeCost()">Calculate Time Cost Curve</a>
        </div>
        <div class="chart-container" [ngStyle]="{ 'min-height.px': height, 'min-width.px': width }">
            <div [hidden]="loading || loadingError" #chart class="time-cost-container"></div>
            <div class="loader" *ngIf="loading"></div>
            <div class="error-msg" *ngIf="loadingError">An Error Occurred Loading</div>
        </div>
    `,
    styleUrls: ['./time-cost.component.scss'],
    providers: [TimeCostUiService],
    encapsulation: ViewEncapsulation.None,
})
export class TimeCostComponent implements OnInit {
    @Input() id!: number;
    @Input() width!: number;
    @Input() height!: number;
    public loading = false;
    public loadingError = false;
    @ViewChild('chart', { static: true }) chart!: ElementRef;
    private sub!: Subscription;
    private ui: TimeCostUiService;

    constructor(@Inject(EVENT_SERVICE_TOKEN) private eventService: EventService) {
        this.ui = inject(TimeCostUiService);
    }

    public calculateTimeCost(): void {
        this.loading = true;
        this.loadingError = false;
        this.ui
            .calculateTimeCostPoints()
            .then(timeCostPoints => (this.loading = false))
            .catch(error => {
                this.loadingError = true;
                this.loading = false;
                console.error(error);
            });
    }

    public ngOnInit(): void {
        this.ui.init(this.width, this.height, this.id, this.chart.nativeElement);
        this.sub = this.eventService
            .get<TimeCostPoint[]>(CONST.ASSIGN_TIMECOST_POINTS)
            .pipe(filter(x => !!x))
            .subscribe(timeCostPoints => {
                this.ui.initSubscriptions();
                this.ui.clearChart(timeCostPoints);
                this.ui.drawChart(timeCostPoints);
            });
    }

    public ngOnDestroy() {
        this.ui.destroy();
        this.sub?.unsubscribe();
    }
}
