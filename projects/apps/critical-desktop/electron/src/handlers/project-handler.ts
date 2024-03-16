import { App } from 'electron';
import ProjectRepo from '../data-access/project-repo';

export class ProjectHandler {
    private projectRepo = new ProjectRepo();
    constructor(private app: App) {
        console.log('ProjectHandler');
    }
    saveData(event: any, project: any) {
        try {
            console.log('project handler class');
            // projectRepo.addProject(project);

            event.reply('save-project-success');
        } catch (error) {
            console.error('Error saving project data:', error);
            event.reply('save-project-failure', error);
        }
    }
}
