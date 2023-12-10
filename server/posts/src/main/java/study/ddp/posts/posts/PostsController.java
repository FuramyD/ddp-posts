package study.ddp.posts.posts;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.lang.Thread.currentThread;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostsController {

    private final PostRepository repository;
    private final PostService postService;
    private final Logger logger = LoggerFactory.getLogger(PostsController.class);


    @GetMapping
    public Iterable<Post> getAllPosts() {
        Iterable<Post> postsIterable = repository.findAll();
        return StreamSupport.stream(postsIterable.spliterator(), false).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable("id") Long id) throws PostNotFoundException {
        return repository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    @GetMapping("/search")
    public Iterable<Post> searchPosts(@RequestParam("search") String searchValue) {
        return repository.findByTitleOrContent(searchValue);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PatchMapping("/{id}")
    public Post updatePost(@PathVariable("id") Long id, @RequestBody PostDto post) throws PostNotFoundException {
        return postService.updatePost(id, post);
    }

    @PostMapping("/{id}/like")
    public Post likePost(@PathVariable("id") Long id) throws PostNotFoundException {
        return postService.likePost(id);
    }

    @PostMapping("/{id}/dislike")
    public Post dislikePost(@PathVariable("id") Long id) throws PostNotFoundException {
        return postService.dislikePost(id);
    }
}
