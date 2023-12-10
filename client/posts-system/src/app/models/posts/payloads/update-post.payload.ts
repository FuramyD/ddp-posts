import { CreatePostPayload } from "./create-post-payload";
import { Post } from "../post.model";

export type UpdatePostPayload = Partial<CreatePostPayload> & Pick<Post, "id">;
