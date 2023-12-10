package study.ddp.posts.posts;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PostNotFoundException extends ResponseStatusException {
    public PostNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "Post with id " + id + " not found!");
    }
}
