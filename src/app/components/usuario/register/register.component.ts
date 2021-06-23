import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) { 
    this.registerForm = this.fb.group({
    usuario:['', [Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],
    repetirPassword:['']
    }, {validator: this.checkPassword })
  }

  ngOnInit(): void {
  }

  register(){
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value; 

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(usuario,password).then(rta => {
      this.toastr.success('El usuario fue registrado con Exito!', 'Usuario registrado!');
      this.router.navigate(['/usuario'])
    }).catch(error => {
      this.loading = false;
      this.toastr.error(this.error(error.code), 'Error!');
    })
  }

  error(code: string): string {

    switch(code) {

      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado'
      case 'auth/invalid-email':
        return 'El correo es invalido'
      case 'auth/weak-password':
        return 'El correo es invalido'
      default:
        return 'La contraseña es debil'
    }
  }

  checkPassword(group: FormGroup ): any{
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    console.log(pass);
    console.log(confirmPassword);
    return pass === confirmPassword ? null : {notSame: true}
  }


}
