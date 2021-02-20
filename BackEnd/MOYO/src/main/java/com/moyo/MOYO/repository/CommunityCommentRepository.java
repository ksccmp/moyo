package com.moyo.MOYO.repository;

import java.util.List;

import com.moyo.MOYO.dto.CommunityComment;

public interface CommunityCommentRepository {
	public List<CommunityComment> selectAll();
	
	public List<CommunityComment> selectAllByCommunity(int cmId);
	
	public int create(CommunityComment communityComment);
	
	public int delete(int cmCommentId);
	
	public int update(CommunityComment communityComment);

}
