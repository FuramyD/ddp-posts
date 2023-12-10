package study.ddp.posts.posts;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Entity
@Table(name = "posts", schema = "public")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    private String title;

    @Setter
    private String content;

    @Setter
    private int likes;

    @Setter
    private int dislikes;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(updatable = false)
    private LocalDateTime updatedAt;


    public Post(String title, String content, int likes, int dislikes) {
        this.title = title;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    protected Post() {}

    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &&
                Objects.equals(title, post.title) &&
                Objects.equals(content, post.content) &&
                Objects.equals(likes, post.likes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, content, likes);
    }


    @Override
    public String toString() {
        return "Post {" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", likes='" + likes + '\'' +
                '}';
    }
}
