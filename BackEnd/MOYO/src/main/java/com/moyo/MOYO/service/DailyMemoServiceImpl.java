package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moyo.MOYO.dto.DailyMemo;
import com.moyo.MOYO.repository.DailyMemoRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DailyMemoServiceImpl implements DailyMemoService {
	
	@Autowired
	DailyMemoRepository dMemoRepo;
	
	@Override
	public List<DailyMemo> selectAll() {
		log.trace("DailyMemoService - selectAll");
		return dMemoRepo.selectAll();
	}
	
	@Override
	public List<DailyMemo> selectAllByUser(int uId) {
		log.trace("DailyMemoService - selectAllByUser");
		return dMemoRepo.selectAllByUser(uId);
	}
	
	@Override
	public DailyMemo selectOne(int dMemoId) {
		log.trace("DailyMemoService - selectOne");
		return dMemoRepo.selectOne(dMemoId);
	}
	
	@Override
	@Transactional
	public int create(DailyMemo dailyMemo) {
		log.trace("DailyMemoService - create");
		return dMemoRepo.create(dailyMemo);
	}
	
	@Override
	@Transactional
	public int delete(int dMemoId, int uId) {
		log.trace("DailyMemoService - delete");
		Map<String, Integer> param = new HashMap<String, Integer>();
    	param.put("dMemoId", dMemoId);
    	param.put("uId", uId);
		return dMemoRepo.delete(param);
	}
	
	@Override
	@Transactional
	public int update(DailyMemo dailyMemo) {
		log.trace("DailyMemoService - update");
		return dMemoRepo.update(dailyMemo);
	}

}
