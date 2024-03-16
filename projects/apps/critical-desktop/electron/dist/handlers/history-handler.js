'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HistoryHandler = void 0;
const history_repo_1 = require('../data-access/history-repo');
class HistoryHandler {
    constructor(app) {
        this.app = app;
        this.historyRepo = new history_repo_1.default();
        console.log('NetworkHandler');
    }
    saveData(event, project) {
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
exports.HistoryHandler = HistoryHandler;
//# sourceMappingURL=history-handler.js.map
