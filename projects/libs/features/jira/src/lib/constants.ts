// export const JIRA_LOGIN_URL =
//     'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=1SdMM8pTryWCljI1Awm9drfKvnU2BR2H&scope=read%3Ame%20read%3Ajira-work%20manage%3Ajira-project%20read%3Ajira-user%20write%3Ajira-work&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fjira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent';
export const JIRA_LOGIN_URL =
    'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=1SdMM8pTryWCljI1Awm9drfKvnU2BR2H&scope=read%3Ame%20read%3Ajira-work%20manage%3Ajira-project%20read%3Ajira-user%20write%3Ajira-work%20manage%3Ajira-configuration&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fjira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent';
export const JIRA_TOKEN_URL = 'https://auth.atlassian.com/oauth/token';
export const JIRA_REDIRECT_URI = 'https://localhost:4200/jira';
export const JIRA_CLOUD_ID_URL = 'https://api.atlassian.com/oauth/token/accessible-resources';
export const JIRA_QUERY_BASE_URL = 'https://api.atlassian.com/ex/jira/';
export const JIRA_PROJECTS_ENDPOINT = 'rest/api/3/project/search';

// export const JIRA_CREATE_PROJECT_URL = 'rest/api/3/project';

// same as projects_endpoint but without search, maybe combine them?
export const JIRA_PROJECT_PROPERTY_URL = 'rest/api/3/project/';
export const JIRA_PERMISSION_SCHEME_URL = 'rest/api/3/permissionscheme';
export const JIRA_NOTIFICATION_SCHEME_URL = 'rest/api/3/notificationscheme';
export const JIRA_PROJ_CATEGORIES_URL = 'rest/api/3/projectCategory';
export const JIRA_ISSUE_URL = 'rest/api/3/issue';
export const JIRA_ISSUE_TYPE_URL = 'rest/api/3/issuetype';
export const JIRA_ISSUE_LINK_URL = 'rest/api/3/issueLink';
export const JIRA_ISSUE_LINK_TYPE_URL = 'rest/api/3/issueLinkType';
export const JIRA_USER_URL = 'rest/api/3/user/assignable/multiProjectSearch?query=query&projectKeys=';
export const JIRA_ME_URL = 'rest/api/3/myself';
export const JIRA_PROJECT_PROPERTY_ENDPOINT = '/properties';

// Update project
// PUT /rest/api/3/project/{projectIdOrKey}

// Delete project
// DELETE /rest/api/3/project/{projectIdOrKey}

export const JIRA_PROJECT_QUERY = 'rest/api/3/search?jql=project%20%3D%20';
export const CP_PROPERTY_KEY = 'critical-pass-project';
