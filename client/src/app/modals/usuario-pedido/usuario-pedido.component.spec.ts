import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPedidoComponent } from './usuario-pedido.component';

describe('UsuarioPedidoComponent', () => {
  let component: UsuarioPedidoComponent;
  let fixture: ComponentFixture<UsuarioPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
