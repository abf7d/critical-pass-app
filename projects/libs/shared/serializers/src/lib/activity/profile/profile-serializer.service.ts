import { Injectable } from '@angular/core';
import { ActivityProfile } from '@critical-pass/project/types';
import { Serializer } from '../../serializer';

@Injectable({
    providedIn: 'root',
})
export class ActivityProfileSerializerService implements Serializer<ActivityProfile> {
    fromJson(json?: any): ActivityProfile {
        json = json || {};
        const obj: ActivityProfile = {
            id: json?.id ?? null,
            sortOrder: json?.sortOrder ?? null,
            name: json?.name ?? '',
            duration: json?.duration ?? 0,
            depends_on: json?.depends_on ?? '',
            finish: json?.finish ?? null,
            planned_completion_date: json?.planned_completion_date ?? null,
            planned_earned_value: json?.planned_earned_value ?? null,
            start_date: json?.start_date ?? null,
            finish_dt: json?.finish ? new Date(json.finish) : null,
            planned_completion_date_dt: json?.planned_completion_date ? new Date(json.planned_completion_date) : null,
            start_date_dt: json?.start_date ? new Date(json.start_date) : null,
            minEST: json?.minEST ?? null,
            minESDate: null,
        };
        return obj;
    }
    toJson(obj: ActivityProfile): any {}
}
