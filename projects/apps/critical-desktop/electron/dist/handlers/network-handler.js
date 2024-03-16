'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NetworkHandler = void 0;
const network_repo_1 = require('../data-access/network-repo');
// export const networkHandlers = {
//     saveData: (app: App) => (event: any, data: any) => {
//         try {
//             // Implementation of saving library data
//             event.reply('save-network-success');
//         } catch (error) {
//             console.error('Error saving network data:', error);
//             event.reply('save-network-failure', error);
//         }
//     },
//     // Other library-related handlers can go here
// };
class NetworkHandler {
    constructor(app) {
        this.app = app;
        this.networkRepo = new network_repo_1.default();
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
exports.NetworkHandler = NetworkHandler;
//# sourceMappingURL=network-handler.js.map
