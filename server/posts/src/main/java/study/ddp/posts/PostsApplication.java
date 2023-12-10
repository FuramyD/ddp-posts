package study.ddp.posts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "study.ddp.posts",
        "org.mapstruct.*"
})
public class PostsApplication {

    public static void main(String[] args) {
        SpringApplication.run(PostsApplication.class, args);
    }

}
