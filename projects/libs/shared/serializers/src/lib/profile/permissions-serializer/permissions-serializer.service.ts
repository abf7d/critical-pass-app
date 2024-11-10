import { Injectable } from '@angular/core';
import { Permissions } from '@critical-pass/project/types';
import { Serializer } from '../../serializer';

@Injectable({
    providedIn: 'root',
})
export class PermissionsSerializerService implements Serializer<Permissions> {
    fromJson(json: any): Permissions {
        json = json ?? {};
        const obj: Permissions = {
            Permissions: json.Permissions || ['owner', 'write'],
            isOwner: json.isOwner ?? true,
            writable: json.writable ?? true,
            user: json.user ?? '',
            ownerId: json.ownerId,
            ownerName: json.ownerName,
        };
        return obj;
    }
    toJson(obj: Permissions): any {}
}
