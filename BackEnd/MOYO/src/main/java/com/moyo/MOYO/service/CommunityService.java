package com.moyo.MOYO.service;

import java.util.List;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.dto.CommunityType;

public interface CommunityService {
	public List<Community> selectAll(int cmTypeId, String searchWord);
	
	public List<Community> selectAllByUser(int uId);
	
	public Community selectOne(int cmId);
	
	public List<CommunityType> selectCommunityType();
	
	public int create(Community community);
	
	public int delete(int cmId);
	
	public int update(Community community);
}
