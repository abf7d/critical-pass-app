import { InjectionToken } from '@angular/core';
import { DashboardService, EventService } from '../..';

export const CP_CONFIG = new InjectionToken<string>('CpConfig');
export const EVENT_SERVICE_TOKEN = new InjectionToken<EventService>('EventService');
export const DASHBOARD_TOKEN = new InjectionToken<DashboardService>('Dashbaord');
export const PROJECT_API_TOKEN = new InjectionToken<string>('ProjectApi');
export const PROJECT_STORAGE_TOKEN = new InjectionToken<string>('ProjectStorage');
export const HISTORY_API_TOKEN = new InjectionToken<string>('HistoryApi');
export const NETWORK_API_TOKEN = new InjectionToken<string>('NetworkApi');