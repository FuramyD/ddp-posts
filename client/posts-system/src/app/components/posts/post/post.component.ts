import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Post } from "../../../models/posts/post.model";
import { UpdatePostPayload } from "../../../models/posts/payloads/update-post.payload";
import { TuiIslandModule, TuiLineClampModule } from "@taiga-ui/kit";
import { TuiButtonModule } from "@taiga-ui/core";
import { WINDOW } from "@ng-web-apis/common";
import {TuiIconModule} from '@taiga-ui/experimental';
import { EditPostButtonComponent } from "../edit-post-button/edit-post-button.component";

@Component({
  selector: 'app-post',
  standalone: true,
    imports: [
        TuiIslandModule,
        TuiButtonModule,
        TuiLineClampModule,
        TuiIconModule,
        EditPostButtonComponent
    ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.less'
})
export class PostComponent {
    private readonly windowRef: Window = inject(WINDOW);

    @Input({ required: true }) post!: Post;
    @Input() formLoading: boolean | null = false;

    @Output() updatePost: EventEmitter<UpdatePostPayload> = new EventEmitter<UpdatePostPayload>();
    @Output() likePost: EventEmitter<void> = new EventEmitter<void>();
    @Output() dislikePost: EventEmitter<void> = new EventEmitter<void>();

    public getDynamicLineHeight(element: HTMLDivElement): number {
        return parseInt(this.windowRef.getComputedStyle(element).lineHeight, 10);
    }

    public getDynamicLineLimit(element: HTMLDivElement): number {
        return Math.floor(element.offsetHeight / 24);
    }

}
