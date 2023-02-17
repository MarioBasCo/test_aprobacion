import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController) { 
    this.formLogin = this.initForm();
  }

  ngOnInit() {
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  async login(){
    const loading = await this.loadingCtrl.create();
		await loading.present();

		const user = await this.authService.login(this.formLogin.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
