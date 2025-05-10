import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login !: FormGroup;

  constructor(private service : ServiceService , private router : Router){ }


  ngOnInit()
  {
    this.login = new FormGroup({
      email : new FormControl(''),
      password : new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.login.value);

    this.service.login(this.login.value).subscribe((res:any)=> {
      console.log(res);
      if (res.status === 'success') {
          this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

}
