package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.dto.CommunityType;
import com.moyo.MOYO.repository.CommunityRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommunityServiceImpl implements CommunityService {
	
	@Autowired
	CommunityRepository cRepo;
	
	@Override
	public List<Community> selectAll(int cmTypeId, String searchWord) {
		log.trace("CommunityService - selectAll");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("cmTypeId", cmTypeId);
		param.put("searchWord", searchWord);
		return cRepo.selectAll(param);
	}
	
	@Override
	public List<Community> selectAllByUser(int uId) {
		log.trace("CommunityService - selectAllByUser");
		return cRepo.selectAllByUser(uId);
	}
	
	@Override
	public Community selectOne(int cmId) {
		log.trace("CommunityService - selectOne");
		return cRepo.selectOne(cmId);
	}
	
	@Override
	public List<CommunityType> selectCommunityType() {
		log.trace("CommunityService - selectCommunityType");
		return cRepo.selectCommunityType();
	}
	
	@Override
	@Transactional
	public int create(Community community) {
		log.trace("CommunityService - create");
		return cRepo.create(community);
	}
	
	@Override
	@Transactional
	public int delete(int cmId) {
		log.trace("CommunityService - delete");
		return cRepo.delete(cmId);
	}
	
	@Override
	@Transactional
	public int update(Community community) {
		log.trace("CommunityService - update");
		return cRepo.update(community);
	}
	
}
