import { TestBed } from '@angular/core/testing';

import { MockVocabularyService } from './mock-vocabulary.service';

describe('MockVocabularyService', () => {
  let service: MockVocabularyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockVocabularyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
