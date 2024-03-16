// Import necessary dependencies, if any
import { App } from 'electron';
import HistoryRepo from '../data-access/history-repo';

export class HistoryHandler {
    private historyRepo = new HistoryRepo();
    constructor(private app: App) {
        console.log('NetworkHandler');
    }
    saveData(event: any, project: any) {
        try {
            console.log('networkRepo handler class');
            // networkRepo.addProject(project);

            // Implementation of saving library data
            event.reply('save-network-success');
        } catch (error) {
            console.error('Error saving network data:', error);
            event.reply('save-network-failure', error);
        }
    }
}
