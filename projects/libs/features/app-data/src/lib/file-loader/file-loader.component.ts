import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../../project/types/src/lib/project';

@Component({
    selector: 'ad-file-loader',
    standalone: false,
    templateUrl: './file-loader.component.html',
    styleUrl: './file-loader.component.scss',
})
export class FileLoaderComponent {
    @Input() public title: string = '';
    @Input() public objType: string = '';
    @Input() public includeId: boolean = false;
    @Input() public projects: Project[] = [];
    @Output() public delete: EventEmitter<void> = new EventEmitter();
    @Output() public insert: EventEmitter<FileUpload> = new EventEmitter();
    public appendData: boolean = false;
    public associatedId: number | null = null;
    public objectCount: number = 0;
    public firstObjProps: string[] = [];
    public deleteText = '';
    public insertText = '';
    public hideDelete = true;
    public jsonPreview = '';
    public fileJsonContents: any = null;
    public deleteData() {}
    public insertData() {
        if (this.fileJsonContents) {
            this.insert.emit({ id: this.associatedId, appendData: this.appendData, result: this.fileJsonContents });
        }
    }
    public fileSelected(event: any) {
        const files = event.files as FileList;
        const firstFile = files.item(0);
        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];
        const reader = new FileReader();

        reader.onload = e => {
            const text = reader.result?.toString();

            // Take the first 100 characters of the file
            if (text) {
                this.jsonPreview = text.substring(0, 300) + '...';

                try {
                    const fileJsonContents = JSON.parse(text || '');
                    // if result is an array then count objects
                    if (Array.isArray(this.fileJsonContents)) {
                        this.objectCount = this.fileJsonContents.length;
                        this.firstObjProps = Object.keys(fileJsonContents[0]);
                    } else if (fileJsonContents !== null) {
                        this.objectCount = 1;
                        this.firstObjProps = Object.keys(fileJsonContents);
                    } else if (fileJsonContents === null) {
                        this.objectCount = 0;
                        this.firstObjProps = [];
                    }
                    this.fileJsonContents = fileJsonContents;
                } catch (e) {
                    console.error(e);
                }
            }
        };
        if (firstFile !== null && files.length > 0) {
            reader.readAsText(firstFile);
        }
    }
}

export interface FileUpload {
    id: number | null;
    appendData: boolean;
    result: string | ArrayBuffer | null;
}
