import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ad-app-data-layout',
    standalone: false,
    templateUrl: './app-data-layout.component.html',
    styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {
    public deleteText = '';
    public jsonPreview = '';
    public deleteData() {}
    public fileSelected(event: any) {
        const files = event.files as FileList;
        const firstFile = files.item(0);

        if (firstFile !== null && files.length > 0) {
            // this.fileManager.import(firstFile).then(worksheets => {
            //     this.tables = this.factory.getTables(worksheets, this.currentSchema);
            //     this.headers = this.tables[0].columnDefs;
            //     this.activeTable = this.tables[0];
            //     this.factory.setMatches(this.tables[0].columnDefs, this.currentSchema);
            // });
        }
    }
    public insertData() {}

    public handleFileInput(event: any) {
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
            }
        };
        if (firstFile !== null && files.length > 0) {
            reader.readAsText(firstFile);
        }
    }
}
