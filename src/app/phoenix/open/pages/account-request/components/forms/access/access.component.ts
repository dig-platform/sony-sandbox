import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  MockVocabularyService,
  Vocabularies
} from '../../../../../../lib/services/mock-vocabulary.service';
import {Observable, Subscription, tap} from 'rxjs';
import {first, map} from 'rxjs/operators';

export interface LineOfBusiness {
  line_of_business: string;
  content_type: string;
  folder_id: string;
  additional_folder_ids: string;
  reviewer_ids: string;
  include_subfolders: string;
  formControl?: string;
}

interface LineOfBusinessSection {
  name: string;
  rows: LineOfBusiness[]
}

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit, OnDestroy {
  public sections: LineOfBusinessSection[] = [];

  public form = new FormGroup({
    linesOfBusiness: new FormControl([])
  });

  public readonly filter = new FormControl();

  public subs: Subscription[] = [];
  public loaded!: boolean;

  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private vocab: MockVocabularyService) {
    this.loadVocab();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  isVisible(row: LineOfBusiness) {
    const filter = this.filter.value;
    if (! filter) {
      return true;
    }
    return row.content_type.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1;
  }



  private loadVocab() {
    const sub = this.vocab.getVocabFor(Vocabularies.reporting_group).pipe(
      first(res => res?.length > 0),
      map(lobs => {
        // const controlMap: {
        //   [key: string]: FormControl
        // } = {};
        // const controls = lobs.reduce((cm: any, lob: LineOfBusiness) => {
        //   cm['folder_' + lob.folder_id] = new FormControl(false);
        //   return cm;
        // }, controlMap);
        // this.form = new FormGroup(controls);
        return lobs;
      }),
      map(lobs => {
        const sections: LineOfBusinessSection[] = [];
        lobs.forEach((lob: LineOfBusiness) => {
          const section = sections.findIndex(s => s.name === lob.line_of_business);
          if (section === -1) {
            sections.push({
              name: lob.line_of_business,
              rows: [lob]
            });
          } else {
            sections[section].rows.push(lob);
          }
        });
        return sections;
      }),
    ).subscribe((sections: LineOfBusinessSection[]) => {
      this.sections = sections;
      this.loaded = true;
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
