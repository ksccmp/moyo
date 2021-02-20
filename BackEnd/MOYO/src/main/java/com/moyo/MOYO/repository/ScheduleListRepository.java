package com.moyo.MOYO.repository;

import java.util.List;
import java.util.Map;

import com.moyo.MOYO.dto.ScheduleList;

public interface ScheduleListRepository {
	public List<ScheduleList> selectAll();
	
	public List<ScheduleList> selectAllByUser(int uId);
	
	public List<ScheduleList> selectAllByOneDay(Map<String, Object> param);
	
	public ScheduleList selectOne(int sListId);
	
	public int create(ScheduleList scheduleList);
	
	public int delete(Map<String, Integer> param);
	
	public int update(ScheduleList scheduleList);
	
}
