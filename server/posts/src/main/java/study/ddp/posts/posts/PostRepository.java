package study.ddp.posts.posts;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
public interface PostRepository extends PagingAndSortingRepository<Post, Long>, CrudRepository<Post, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Post> findById(Long id);


    @Query("SELECT post FROM Post post WHERE lower(post.title) LIKE lower(concat('%', ?1, '%')) OR lower(post.content) LIKE lower(concat('%', ?1, '%'))")
    List<Post> findByTitleOrContent(String titleOrContent);



}
