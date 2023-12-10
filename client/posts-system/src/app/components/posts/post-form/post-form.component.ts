import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "../../../models/posts/post.model";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiInputModule, TuiTextareaModule } from "@taiga-ui/kit";
import { TuiButtonModule } from "@taiga-ui/core";
import { CreatePostPayload } from "../../../models/posts/payloads/create-post-payload";

@Component({
  selector: 'app-post-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextareaModule,
        TuiButtonModule
    ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.less'
})
export class PostFormComponent implements OnInit {
    @Input() loading: boolean | null = false;
    @Input() post: Post | null = null;

    @Output() submitForm: EventEmitter<CreatePostPayload> = new EventEmitter<CreatePostPayload>();
    @Output() cancelled: EventEmitter<void> = new EventEmitter<void>();

    public formGroup = new FormGroup({
        title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        content: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });

    public ngOnInit(): void {
        if (this.post) {
            this.formGroup.patchValue({
                title: this.post.title,
                content: this.post.content
            });
        }
    }

    public onSubmitForm(): void {
        if (this.formGroup.valid) {
            this.submitForm.emit(this.formGroup.getRawValue());
        }
    }
}
