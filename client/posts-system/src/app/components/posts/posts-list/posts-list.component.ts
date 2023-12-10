import { Component, inject, OnInit } from "@angular/core";
import { PostsStore } from "./store/posts.component-store";
import { BehaviorSubject, debounceTime, distinctUntilChanged, startWith } from "rxjs";
import { PostComponent } from "../post/post.component";
import { CommonModule } from "@angular/common";
import { CreatePostButtonComponent } from "../create-post-button/create-post-button.component";
import { TuiInputModule } from "@taiga-ui/kit";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TuiLoaderModule } from "@taiga-ui/core";

@Component({
    selector: "app-posts-list",
    standalone: true,
    imports: [
        CommonModule,
        PostComponent,
        CreatePostButtonComponent,
        TuiInputModule,
        ReactiveFormsModule,
        TuiLoaderModule,
    ],
    templateUrl: "./posts-list.component.html",
    styleUrl: "./posts-list.component.less",
    providers: [PostsStore]
})
export class PostsListComponent implements OnInit {
    private readonly postsStore: PostsStore = inject(PostsStore);

    public searchControl: FormControl<string> = new FormControl<string>("", { nonNullable: true });

    public readonly posts$ = this.postsStore.posts$;
    public readonly loading$ = this.postsStore.loading$;
    public readonly formLoading$ = this.postsStore.formLoading$;

    public readonly updatePost = this.postsStore.updatePost;
    public readonly createPost = this.postsStore.createPost;
    public readonly likePost = this.postsStore.likePost;
    public readonly dislikePost = this.postsStore.dislikePost;

    public ngOnInit(): void {
        this.postsStore.setSearchValue(this.searchControl.valueChanges.pipe(
            startWith("")
        ));
        this.postsStore.loadPosts(this.postsStore.searchValue$);
    }
}
