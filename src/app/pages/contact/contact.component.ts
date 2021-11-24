import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { init } from 'emailjs-com';
init('user_sxKP6NpexcCxnJmKZAZYy');
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;

  constructor(private builder: FormBuilder, private uiService: UIService) {}

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Comment: new FormControl('', [Validators.required]),
    });
  }

  public sendEmail(e: Event) {
    emailjs
      .sendForm('service_mcpceks', 'template_dw5k3ni', e.target as HTMLFormElement, 'user_sxKP6NpexcCxnJmKZAZYy')
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.FormData.reset();
          this.uiService.showSnackbar('Baseball Card added successfully', undefined, 3000);
        },
        (error) => {
          console.log(error.text);
          this.uiService.showSnackbar('Failed to add baseball card, please try again later', undefined, 3000);
        }
      );
  }
}
