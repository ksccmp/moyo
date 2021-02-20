package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.User;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class UserRepositoryImpl implements UserRepository {
	private String ns = "moyo.usermapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<User> selectAll() {
		log.trace("UserRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
	
	@Override
    public User selectOne(int uId) {
    	log.trace("UserRepository - selectOne");
    	return session.selectOne(ns + "selectOne", uId);
    }
    
    @Override
    public User selectOneBySocialId(Map<String, Object> param) {
    	log.trace("UserRepository - selectOneBySocialId");
    	return session.selectOne(ns + "selectOneBySocialId", param);
    }
    
    @Override
    public User selectOneByNickname(String nickname) {
    	log.trace("UserRepository - selectOneByNickname");
    	return session.selectOne(ns + "selectOneByNickname", nickname);
    }
    
	@Override
	public int register(User user) {
		log.trace("UserRepository - register");
		return session.insert(ns + "registerUser", user);
	}
	
    @Override
    public int delete(int uId) {
    	log.trace("UserRepository - delete");
		return session.delete(ns + "deleteUser", uId);
    }
    
    @Override
    public int update(User user) {
    	log.trace("UserRepository - update");
    	return session.update(ns + "updateUser", user);
    }
    
    @Override
    public int updateImage(Map<String, Object> responseImage) {
    	log.trace("UserRepository - updateImage");
    	return session.update(ns + "updateUserImage", responseImage);
    }
}
