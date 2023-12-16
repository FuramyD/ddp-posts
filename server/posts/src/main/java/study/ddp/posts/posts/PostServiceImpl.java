package study.ddp.posts.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(timeout = 2)
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository repository;
    private final PostMapper mapper;

    @Override
    public Post likePost(Long id) {
        Post post = repository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
        post.setLikes(post.getLikes() + 1);
        return repository.save(post);
    }

    @Override
    public Post dislikePost(Long postId) {
        Post post = repository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        post.setDislikes(post.getDislikes() + 1);
        return repository.save(post);
    }


    @Override
    public Post createPost(Post post) {
        return repository.save(post);
    }

    @Override
    public Post updatePost(Long id, PostDto post) {
        // partial update post logic
        Post postToUpdate = repository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
        if (post.getContent() != null) {
            postToUpdate.setContent(post.getContent());
        }

        if (post.getTitle() != null) {
            postToUpdate.setTitle(post.getTitle());
        }
//        mapper.updatePostFromDto(post, postToUpdate);
        System.out.println("postToUpdate = " + postToUpdate);
        System.out.println("post = " + post);
        return repository.save(postToUpdate);
    }
}
