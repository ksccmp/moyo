package com.moyo.MOYO.service;

import java.sql.Date;
import java.util.List;

import com.moyo.MOYO.dto.ScheduleList;

public interface ScheduleListService {
	public List<ScheduleList> selectAll();
	
	public List<ScheduleList> selectAllByUser(int uId);
	
	public List<ScheduleList> selectAllByOneDay(int uId, String day);
	
	public ScheduleList selectOne(int sListId);
	
	public int create(ScheduleList scheduleList);
	
	public int delete(int sListId, int uId);
	
	public int update(ScheduleList scheduleList);

}
