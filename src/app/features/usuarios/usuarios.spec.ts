import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Usuarios } from './usuarios';
import { UsuariosApi } from './usuarios-api';
import { User } from '../../core/auth/auth';

describe('Usuarios', () => {
  let component: Usuarios;
  let fixture: ComponentFixture<Usuarios>;
  let mockUsuariosApi: jasmine.SpyObj<UsuariosApi>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuariosApi = jasmine.createSpyObj('UsuariosApi', ['getUsuarios', 'deleteUsuario']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Usuarios, BrowserAnimationsModule],
      providers: [
        { provide: UsuariosApi, useValue: mockUsuariosApi },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Usuarios);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load usuarios on init', () => {
    const mockUsuarios: User[] = [
      { username: 'admin', role: 'admin' },
      { username: 'user', role: 'user' }
    ];
    
    mockUsuariosApi.getUsuarios.and.returnValue({
      subscribe: (observer: any) => {
        observer.next(mockUsuarios);
        observer.complete();
      }
    } as any);

    component.ngOnInit();

    expect(mockUsuariosApi.getUsuarios).toHaveBeenCalled();
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should handle error when loading usuarios', () => {
    mockUsuariosApi.getUsuarios.and.returnValue({
      subscribe: (observer: any) => {
        observer.error('Error loading usuarios');
      }
    } as any);

    component.loadUsuarios();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Error al cargar usuarios',
      'Cerrar',
      jasmine.any(Object)
    );
  });

  it('should delete usuario when confirmed', () => {
    const usuario: User = { username: 'test', role: 'user' };
    spyOn(window, 'confirm').and.returnValue(true);
    
    mockUsuariosApi.deleteUsuario.and.returnValue({
      subscribe: (observer: any) => {
        observer.next();
        observer.complete();
      }
    } as any);

    component.deleteUsuario(usuario);

    expect(mockUsuariosApi.deleteUsuario).toHaveBeenCalledWith('test');
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Usuario eliminado correctamente',
      'Cerrar',
      jasmine.any(Object)
    );
  });

  it('should not delete usuario when not confirmed', () => {
    const usuario: User = { username: 'test', role: 'user' };
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteUsuario(usuario);

    expect(mockUsuariosApi.deleteUsuario).not.toHaveBeenCalled();
  });

  it('should show edit message', () => {
    const usuario: User = { username: 'test', role: 'user' };
    
    component.editUsuario(usuario);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Funcionalidad de edición en desarrollo',
      'Cerrar',
      { duration: 3000 }
    );
  });

  it('should show view message', () => {
    const usuario: User = { username: 'test', role: 'user' };
    
    component.viewUsuario(usuario);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Funcionalidad de vista en desarrollo',
      'Cerrar',
      { duration: 3000 }
    );
  });
});
