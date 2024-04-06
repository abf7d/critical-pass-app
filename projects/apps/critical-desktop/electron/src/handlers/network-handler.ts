import { App } from 'electron';
import NetworkRepo from '../data-access/network-repo';
import { Project } from '@critical-pass/project/types';

export class NetworkHandler {
    private networkRepo = new NetworkRepo();
    constructor(private app: App) {
        console.log('NetworkHandler');
    }
    async saveNetwork(event: any, id: number, network: Project[]) {
        let success = true;
        try {
            const networkRepo = new NetworkRepo();
            console.log('networkRepo handler class');
            console.log('networkRepo 2', networkRepo);
            await networkRepo.saveNetwork(id, network);
        } catch (error) {
            success = false;
            console.error('Error saving network data:', error);
            event.reply('save-network-failure', error);
        }
        event.reply('save-network-response', success);
    }
    async getNetwork(event: any, id: number) {
        try {
            console.log('networkRepo handler class');
            const networkRepo = new NetworkRepo();
            const network = await networkRepo.getNetwork(id);

            event.reply('get-network-response', network);
        } catch (error) {
            console.error('Error getting network data:', error);
            event.reply('get-network-failure', error);
        }
    }
    async deleteNetwork(event: any, id: number) {
        try {
            console.log('networkRepo handler class');
            // networkRepo.addProject(project);
            const networkRepo = new NetworkRepo();
            const network = await networkRepo.deleteNetwork(id);

            // Implementation of saving library data
            event.reply('delete-network-response', network);
        } catch (error) {
            console.error('Error deleting network data:', error);
            event.reply('delete-network-failure', error);
        }
    }
}
