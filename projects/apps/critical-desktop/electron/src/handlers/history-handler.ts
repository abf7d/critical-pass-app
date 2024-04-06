// Import necessary dependencies, if any
import { App } from 'electron';
import HistoryRepo from '../data-access/history-repo';
import { TreeNode } from '@critical-pass/project/types';

export class HistoryHandler {
    private historyRepo = new HistoryRepo();
    constructor(private app: App) {
        console.log('HistoryHandler');
    }
    async saveHistory(event: any, id: number, history: TreeNode[]) {
        let success = true;
        try {
            const historyRepo = new HistoryRepo();
            console.log('HistoryRepo handler class');
            console.log('HistoryRepo 2', historyRepo);
            await historyRepo.saveHistory(id, history);
        } catch (error) {
            success = false;
            console.error('Error saving history data:', error);
            event.reply('save-history-failure', error);
        }
        event.reply('save-history-response', success);
    }
    async getHistory(event: any, id: number) {
        try {
            console.log('HistoryRepo handler class');
            // networkRepo.addProject(project);
            const historyRepo = new HistoryRepo();
            const history = await historyRepo.getHistory(id);

            // Implementation of saving library data
            event.reply('get-history-response', history);
        } catch (error) {
            console.error('Error getting history data:', error);
            event.reply('get-history-failure', error);
        }
    }
    async deleteHistory(event: any, id: number) {
        try {
            console.log('HistoryRepo handler class');
            // networkRepo.addProject(project);
            const historyRepo = new HistoryRepo();
            const history = await historyRepo.deleteHistory(id);

            // Implementation of saving library data
            event.reply('delete-history-response', history);
        } catch (error) {
            console.error('Error deleting history data:', error);
            event.reply('delete-history-failure', error);
        }
    }
}
