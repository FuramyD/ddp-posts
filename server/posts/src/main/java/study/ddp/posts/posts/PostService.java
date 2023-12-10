package study.ddp.posts.posts;

public interface PostService {
    Post likePost(Long postId);
    Post dislikePost(Long postId);
    Post createPost(Post post);
    Post updatePost(Long id, PostDto post);
}
