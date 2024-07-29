import { Injectable } from '@angular/core';
import { Project, TreeNode } from '@critical-pass/project/types';
import { ProjectStorageApiService } from '@critical-pass/shared/data-access';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { FileManagerBaseService } from '../file-manager-base.service';
import { API_CONST } from '@critical-pass/shared/data-access';
import { HistoryMapperService } from '../history-file-manager/history-mapper/history-mapper.service';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';
import { ProjectTreeNodeSerializerService } from '@critical-pass/shared/serializers';
import { NodeConnectorService } from '@critical-pass/project/processor';

@Injectable({
    providedIn: 'root',
})
export class NetworkJsonFileManagerService implements FileManagerBaseService<Project[]> {
    constructor(
        private projSerializer: ProjectSerializerService,
        private sanitizer: ProjectSanatizerService,
        private nodeConnector: NodeConnectorService,
    ) {}

    public import(file: File): Promise<Project[]> {
        return this.importFromProjectList(file);
    }

    private importFromProjectList(file: File): Promise<Project[]> {
        return new Promise<Project[]>((resolve, reject) => {
            const reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e: any) => {
                const contentTxt: string = e.target.result;
                const contentJson: Project[] = JSON.parse(contentTxt);
                const projSerializer = new ProjectSerializerService();
                const projects = contentJson.map(x => {
                    const proj = projSerializer.fromJson(x);
                    this.nodeConnector.connectArrowsToNodes(proj);
                    return proj;
                });
                resolve(projects);
            };
        });
    }
    public export(content: Project[], subExension: string = 'network'): void {
        const newProjects = content.map(x => {
            const proj = this.projSerializer.fromJson(x);
            this.sanitizer.sanatizeForSave(proj);
            return proj;
        });
        const projectTxt = JSON.stringify(newProjects);
        const blob = new Blob([projectTxt], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${subExension}.cp.json`;
        downloadLink.click();
    }
}
