package study.ddp.posts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("{:^(?!api).*}/**")
    public String any() {
        return index();
    }


}
