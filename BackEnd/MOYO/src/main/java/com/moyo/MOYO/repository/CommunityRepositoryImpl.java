package com.moyo.MOYO.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.dto.CommunityType;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class CommunityRepositoryImpl implements CommunityRepository {
	private String ns = "moyo.communitymapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<Community> selectAll(Map<String, Object> param) {
		log.trace("CommunityRepository - selectAll");
		return session.selectList(ns + "selectAll", param);
	}
	
	@Override
	public List<Community> selectAllByUser(int uId) {
		log.trace("CommunityRepository - selectAllByUser");
		return session.selectList(ns + "selectAllByUser", uId);
	}
	
	@Override
	public Community selectOne(int cmId) {
		log.trace("CommunityRepository - selectOne");
		return session.selectOne(ns + "selectOne", cmId);
	}
	
	@Override
	public List<CommunityType> selectCommunityType() {
		log.trace("CommunityRepository - selectCommunityType");
		return session.selectList(ns + "selectCommunityType");
	}
	
	@Override
	public int create(Community community) {
		log.trace("CommunityRepository - create");
		return session.insert(ns + "createCommunity", community);
	}
	
	@Override
	public int delete(int cmId) {
		log.trace("CommunityRepository - delete");
		return session.delete(ns + "deleteCommunity", cmId);
	}
	
	@Override
	public int update(Community community) {
		log.trace("CommunityRepository - update");
		return session.update(ns + "updateCommunity", community);
	}
	
}
