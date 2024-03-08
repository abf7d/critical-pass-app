import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    @Output() public delete: EventEmitter<void> = new EventEmitter();
    @Output() public insert: EventEmitter<FileUpload> = new EventEmitter();
    public appendData: boolean = false;
    public objectCount: number = 0;
    public firstObjProps: string[] = [];
    public deleteText = '';
    public insertText = '';
    public hideDelete = true;
    public jsonPreview = '';
    public deleteData() {}
    public insertData() {}
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
                    const result = JSON.parse(text || '');
                    // if result is an array then count objects
                    if (Array.isArray(result)) {
                        this.objectCount = result.length;
                        this.firstObjProps = Object.keys(result[0]);
                    } else if (result !== null) {
                        this.objectCount = 1;
                        this.firstObjProps = Object.keys(result);
                    } else if (result === null) {
                        this.objectCount = 0;
                        this.firstObjProps = [];
                    }
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
    id: number;
    appendData: boolean;
    result: string | ArrayBuffer | null;
}
