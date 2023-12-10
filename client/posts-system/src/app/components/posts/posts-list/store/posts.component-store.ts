import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Post } from "../../../../models/posts/post.model";
import { PostsService } from "../../../../services/posts.service";
import { inject, Injectable } from "@angular/core";
import { concatMap, exhaustMap, finalize, Observable, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { UpdatePostPayload } from "../../../../models/posts/payloads/update-post.payload";
import { CreatePostPayload } from "../../../../models/posts/payloads/create-post-payload";

export interface PostsState {
    posts: Post[];
    loading: boolean;
    formLoading: boolean;
}

@Injectable()
export class PostsStore extends ComponentStore<PostsState> {
    private postsService: PostsService = inject(PostsService);

    public readonly posts$ = this.select((state) => state.posts);
    public readonly loading$ = this.select((state) => state.loading);
    public readonly formLoading$ = this.select((state) => state.formLoading);

    public readonly loadPosts = this.effect((search$: Observable<string>) => search$.pipe(
        switchMap((search: string) => {
            this.setLoading(true);
            return this.postsService.getPosts(search).pipe(
                tapResponse(
                    (posts: Post[]) => this.setPosts(posts),
                    (error: HttpErrorResponse) => console.error("Error when fetching posts:", error),
                ),
                finalize(() => this.setLoading(false)),
            );
        })
    ));

    public readonly createPost = this.effect((post$: Observable<CreatePostPayload>) => post$.pipe(
        tap(() => this.setFormLoading(true)),
        exhaustMap((post: CreatePostPayload) => this.postsService.createPost(post).pipe(
            tapResponse(
                (post: Post) => this.setPosts([...this.get().posts, post]),
                (error: HttpErrorResponse) => console.error("Error when creating post:", error),
            ),
            finalize(() => this.setFormLoading(false)),
        ))
    ));

    public readonly updatePost = this.effect((post$: Observable<UpdatePostPayload>) => post$.pipe(
        concatMap((post: UpdatePostPayload) => {
            this.setFormLoading(true);
            return this.postsService.updatePost(post).pipe(
                tapResponse(
                    (post: Post) => this.setPosts(this.get().posts.map((p) => p.id === post.id ? post : p)),
                    (error: HttpErrorResponse) => console.error("Error when updating post:", error),
                ),
                finalize(() => this.setFormLoading(false)),
            );
        })
    ))

    public readonly likePost = this.effect((postId$: Observable<number>) => postId$.pipe(
        concatMap((postId: number) => {
            this.setFormLoading(true);
            return this.postsService.likePost(postId).pipe(
                tapResponse(
                    (post: Post) => this.setPosts(this.get().posts.map((p) => p.id === post.id ? post : p)),
                    (error: HttpErrorResponse) => console.error("Error when liking post:", error),
                ),
                finalize(() => this.setFormLoading(false)),
            );
        })
    ));

    public readonly dislikePost = this.effect((postId$: Observable<number>) => postId$.pipe(
        concatMap((postId: number) => {
            this.setFormLoading(true);
            return this.postsService.dislikePost(postId).pipe(
                tapResponse(
                    (post: Post) => this.setPosts(this.get().posts.map((p) => p.id === post.id ? post : p)),
                    (error: HttpErrorResponse) => console.error("Error when disliking post:", error),
                ),
                finalize(() => this.setFormLoading(false)),
            );
        })
    ));

    private readonly setPosts = this.updater((state, posts: Post[]) => ({
        ...state,
        posts,
    }));

    private readonly setLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading,
    }));

    private readonly setFormLoading = this.updater((state, formLoading: boolean) => ({
        ...state,
        formLoading,
    }));

    constructor() {
        super({
            posts: [],
            loading: true,
            formLoading: false,
        });
    }

}
