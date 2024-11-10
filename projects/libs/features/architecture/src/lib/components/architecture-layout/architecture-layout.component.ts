import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchitectureComponent } from '../../../../../../charts/src/lib/charts/architecture/architecture.component';

@Component({
    selector: 'ar-architecture-layout',
    standalone: true,
    imports: [CommonModule, FormsModule, ArchitectureComponent],
    templateUrl: './architecture-layout.component.html',
    styleUrl: './architecture-layout.component.scss',
})
export class ArchitectureLayoutComponent {
    archJson = {
        view: {
            autoArrange: false,
        },
        mainTxt: 'Web Deskotp Admin',
        static: [{ id: 1, name: 'Web Client', pos: [5, 10], width: 150, height: 'auto', color: '#5e2' }],
        callChains: {
            areas: ['Client', 'Managers', 'Engines', 'Resource Access', 'Data', 'Utils'],
            chains: [
                {
                    target: {
                        id: 1,
                        pos: [0, 0],
                    },
                    source: {
                        id: 2,
                        pos: [0, 200],
                    },
                    dashed: false,
                    dPath: 'd12,14,23',
                },
            ],
        },
    };
    public mainTxt: string = '';
    public updateMainTxt(event: any) {}
}
