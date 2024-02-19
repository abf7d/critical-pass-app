import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';

export default defineConfig({
    component: {
        supportFile: 'cypress/support/component.ts',
        devServer: {
            framework: 'angular',
            bundler: 'webpack',
        },
        setupNodeEvents(on, config) {
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
            addMatchImageSnapshotPlugin(on);
        },
        specPattern: '**/*.cy.ts',
    },
});
