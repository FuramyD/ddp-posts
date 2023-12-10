package study.ddp.posts.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
@EnableAsync
@EnableScheduling
public class WebAppConfig extends WebMvcConfigurationSupport {
    private static final int CACHE_PERIOD_ONE_YEAR = 31536000;

    @Override
    public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("/static/")
                .setCachePeriod(CACHE_PERIOD_ONE_YEAR);
    }
}
