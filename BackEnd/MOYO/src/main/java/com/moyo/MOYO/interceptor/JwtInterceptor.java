package com.moyo.MOYO.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;

import com.moyo.MOYO.service.JwtService;

@Component
@CrossOrigin("*")
public class JwtInterceptor implements HandlerInterceptor {
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		} else {
			String token = request.getHeader("userToken");
			if (token != null && jwtService.isValidToken(token)) {
				return true;
			} else {
				throw new RuntimeException("인증 토큰이 없습니다.");
			}
		}
	}

}
