package com.moyo.MOYO.repository;

import java.util.List;
import java.util.Map;

import com.moyo.MOYO.dto.DailyAccompany;

public interface DailyAccompanyRepository {
	public List<DailyAccompany> selectAll();
	
	public List<DailyAccompany> selectAllByUser(int uId);
	
	public List<DailyAccompany> selectAllByOneDay(Map<String, Object> param);
	
	public DailyAccompany selectOne(int dAcId);
	
	public int create(DailyAccompany dailyAccompany);
	
	public int delete(Map<String, Integer> param);
	
	public int update(DailyAccompany dailyAccompany);

}
