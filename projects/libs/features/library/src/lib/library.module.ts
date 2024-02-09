import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library.routes';
import { LibraryGridComponent } from './library-grid/library-grid.component';
import { LibraryBarComponent } from './library-bar/library-bar.component';
import { ArrowSnapshotModule } from '@critical-pass/charts';
import { LibraryListBarComponent } from './library-list-bar/library-list-bar.component';

@NgModule({
    declarations: [LibraryGridComponent, LibraryBarComponent, LibraryListBarComponent],
    imports: [CommonModule, LibraryRoutingModule, ArrowSnapshotModule],
})
export class LibraryModule {}
