import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login } from './login';
import { Auth } from '../core/auth/auth';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuth: jasmine.SpyObj<Auth>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuth = jasmine.createSpyObj('Auth', ['logIn']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Auth, useValue: mockAuth },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['username'].setValue('test');
    form.controls['password'].setValue('test');
    expect(form.valid).toBeTruthy();
  });

  it('should call auth.logIn on valid form submission', () => {
    mockAuth.logIn.and.returnValue(true);
    
    component.loginForm.patchValue({
      username: 'admin',
      password: 'admin'
    });

    component.onSubmit();

    expect(mockAuth.logIn).toHaveBeenCalledWith('admin', 'admin');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/alumnos']);
  });

  it('should show error message on invalid credentials', () => {
    mockAuth.logIn.and.returnValue(false);
    
    component.loginForm.patchValue({
      username: 'invalid',
      password: 'invalid'
    });

    component.onSubmit();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Credenciales incorrectas',
      'Cerrar',
      jasmine.any(Object)
    );
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    
    expect(mockAuth.logIn).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
