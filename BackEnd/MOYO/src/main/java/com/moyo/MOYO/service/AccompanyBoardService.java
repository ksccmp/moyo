package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.dto.City;
import com.moyo.MOYO.dto.Filter;
import com.moyo.MOYO.dto.Nation;
import com.moyo.MOYO.dto.TravelType;

public interface AccompanyBoardService {
	public List<AccompanyBoard> selectAll(Filter filter);
	
	public AccompanyBoard selectOne(int acBoardId);
	
	public int create(AccompanyBoard accompanyBoard);
	
	public int delete(int acBoardId);
	
	public int update(AccompanyBoard accompanyBoard);
	
	public List<AccompanyBoard> selectFilter(HashMap<String, Object> filter);
	
	public List<AccompanyBoard> search(HashMap<String, Object> filter);

	public List<Nation> selectNation();

	public List<City> selectCity(int nId);

	public List<TravelType> selectTravelType();

	public List<AccompanyBoard> selectAllByUser(int uId);
	
	public int updateDeadlineToggle(HashMap<String, Object> map);
}
