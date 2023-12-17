import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContentComponent } from './pages-content.component';

describe('PagesContentComponent', () => {
  let component: PagesContentComponent;
  let fixture: ComponentFixture<PagesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
