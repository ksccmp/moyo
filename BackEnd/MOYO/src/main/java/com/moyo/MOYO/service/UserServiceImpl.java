package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository uRepo;
	
	@Override
	public List<User> selectAll() {
		log.trace("UserService - selectAll");
		return uRepo.selectAll();
	}
	
	@Override
	public User selectOne(int uId) {
		log.trace("UserService - selectOne");
		return uRepo.selectOne(uId);
	}
	
	@Override
	public User selectOneBySocialId(String socialId, int provider) {
		log.trace("UserService - selectOneBySocialId");
		Map<String, Object> param = new HashMap<String, Object>();
    	param.put("socialId", socialId);
    	param.put("provider", provider);
		return uRepo.selectOneBySocialId(param);
	}
	
	@Override
	public User selectOneByNickname(String nickname) {
		log.trace("UserService - selectOneByNickname");
		return uRepo.selectOneByNickname(nickname);
	}
	
	@Override
	@Transactional
	public int register(User user) {
		log.trace("UserService - register");
		return uRepo.register(user);
	}
	
	@Override
	@Transactional
	public int delete(int uId) {
		log.trace("UserService - delete");
		return uRepo.delete(uId);
	}
	
	@Override
	@Transactional
	public int update(User user) {
		log.trace("UserService - update");
		return uRepo.update(user);
	}
	
	@Override
	public int updateImage(Map<String, Object> responseImage) {
		log.trace("UserService - updateImage");
		return uRepo.updateImage(responseImage);
	}
}
