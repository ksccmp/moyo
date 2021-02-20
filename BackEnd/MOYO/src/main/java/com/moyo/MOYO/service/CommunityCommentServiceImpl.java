package com.moyo.MOYO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.CommunityComment;
import com.moyo.MOYO.repository.CommunityCommentRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommunityCommentServiceImpl implements CommunityCommentService{
	
	@Autowired
	CommunityCommentRepository cCommentRepo;
	
	@Override
	public List<CommunityComment> selectAll() {
		log.trace("CommunityCommentService - selectAll");
		return cCommentRepo.selectAll();
	}
	
	@Override
	public List<CommunityComment> selectAllByCommunity(int cmId) {
		log.trace("CommunityCommentService - selectAllByCommunity");
		return cCommentRepo.selectAllByCommunity(cmId);
	}
	
	@Override
	@Transactional
	public int create(CommunityComment communityComment) {
		log.trace("CommunityCommentService - create");
		return cCommentRepo.create(communityComment);
	}
	
	@Override
	@Transactional
	public int delete(int cmCommentId) {
		log.trace("CommunityCommentService - delete");
		return cCommentRepo.delete(cmCommentId);
	}
	
	@Override
	@Transactional
	public int update(CommunityComment communityComment) {
		log.trace("CommunityCommentService - update");
		return cCommentRepo.update(communityComment);
	}

}
