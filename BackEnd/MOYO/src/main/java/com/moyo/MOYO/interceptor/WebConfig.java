package com.moyo.MOYO.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@CrossOrigin("*")
public class WebConfig implements WebMvcConfigurer {
	private static final String[] EXCLUDE_PATHS = {
		"/user/**",
		"/v2/api-docs",
		"/swagger-resources/**",
		"/swagger-ui.html/**",
		"/webjars/**"
	};
	
	@Autowired
	private JwtInterceptor jwtInterceptor;
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        		.allowedOrigins("*")
        		.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS")
        		.allowedHeaders("*")
        		.exposedHeaders("userToken")
        		.maxAge(3600);
    }
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(jwtInterceptor)
										.addPathPatterns("/**")
										.excludePathPatterns(EXCLUDE_PATHS);
	}
	
}
