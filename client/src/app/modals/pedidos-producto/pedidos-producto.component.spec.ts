import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosProductoComponent } from './pedidos-producto.component';

describe('PedidosProductoComponent', () => {
  let component: PedidosProductoComponent;
  let fixture: ComponentFixture<PedidosProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
