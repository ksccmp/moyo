package com.moyo.MOYO.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.moyo.MOYO.dto.ScheduleList;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class ScheduleListRepositoryImpl implements ScheduleListRepository {
	private String ns = "moyo.schedulelistmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public List<ScheduleList> selectAll() {
		log.trace("ScheduleListRepository - selectAll");
		return session.selectList(ns + "selectAll");
	}
	
	@Override
	public List<ScheduleList> selectAllByUser(int uId) {
		log.trace("ScheduleListRepository - selectAllByUser");
		return session.selectList(ns + "selectAllByUser", uId);
	}
	
	@Override
	public List<ScheduleList> selectAllByOneDay(Map<String, Object> param) {
		log.trace("ScheduleListRepository - selectAllByOneDay");
		return session.selectList(ns + "selectAllByOneDay", param);
	}
	
	@Override
	public ScheduleList selectOne(int sListId) {
		log.trace("ScheduleListRepository - selectOne");
		return session.selectOne(ns + "selectOne", sListId);
	}
	
	@Override
	public int create(ScheduleList scheduleList) {
		log.trace("ScheduleListRepository - create");
		return session.insert(ns + "createScheduleList", scheduleList);
	}
	
	@Override
	public int delete(Map<String, Integer> param) {
		log.trace("ScheduleListRepository - delete");
		return session.insert(ns + "deleteScheduleList", param);
	}
	
	@Override
	public int update(ScheduleList scheduleList) {
		log.trace("ScheduleListRepository - update");
		return session.update(ns + "updateScheduleList", scheduleList);
	}

}
