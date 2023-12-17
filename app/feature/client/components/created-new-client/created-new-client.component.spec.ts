import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedNewClientComponent } from './created-new-client.component';

describe('CreatedNewClientComponent', () => {
  let component: CreatedNewClientComponent;
  let fixture: ComponentFixture<CreatedNewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedNewClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
