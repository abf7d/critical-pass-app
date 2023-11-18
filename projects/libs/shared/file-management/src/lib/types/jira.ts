export interface JiraProjectResult {
    issues: JiraIssue[];
}
export interface JiraIssue {
    id: string;
    key: string;
    self: string;
    fields: JiraIssueFields;
}
export interface JiraIssueExport {
    fields: JiraIssueFields;
}
export interface JiraIssueFields {
    created?: string;
    creator?: {
        accountId: string;
        emailAddress: string;
        displayName: string;
    };
    assignee?: {
        id?: string;
        accountId?: string;
        displayName?: string;
        self?: string;
    };
    // depencencies
    issuelinks?: JiraIssueLink[];
    project?: {
        id: string;
        key?: string;
        name?: string;
    };
    issuetype?: {
        id: string | number;
        name?: string;
        entityId?: string;
    };
    summary: string;
    description?: any;
    duedate?: string;
    customfield_10016?: number; // Story Points
}
export interface JiraIssueLink {
    outwardIssue?: JiraIssue;
    inwardIssue?: JiraIssue;
    type: {
        id: string;
        inward?: string; // value: 'is blocked by'
        outward?: string; // value: 'blocks'
        name: string; // value: 'Blocks'
        self: string;
    };
    id: string;
    self: string;
}
