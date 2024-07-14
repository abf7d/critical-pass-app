import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeModule } from './welcome/welcome.module';
import { TutorialsModule } from './tutorials/tutorials.module';
import { DonateModule } from './donate/donate.module';
import { AboutComponent } from './about/about.component';
import { AboutModule } from './about/about.module';

@NgModule({
    imports: [CommonModule, HomeModule, WelcomeModule, TutorialsModule, DonateModule /*AboutModule*/],
    declarations: [AboutComponent],
    exports: [HomeModule],
})
export class LandingsModule {}
