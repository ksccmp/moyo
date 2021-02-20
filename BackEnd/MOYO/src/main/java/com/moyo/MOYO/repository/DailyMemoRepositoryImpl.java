package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.DailyMemo;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class DailyMemoRepositoryImpl implements DailyMemoRepository {
	
	private String ns = "moyo.dailymemomapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<DailyMemo> selectAll() {
		log.trace("DailyMemoRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
	
	@Override
	public List<DailyMemo> selectAllByUser(int uId) {
		log.trace("DailyMemoRepository - selectAllByUser");
		return session.selectList(ns + "selectAllByUser", uId);
	}
	
	@Override
	public DailyMemo selectOne(int dMemoId) {
		log.trace("DailyMemoRepository - selectOne");
		return session.selectOne(ns + "selectOne", dMemoId);
	}
	
	@Override
	public int create(DailyMemo dailyMemo) {
		log.trace("DailyMemoRepository - create");
		return session.insert(ns + "createDailyMemo", dailyMemo);
	}
	
	@Override
	public int delete(Map<String, Integer> param) {
		log.trace("DailyMemoRepository - delete");
		return session.delete(ns + "deleteDailyMemo", param);
	}
	
	@Override
	public int update(DailyMemo dailyMemo) {
		log.trace("DailyMemoRepository - update");
		return session.update(ns + "updateDailyMemo", dailyMemo);
	}

}
