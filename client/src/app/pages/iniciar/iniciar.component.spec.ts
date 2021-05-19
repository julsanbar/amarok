import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarComponent } from './iniciar.component';

describe('IniciarComponent', () => {
  let component: IniciarComponent;
  let fixture: ComponentFixture<IniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
