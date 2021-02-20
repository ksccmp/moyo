package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;

public interface PostmapRepository {
	public static final int TOP = 3;
	
	public List<Postmap> selectAll(HashMap<String, Object> map);
	
	public List<Postmap> selectTop(HashMap<String, Object> map);
	
	public List<Postmap> selectExceptTop(HashMap<String, Object> map);
	
	public Postmap selectOne(int pmId);
	
	public int insertPostmap(Postmap postmap);
	
	public int deletePostmap(int pmId);
	
	public int checkDuration(String today);
	
	public int insertPostmapLike(Postmaplike postmaplike);
	
	public int deletePostmapLike(int pmLikeId);
	
	public int selectPostmapLike(int pmId);

	public int checkLikeDuplicate(Postmaplike postmaplike);

	public Postmaplike selectLikeOne(Postmaplike postmaplike);
}
