import { Injectable } from '@angular/core';
import { Project } from '@critical-pass/project/types';

@Injectable({
    providedIn: 'root',
})
export class CompletionCalcService {
    constructor() {}

    public calculateCompleted(project: Project) {
        for (const link of project.activities) {
            const completed = !!link.profile.finish;
            link.processInfo.completed = completed;
            if (link.chartInfo.target == null || link.chartInfo.source == null) {
                continue;
            }
            if (!link.chartInfo.target.completed) {
                link.chartInfo.target.completed = completed;
            }
            if (!link.chartInfo.source.completed) {
                link.chartInfo.source.completed = completed;
            }
        }

        for (const link of project.activities) {
            if (
                (link.chartInfo.target != null || link.chartInfo.source != null) &&
                link.chartInfo.isDummy &&
                link.chartInfo.target?.completed === true &&
                link.chartInfo.source?.completed === true
            ) {
                link.processInfo.completed = true;
            }
        }
    }

    public calcFaded(project: Project) {
        const fadeTags = project.profile.view.fade?.startsWith('tag');
        const fadeCompleted = project.profile.view.fade === 'completed';
        const fadeNone = project.profile.view.fade === undefined;
        if (fadeTags) {
            this.calculateFadedTag(project);
        } else if (fadeCompleted) {
            this.calculateCompleted(project);
        } else if (fadeNone) {
            this.resetFade(project);
        }
    }

    public resetFade(project: Project) {
        for (const link of project.activities) {
            link.processInfo.completed = false;
            if (link.chartInfo.target == null || link.chartInfo.source == null) {
                continue;
            }
            link.chartInfo.target.completed = false;
            link.chartInfo.source.completed = false;
        }
    }

    public calculateFadedTag(project: Project) {
        const fadeData = project.profile.view.fade;
        if (fadeData?.startsWith('tag')) {
            const tagGroup = fadeData.split('.')[1];
            const tag = fadeData.split('.')[2];
            if (tagGroup && tag) {
                const tagIndex = parseInt(tag);
                const tagGroupIndex = parseInt(tagGroup);
                const tagGroupName = project.tags?.[tagGroupIndex].name;
                const tagName = project.tags?.[tagGroupIndex].tags?.[tagIndex].name;

                for (const link of project.activities) {
                    const tag = link.tags?.find(t => t.name === tagGroupName);
                    const exists = tag?.tags.some(t => t.name === tagName);
                    const completed = !exists;
                    link.processInfo.completed = completed;
                    if (link.chartInfo.target == null || link.chartInfo.source == null) {
                        continue;
                    }
                    link.chartInfo.target.completed = completed;
                    link.chartInfo.source.completed = completed;
                }
            }
        }
    }
}
