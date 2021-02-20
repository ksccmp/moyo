package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.dto.City;
import com.moyo.MOYO.dto.Filter;
import com.moyo.MOYO.dto.Nation;
import com.moyo.MOYO.dto.TravelType;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class AccompanyBoardRepositoryImpl implements AccompanyBoardRepository {
	private String ns = "moyo.accompanyboardmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<AccompanyBoard> selectAll(Filter filter) {
		log.trace("AccompanyBoardRepository - selectAll : ",filter);
		return session.selectList(ns + "selectAll", filter);
	}
	
	@Override
	public AccompanyBoard selectOne(int acBoardId) {
		log.trace("AccompanyBoardRepository - selectOne");
		return session.selectOne(ns + "selectOne",acBoardId);
	}
	
	@Override
	public int create(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardRepository - create");
		return session.insert(ns + "createAccompanyBoard", accompanyBoard);
	}
	
	@Override
	public int delete(int acBoardId) {
		log.trace("AccompanyBoardRepository - delete");
		return session.delete(ns + "deleteAccompanyBoard", acBoardId);
	}
	
	@Override
	public int update(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardRepository - update");
		return session.update(ns + "updateAccompanyBoard", accompanyBoard);
	}
	@Override
	public List<AccompanyBoard> selectFilter(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardRepository - selectFilter : ", filter);
		return session.selectList(ns + "selectFilter", filter);
	}

	@Override
	public List<AccompanyBoard> search(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardRepository - search : ", filter);
		return session.selectList(ns + "search", filter);
	}

	@Override
	public List<Nation> selectNation() {
		log.trace("AccompanyBoardRepository - selectNation ");
		return session.selectList(ns+"selectNation");
	}

	@Override
	public List<City> selectCity(int nId) {
		log.trace("AccompanyBoardRepository - selectCity : ",nId);
		return session.selectList(ns+"selectCity",nId);
	}

	@Override
	public List<TravelType> selectTravelType() {
		log.trace("AccompanyBoardRepository - selectTravelType ");
		return session.selectList(ns+"selectTravelType");
	}

	@Override
	public List<AccompanyBoard> selectAllByUser(int uId) {
		log.trace("AccompanyBoardRepository - selectAllByUser :",uId);
		return session.selectList(ns+"selectAllByUser",uId);
	}

	@Override
	public int updateDeadlineToggle(HashMap<String, Object> map) {
		log.trace("AccompanyBoardRepository - updateDeadlineToggle :",map);
		return session.update(ns+"updateDeadlineToggle",map);
	}
}
