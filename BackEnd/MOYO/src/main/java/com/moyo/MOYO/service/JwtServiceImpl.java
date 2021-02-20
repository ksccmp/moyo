package com.moyo.MOYO.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moyo.MOYO.dto.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Service("jwtService")
@Slf4j
public class JwtServiceImpl implements JwtService {
	private static final String AT_SECRET_KEY = "MOYOSECRET_AT";
	private static final String RT_SECRET_KEY = "MOYOSECRET_RT";
	private static final String DATA_KEY = "user";
	
	@Autowired
	private ObjectMapper objectmapper;
	
	@Override
	public String createLoginToken(User user) {
		String jwt = Jwts.builder()
						.setHeaderParam("typ", "JWT")
						.setHeaderParam("regDate", System.currentTimeMillis())
						.claim(DATA_KEY, user)
						.signWith(SignatureAlgorithm.HS256, this.generateKey())
						.compact();
		return jwt;
	}
	
	private byte[] generateKey() {
		byte[] key = null;
		try {
			key = AT_SECRET_KEY.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			if (log.isInfoEnabled()) {
				e.printStackTrace();
			} else {
				log.error("Making JWT Key Error ::: {}", e.getMessage());
			}
		}
		
		return key;
	}
	
	@Override
	public User getUser(String jwt) {
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser()
						 .setSigningKey(this.generateKey())
						 .parseClaimsJws(jwt);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new JwtException("decoding failed");
		}
		
		return objectmapper.convertValue(claims.getBody().get(DATA_KEY), User.class);
	}
	
	@Override
	public boolean isValidToken(String jwt) {
		try {
			Jwts.parser()
						 .setSigningKey(this.generateKey())
						 .parseClaimsJws(jwt);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

}
