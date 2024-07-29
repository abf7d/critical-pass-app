import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FILE_CONST } from '@critical-pass/shared/file-management';
import { EnvironmentService } from '../../../../../core/src/lib/env-service/environment.service';

@Component({
    selector: 'da-file-action-buttons',
    standalone: false,
    templateUrl: './file-action-buttons.component.html',
    styleUrl: './file-action-buttons.component.scss',
})
export class FileActionButtonsComponent {
    @Input() public disableButtons: boolean = false;
    @Input() public enableSave: boolean = true;
    @Output() public save: EventEmitter<string> = new EventEmitter();
    @Output() public load: EventEmitter<File> = new EventEmitter();
    public showHelp = false;
    public fileType = FILE_CONST.EXT.JSON;
    public isSelFileType = false;
    public resourceCount: number | null = null;
    public allowSave = false;
    public saveMenuHeight = '50px';
    public constructor(private envService: EnvironmentService) {
        this.allowSave = this.envService.isElectron;
        this.saveMenuHeight = this.allowSave ? '70px' : '50px';
    }
    public saveDataTo() {
        if (this.enableSave) {
            this.save.emit(this.fileType);
        }
    }
    public loadFile(event: any) {
        const files = event.files as FileList;
        const firstFile = files.item(0);

        if (firstFile !== null && files.length > 0) {
            this.load.emit(firstFile);
        }
    }
}
