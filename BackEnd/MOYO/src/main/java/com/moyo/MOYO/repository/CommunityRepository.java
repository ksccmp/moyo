package com.moyo.MOYO.repository;

import java.util.List;
import java.util.Map;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.dto.CommunityType;

public interface CommunityRepository {
	public List<Community> selectAll(Map<String, Object> param);
	
	public List<Community> selectAllByUser(int uId);
	
	public Community selectOne(int cmId);
	
	public List<CommunityType> selectCommunityType();
	
	public int create(Community community);
	
	public int delete(int cmId);
	
	public int update(Community community);
	
}
