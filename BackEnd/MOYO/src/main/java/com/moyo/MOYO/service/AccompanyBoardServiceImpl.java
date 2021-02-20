package com.moyo.MOYO.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.dto.City;
import com.moyo.MOYO.dto.Filter;
import com.moyo.MOYO.dto.Nation;
import com.moyo.MOYO.dto.TravelType;
import com.moyo.MOYO.repository.AccompanyBoardRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AccompanyBoardServiceImpl implements AccompanyBoardService {
	
	@Autowired
	AccompanyBoardRepository acRepo;
	
	@Override
	public List<AccompanyBoard> selectAll(Filter filter) {
		log.trace("AccompanyBoardService - selectAll : ",filter);
		return acRepo.selectAll(filter);
	}
	
	@Override
	public AccompanyBoard selectOne(int acBoardId) {
		log.trace("AccompanyBoardService - selectOne : ",acBoardId);
		return acRepo.selectOne(acBoardId);
	}
	
	@Override
	public int create(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardService - create : ",accompanyBoard);
		return acRepo.create(accompanyBoard);
	}
	
	@Override
	public int delete(int acBoardId) {
		log.trace("AccompanyBoardService - delete : ",acBoardId);
		return acRepo.delete(acBoardId);
	}
	
	@Override
	public int update(AccompanyBoard accompanyBoard) {
		log.trace("AccompanyBoardService - update : ",accompanyBoard);
		return acRepo.update(accompanyBoard);
	}

	@Override
	public List<AccompanyBoard> selectFilter(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardService - selectFilter : ",filter);
		return acRepo.selectFilter(filter);
	}

	@Override
	public List<AccompanyBoard> search(HashMap<String, Object> filter) {
		log.trace("AccompanyBoardService - search : ",filter);
		return acRepo.search(filter);
	}

	@Override
	public List<Nation> selectNation() {
		log.trace("AccompanyBoardService - selectNation ");
		return acRepo.selectNation();
	}

	@Override
	public List<City> selectCity(int nId) {
		log.trace("AccompanyBoardService - selectCity : ",nId);
		return acRepo.selectCity(nId);
	}

	@Override
	public List<TravelType> selectTravelType() {
		log.trace("AccompanyBoardService - selectTravelType ");
		return acRepo.selectTravelType();
	}

	@Override
	public List<AccompanyBoard> selectAllByUser(int uId) {
		log.trace("AccompanyBoardService - selectAllByUser :",uId);
		return acRepo.selectAllByUser(uId);
	}

	@Override
	public int updateDeadlineToggle(HashMap<String, Object> map) {
		log.trace("AccompanyBoardService - updateDeadlineToggle :",map);
		return acRepo.updateDeadlineToggle(map);
	}
}
