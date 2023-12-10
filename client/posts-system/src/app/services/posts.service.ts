import { BACKEND_API_URL } from "../tokens/backend-api-url.token";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/posts/post.model";
import { CreatePostPayload } from "../models/posts/payloads/create-post-payload";
import { UpdatePostPayload } from "../models/posts/payloads/update-post.payload";


@Injectable({ providedIn: "root" })
export class PostsService {
    private readonly backendApiUrl: string = inject(BACKEND_API_URL);
    private readonly httpClient: HttpClient = inject(HttpClient);

    public stressTest(): void {
        for (let i = 0; i < 1000; i++) {
            this.likePost(1).subscribe((response) => console.log({ response }));
        }
    }

    public getPosts(search: string): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.backendApiUrl}/posts/search?search=${search}`);
    }

    public createPost(post: CreatePostPayload): Observable<Post> {
        return this.httpClient.post<Post>(`${this.backendApiUrl}/posts`, post);
    }

    public updatePost({ id, ...updatePostPayload }: UpdatePostPayload): Observable<Post> {
        return this.httpClient.patch<Post>(`${this.backendApiUrl}/posts/${id}`, updatePostPayload);
    }

    public likePost(postId: number): Observable<Post> {
        return this.httpClient.post<Post>(`${this.backendApiUrl}/posts/${postId}/like`, {});
    }

    public dislikePost(postId: number): Observable<Post> {
        return this.httpClient.post<Post>(`${this.backendApiUrl}/posts/${postId}/dislike`, {});
    }
}
