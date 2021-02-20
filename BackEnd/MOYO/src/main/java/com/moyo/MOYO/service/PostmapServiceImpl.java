package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;
import com.moyo.MOYO.repository.PostmapRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PostmapServiceImpl implements PostmapService{
	
	@Autowired
	PostmapRepository pRepo;

	@Override
	public List<Postmap> selectAll(HashMap<String, Object> map) {
		log.trace("PostmapService - selectAll : ",map);
		return pRepo.selectAll(map);
	}
	
	@Override
	public List<Postmap> selectExceptTop(HashMap<String, Object> map) {
		log.trace("PostmapService - selectExceptTop : ",map);
		return pRepo.selectExceptTop(map);
	}
	
	@Override
	public List<Postmap> selectTop(HashMap<String, Object> map) {
		log.trace("PostmapService - selectTop : ",map);
		return pRepo.selectTop(map);
	}

	@Override
	public Postmap selectOne(int pmId) {
		log.trace("PostmapService - selectOne : ",pmId);
		return pRepo.selectOne(pmId);
	}

	@Override
	public int insertPostmap(Postmap postmap) {
		log.trace("PostmapService - insertPostmap: ",postmap);
		return pRepo.insertPostmap(postmap);
	}

	@Override
	public int deletePostmap(int pmId) {
		log.trace("PostmapService - deletePostmap : ",pmId);
		return pRepo.deletePostmap(pmId);
	}

	@Override
	public int checkDuration(String today) {
		log.trace("PostmapService - checkDuration : ",today);
		return pRepo.checkDuration(today);
	}

	@Override
	public int likePostmap(Postmaplike postmaplike) {
		log.trace("PostmapService - likePostmap : ", postmaplike);
		return pRepo.insertPostmapLike(postmaplike);
	}

	@Override
	public int deletePostmapLike(int pmLikeId) {
		log.trace("PostmapService - deletePostmapLike : ",pmLikeId);
		return pRepo.deletePostmapLike(pmLikeId);
	}

	@Override
	public int selectPostmapLike(int pmId) {
		log.trace("PostmapService - selectPostmapLike : ",pmId);
		return pRepo.selectPostmapLike(pmId);
	}

	@Override
	public int checkLikeDuplicate(Postmaplike postmaplike) {
		log.trace("PostmapService - checkLikeDuplicate : ", postmaplike);
		return pRepo.checkLikeDuplicate(postmaplike);
	}

	@Override
	public Postmaplike selectLikeOne(Postmaplike postmaplike) {
		log.trace("PostmapService - checkLikeDuplicate : ", postmaplike);
		return pRepo.selectLikeOne(postmaplike);
	}

}
