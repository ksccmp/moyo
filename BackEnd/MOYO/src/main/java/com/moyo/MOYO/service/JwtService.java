package com.moyo.MOYO.service;

import com.moyo.MOYO.dto.User;

public interface JwtService {
	public String createLoginToken(User user);
	public User getUser(String jwt);
	public boolean isValidToken(String jwt);

}
