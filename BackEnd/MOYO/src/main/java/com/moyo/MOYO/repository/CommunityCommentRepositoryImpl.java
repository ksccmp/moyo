package com.moyo.MOYO.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.CommunityComment;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class CommunityCommentRepositoryImpl implements CommunityCommentRepository{
	private String ns = "moyo.communitycommentmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<CommunityComment> selectAll() {
		log.trace("CommunityCommentRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
	
	@Override
	public List<CommunityComment> selectAllByCommunity(int cmId) {
		log.trace("CommunityCommentRepository - selectAllByCommunity");
		return session.selectList(ns + "selectAllByCommunity", cmId);
	}
	
	@Override
	public int create(CommunityComment communityComment) {
		log.trace("CommunityCommentRepository - create");
		return session.insert(ns + "createComment", communityComment);
	}
	
	@Override
	public int delete(int cmCommentId) {
		log.trace("CommunityCommentRepository - delete");
		return session.delete(ns + "deleteComment", cmCommentId);
	}
	
	@Override
	public int update(CommunityComment communityComment) {
		log.trace("CommunityCommentRepository - update");
		return session.update(ns + "updateComment", communityComment);
	}

}
