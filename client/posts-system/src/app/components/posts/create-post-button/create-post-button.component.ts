import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CreatePostPayload } from "../../../models/posts/payloads/create-post-payload";
import { TuiButtonModule, TuiDialogModule } from "@taiga-ui/core";
import { PostFormComponent } from "../post-form/post-form.component";

@Component({
  selector: 'app-create-post-button',
  standalone: true,
    imports: [
        TuiButtonModule,
        TuiDialogModule,
        PostFormComponent
    ],
  templateUrl: './create-post-button.component.html',
  styleUrl: './create-post-button.component.less'
})
export class CreatePostButtonComponent {
    @Input() loading: boolean | null = false;
    @Output() createPost: EventEmitter<CreatePostPayload> = new EventEmitter<CreatePostPayload>();

    public isFormDialogOpened: boolean = false;

    public openCreationForm(): void {
        this.isFormDialogOpened = true;
    }
}
