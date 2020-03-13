import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KillerInfoDialogComponent } from './killer-info-dialog.component';

describe('KillerInfoDialogComponent', () => {
  let component: KillerInfoDialogComponent;
  let fixture: ComponentFixture<KillerInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KillerInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KillerInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
