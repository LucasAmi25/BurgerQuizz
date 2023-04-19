import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelEtPoivreComponent } from './sel-et-poivre.component';

describe('SelEtPoivreComponent', () => {
  let component: SelEtPoivreComponent;
  let fixture: ComponentFixture<SelEtPoivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelEtPoivreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelEtPoivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
