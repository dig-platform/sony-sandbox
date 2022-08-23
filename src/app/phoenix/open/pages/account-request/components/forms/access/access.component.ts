import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  MockVocabularyService,
  Vocabularies
} from '../../../../../../lib/services/mock-vocabulary.service';
import {Observable} from 'rxjs';

export interface LineOfBusiness {

}

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  public linesOfBusiness$!: Observable<LineOfBusiness>;

  public form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(),
    email: new FormControl(),
    company: new FormControl(),
    territory: new FormControl(),
    jobTitle: new FormControl(),
  })

  constructor(private vocab: MockVocabularyService) {
    this.linesOfBusiness$ = vocab.getVocabFor(Vocabularies.reporting_group);
    this.linesOfBusiness$.subscribe(console.log);
  }

  ngOnInit(): void {
  }

}
