package study.ddp.posts.posts;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
@Setter
@Data
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private int likes;
    private int dislikes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
