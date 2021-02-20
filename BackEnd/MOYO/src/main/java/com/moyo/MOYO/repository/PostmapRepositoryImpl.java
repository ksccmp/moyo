package com.moyo.MOYO.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
@Transactional
public class PostmapRepositoryImpl implements PostmapRepository{
	private String ns = "moyo.postmapmapper.";
	
	@Autowired
	SqlSession session;

	@Override
	public List<Postmap> selectAll(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectAll : ",map);
		List<Postmap> list = session.selectList(ns+ "selectAll",map);
		List<Postmap> postmapList = new ArrayList<>();
		
		double latitude = Math.toRadians((double) map.get("latitude"));
		double longitude = Math.toRadians((double) map.get("longitude"));
		for(Postmap post : list) {
			double pLat = Math.toRadians(post.getLatitude());
			double pLng = Math.toRadians(post.getLongitude());
			double distance = ( 6371 * Math.acos( Math.cos( latitude ) * Math.cos( pLat )
			          * Math.cos( pLng - longitude )
			          + Math.sin( latitude ) * Math.sin( pLat ) ) );
			if(distance < 5) {
				postmapList.add(post);
			}
		}
		
		return postmapList;
	}
	
	@Override
	public List<Postmap> selectExceptTop(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectExceptTop : ",map);
		List<Postmap> selectAll = session.selectList(ns+ "selectAll", map);
		List<Postmap> selectTop = session.selectList(ns+ "selectTop", map);
		
		for(int i=0; i<selectTop.size(); i++) {
			selectAll.remove(selectTop.get(i));
		}
		
		List<Postmap> postmapList = new ArrayList<>();
		
		double latitude = Math.toRadians((double) map.get("latitude"));
		double longitude = Math.toRadians((double) map.get("longitude"));
		for(Postmap post : selectAll) {
			double pLat = Math.toRadians(post.getLatitude());
			double pLng = Math.toRadians(post.getLongitude());
			double distance = ( 6371 * Math.acos( Math.cos( latitude ) * Math.cos( pLat )
			          * Math.cos( pLng - longitude )
			          + Math.sin( latitude ) * Math.sin( pLat ) ) );
			if(distance < 5) {
				postmapList.add(post);
			}
		}
		
		return postmapList;
	}
	
	@Override
	public List<Postmap> selectTop(HashMap<String, Object> map) {
		log.trace("PostmapRepository - selectTop : ", map);
		return session.selectList(ns+ "selectTop",map);
	}

	@Override
	public Postmap selectOne(int pmId) {
		log.trace("PostmapRepository - selectOne : ",pmId);
		return session.selectOne(ns+ "selectOne",pmId);
	}

	@Override
	public int insertPostmap(Postmap postmap) {
		log.trace("PostmapRepository - insertPostmap : ",postmap);
		return session.insert(ns+ "insertPostmap",postmap);
	}

	@Override
	@Transactional
	public int deletePostmap(int pmId) {
		log.trace("PostmapRepository - deletePostmap : ",pmId);
		return session.delete(ns+ "deletePostmap",pmId);
	}

	@Override
	@Transactional
	public int checkDuration(String today) {
		log.trace("PostmapRepository - checkDuration : ",today);
		return session.delete(ns+ "checkDuration", today);
	}

	@Override
	public int insertPostmapLike(Postmaplike postmaplike) {
		log.trace("PostmapRepository - insertPostmapLike : ",postmaplike);
		return session.insert(ns+ "insertPostmapLike", postmaplike);
	}

	@Override
	public int deletePostmapLike(int pmLikeId) {
		log.trace("PostmapRepository - deletePostmapLike : ",pmLikeId);
		return session.delete(ns+ "deletePostmapLike",pmLikeId);
	}

	@Override
	public int selectPostmapLike(int pmId) {
		log.trace("PostmapRepository - selectPostmapLike : ",pmId);
		return session.selectOne(ns + "selectPostmapLike",pmId);
	}

	@Override
	public int checkLikeDuplicate(Postmaplike postmaplike) {
		return session.delete(ns+"checkLikeDuplicate",postmaplike);
	}

	@Override
	public Postmaplike selectLikeOne(Postmaplike postmaplike) {
		return session.selectOne(ns + "selectLikeOne",postmaplike);
	}
}
