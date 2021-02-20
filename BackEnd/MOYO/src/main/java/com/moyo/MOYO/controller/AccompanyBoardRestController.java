package com.moyo.MOYO.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.AccompanyBoard;
import com.moyo.MOYO.dto.Filter;
import com.moyo.MOYO.service.AccompanyBoardService;
import com.moyo.MOYO.service.FileService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class AccompanyBoardRestController {
	
	@Autowired
	AccompanyBoardService acService;
	
	@Autowired
	FileService fileService;
	
	@GetMapping("accompanyBoard/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll(@ModelAttribute Filter filter) {
		try {
			log.trace("AccompanyBoardRestController - selectAll : ",filter);
			return response(acService.selectAll(filter), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectAll");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectOne/{acBoardId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - selectOne : ",acBoardId);
			return response(acService.selectOne(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectOne");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("accompanyBoard/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			accompanyBoard.setRegisterDate(sdf.format(new Date()));
			log.trace("AccompanyBoardRestController - create : ",accompanyBoard);
			acService.create(accompanyBoard);
			return response(accompanyBoard.getAcBoardId(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - create");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("accompanyBoard/delete/{acBoardId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int acBoardId) {
		try {
			log.trace("AccompanyBoardRestController - delete : ", acBoardId);
			return response(acService.delete(acBoardId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - delete");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("accompanyBoard/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody AccompanyBoard accompanyBoard) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			accompanyBoard.setUpdateDate(sdf.format(new Date()));
			log.trace("AccompanyBoardRestController - update : ", accompanyBoard);
			return response(acService.update(accompanyBoard), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - update");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectNation")
	public ResponseEntity<Map<String, Object>> selectNation() {
		try {
			log.trace("AccompanyBoardRestController - selectNation ");
			return response(acService.selectNation(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectNation");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectCity/{nId}")
	public ResponseEntity<Map<String, Object>> selectCity(@PathVariable int nId) {
		try {
			log.trace("AccompanyBoardRestController - selectCity : ",nId);
			return response(acService.selectCity(nId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectCity");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectTravelType")
	public ResponseEntity<Map<String, Object>> selectTravelType() {
		try {
			log.trace("AccompanyBoardRestController - selectTravelType ");
			return response(acService.selectTravelType(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectTravelType ");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(@PathVariable int uId) {
		try {
			log.trace("AccompanyBoardRestController - selectAllByUser : ",uId);
			return response(acService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - selectAllByUser ");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("accompanyBoard/updateDeadlineToggle")
	public ResponseEntity<Map<String, Object>> updateDeadlineToggle(@RequestBody AccompanyBoard accompanyBoard) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("acBoardId", accompanyBoard.getAcBoardId());
		map.put("deadlineToggle", accompanyBoard.getDeadlineToggle());
		try {
			log.trace("AccompanyBoardRestController - updateDeadlineToggle : ", map);
			return response(acService.updateDeadlineToggle(map), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("AccompanyBoardRestController - updateDeadlineToggle");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("accompanyBoard/getPromotionImages")
	public ResponseEntity<Map<String, Object>> getPromotionImages() {
		try {
			log.trace("AccompanyBoardRestController - getPromotionImages");
			return response(fileService.getPromotionImages(), HttpStatus.OK, true);
		} catch (Exception e) {
			log.trace("AccompanyBoardRestController - getPromotionImages");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	
	public ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}

}
