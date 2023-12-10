import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TuiIconModule } from "@taiga-ui/experimental";
import { TuiButtonModule, TuiDialogModule } from "@taiga-ui/core";
import { UpdatePostPayload } from "../../../models/posts/payloads/update-post.payload";
import { Post } from "../../../models/posts/post.model";
import { PostFormComponent } from "../post-form/post-form.component";
import { CreatePostPayload } from "../../../models/posts/payloads/create-post-payload";

@Component({
  selector: 'app-edit-post-button',
  standalone: true,
    imports: [
        TuiIconModule,
        TuiButtonModule,
        PostFormComponent,
        TuiDialogModule
    ],
  templateUrl: './edit-post-button.component.html',
  styleUrl: './edit-post-button.component.less'
})
export class EditPostButtonComponent {

    @Input({ required: true }) post!: Post;
    @Input() loading: boolean | null = false;

    @Output() updatePost: EventEmitter<UpdatePostPayload> = new EventEmitter<UpdatePostPayload>();

    public isFormDialogOpened: boolean = false

    public openEditForm(): void {
        this.isFormDialogOpened = true;
    }

    public onPostUpdate(payload: CreatePostPayload): void {
        this.updatePost.emit({
            id: this.post.id,
            ...payload
        });
    }
}
