package study.ddp.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import study.ddp.posts.posts.Post;
import study.ddp.posts.posts.PostRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final PostRepository postRepository;

    @Autowired
    public DatabaseLoader(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public void run(String... args) throws Exception {
//        this.postRepository.save(new Post("Test Title", "Some content", 0, 0));
//        this.postRepository.save(new Post("Test Title 2", "Some content 2", 5, 3));
    }
}
