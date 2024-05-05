import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    public cache: Map<string, BehaviorSubject<any>> = new Map<string, BehaviorSubject<any>>();
    public get<T>(key: string): BehaviorSubject<T> {
        const item = this.cache.get(key);
        if (!item) {
            const entry = new BehaviorSubject<any>(undefined);
            this.cache.set(key, entry);
            return entry;
        }
        return item as BehaviorSubject<T>;
    }
    onDestroy() {
        const eventServiceKeys = Array.from(this.cache.keys());
        eventServiceKeys.forEach(key => {
            this.cache.delete(key);
        });
    }
}
