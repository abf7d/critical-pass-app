import { Component, OnInit } from '@angular/core';
import { Video } from '../../types/video';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'cp-tutorials',
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent {
    public selectedVideo: Video;
    public videos: Video[] = [
        { menuName: 'Draw a Project', type: 'arrow1', id: '6vb-MKcynoM', videoTitle: 'Draw an Arrow Diagram', si: 'zGOsVuxj4lIEGBtL' },
        { menuName: 'Arrow Controls', type: 'arrowControls', id: 'cB35uUIFoP8', videoTitle: 'Arrow Diagram Controls', si: 'jIsxPNEwoc-cbh1L' },
        { menuName: 'Import Data', type: 'uploadExcelFile', id: 'tRR8aRHb4L4', videoTitle: 'Import Data into Project', si: 'LPBhkhIOGu3Vu_JP' },
        { menuName: 'Quick Start Example', type: 'quickStart', id: 'T0jwmYAB8gA', videoTitle: 'Quick Start Example', si: 'CdoTCesic5FWzQr6' },
        { menuName: 'Application Layout', type: 'applicationLayout', id: 'R3kPmTzawCE', videoTitle: 'Application Layout', si: 'HmDHijxNQPRuTAhI' },
    ];
    public constructor(private sanitizer: DomSanitizer) {
        this.videos.forEach((video: Video) => {
            video.src = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}?vq=hd720p&amp;hd=1&amp;si=${video.si}`);
        });
        this.selectedVideo = this.videos[0];
    }
}
