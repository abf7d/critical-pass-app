import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ch-architecture',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './architecture.component.html',
    styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent implements OnInit, OnChanges {
    @Input() text: string = '';
    public components: string[] = [];

    ngOnInit() {
        this.components = this.text.split(' ');
    }
    ngOnChanges(changes: SimpleChanges) {
        this.text = changes['text'].currentValue;
        this.parseComponents();
    }
    private parseComponents() {
        this.components = this.text.split(' ');
    }
}
