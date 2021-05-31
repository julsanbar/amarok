import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresProductoComponent } from './proveedores-producto.component';

describe('ProveedoresProductoComponent', () => {
  let component: ProveedoresProductoComponent;
  let fixture: ComponentFixture<ProveedoresProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
