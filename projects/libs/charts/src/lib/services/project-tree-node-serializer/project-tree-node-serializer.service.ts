import { Injectable } from '@angular/core';
import { TreeNode } from '@critical-pass/project/types';

@Injectable({
    providedIn: 'root',
})
export class ProjectTreeNodeSerializerService {
    fromJson(json?: any): TreeNode {
        json = json ?? {};
        let metadata = json?.metadata ?? {};
        if (!metadata) {
            metadata = { assignmentCompleted: false, time: null, cost: null };
        } else {
            metadata = { assignmentCompleted: metadata.assignmentCompleted ?? false, time: metadata.time ?? null, cost: metadata.cost ?? null };
        }
        const obj: TreeNode = {
            name: json?.name ?? null,
            group: json?.group ?? null,
            subgroup: json?.subgroup ?? null,
            metadata: json?.metadata ?? null,
            data: json?.data ?? null,
            children: json?.children ?? [],
            id: json?.id ?? null,
            parent: json.parent ?? null,
            parentNodeId: json?.parentNodeId ?? null,
        };
        return obj;
    }
    toJson(obj: TreeNode): any {}

    head(): TreeNode {
        return {
            id: 0,
            group: 0,
            subgroup: 0,
            name: 'head',
            data: null,
            children: [],
            parent: null,
            metadata: null,
            parentNodeId: null,
        };
    }
}
