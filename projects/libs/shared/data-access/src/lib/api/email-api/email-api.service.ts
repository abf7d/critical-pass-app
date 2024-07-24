import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactForm } from '../../types/contact-form';
import urlJoin from 'url-join';
import * as CONST from '../../constants/constants';
import { environment } from '@critical-pass/shared/environments';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmailApiService {
    private baseUrl!: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.criticalPathApi;
    }

    public contactUs(form: ContactForm): Observable<ResultMessage> {
        const body = JSON.stringify(form);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post<ResultMessage>(urlJoin(this.baseUrl, CONST.CONTACT_US_ENDPOINT), body, { headers });
    }

    public getAccess(formName: string): Observable<boolean> {
        const params = new HttpParams().set('formName', formName);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.get<boolean>(urlJoin(this.baseUrl, CONST.GET_ACCESS_ENDPOINT), { headers, params });
    }
}

export interface ResultMessage {
    message: string;
}
