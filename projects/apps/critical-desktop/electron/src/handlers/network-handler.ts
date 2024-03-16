import { App } from 'electron';
import NetworkRepo from '../data-access/network-repo';

export class NetworkHandler {
    private networkRepo = new NetworkRepo();
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
