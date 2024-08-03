import { SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
    menuName: string;
    type: string;
    id: string;
    videoTitle: string;
    si: string;
    src?: SafeResourceUrl;
}
