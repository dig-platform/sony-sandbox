import { Injectable } from '@angular/core';
import {parse} from 'yaml';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export enum Vocabularies {
  reporting_group = 'reporting_group'
}
const vocabMapping: {[key: string]: string} = {
  [Vocabularies.reporting_group]: 'assets/config/account_request_lines_of_business.yml'
}
@Injectable({
  providedIn: 'root'
})
export class MockVocabularyService {
  public env = 'production';
  constructor(private http: HttpClient) {
  }


  public getVocabFor(key: Vocabularies): Observable<any> {
    return this.http.get(vocabMapping[key], {
      observe: 'body',
      responseType: "text"   // This one here tells HttpClient to parse it as text, not as JSON
    }).pipe(
      // Map Yaml to JavaScript Object
      map(yamlString => parse(yamlString)),
      map(yaml => yaml[this.env])
    );
  }
}
