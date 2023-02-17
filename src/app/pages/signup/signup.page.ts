import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private dbService: ApiService,
    private loadingCtrl: LoadingController,
    private router: Router) {
    this.credentials = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  get username() {
    return this.credentials.get('username');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const { email, password } = this.credentials.value;
    const user = await this.authService.register({ email, password });
    await loading.dismiss();

    if (user) {
      const path = 'Users';
      const id = user.user.uid;
      const data = { username : this.username?.value };
      await this.dbService.createDoc( data, path, id );
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
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
