import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChoiceDialogComponent } from './location-choice-dialog.component';

describe('LocationChoiceDialogComponent', () => {
  let component: LocationChoiceDialogComponent;
  let fixture: ComponentFixture<LocationChoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationChoiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
