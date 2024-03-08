import { Component } from '@angular/core';
import { FileUpload } from '../file-loader/file-loader.component';

@Component({
    selector: 'ad-app-data-layout',
    standalone: false,
    templateUrl: './app-data-layout.component.html',
    styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {
    public deleteText = '';
    public deleteLibrary() {}
    public insertLibrary(event: FileUpload) {}
    public deleteNetwork() {}
    public insertNetwork(event: FileUpload) {}
    public deleteHistory() {}
    public insertHistory(event: FileUpload) {}
}
