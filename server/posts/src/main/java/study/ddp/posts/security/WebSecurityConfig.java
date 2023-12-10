package study.ddp.posts.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    private static final String API_URL_PATTERN = "/api/posts/**";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);
        return http
            .authorizeHttpRequests(authorizeRequests ->
                    authorizeRequests
                        .requestMatchers(mvcMatcherBuilder.pattern(API_URL_PATTERN)).permitAll()
                        .anyRequest().permitAll()
            )
            .csrf(csrfConfigurer ->
                    csrfConfigurer
                            .ignoringRequestMatchers(mvcMatcherBuilder.pattern(API_URL_PATTERN))
            )
            .cors(corsConfigurer -> corsConfigurer.configurationSource(request -> {
                var cors = new org.springframework.web.cors.CorsConfiguration();
                cors.setAllowedOrigins(java.util.List.of("*"));
                cors.setAllowedMethods(java.util.List.of("GET", "POST", "PATCH", "DELETE"));
                cors.setAllowedHeaders(java.util.List.of("*"));
                return cors;
            }))
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults())
            .build();
    }

}
