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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.CommunityComment;
import com.moyo.MOYO.service.CommunityCommentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class CommunityCommentRestController {
	
	@Autowired
	CommunityCommentService cCommentService;
	
	@GetMapping("/communityComment/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("CommunityCommentRestController - selectAll");
			return response(cCommentService.selectAll(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/communityComment/selectAllByCommunity/{cmId}")
	public ResponseEntity<Map<String, Object>> selectAllByCommunity(@PathVariable int cmId) {
		try {
			log.trace("CommunityCommentRestController - selectAllByCommunity");
			return response(cCommentService.selectAllByCommunity(cmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("/communityComment/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody CommunityComment communityComment) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			communityComment.setRegisterDate(sdf.format(new Date()));
			log.trace("CommunityCommentRestController - create");
			return response(cCommentService.create(communityComment), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("/communityComment/delete/{cmCommentId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cmCommentId) {
		try {
			log.trace("CommunityCommentRestController - delete");
			return response(cCommentService.delete(cmCommentId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("/communityComment/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody CommunityComment communityComment) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			communityComment.setUpdateDate(sdf.format(new Date()));
			log.trace("CommunityCommentRestController - update");
			return response(cCommentService.update(communityComment), HttpStatus.OK, true);
		} catch (RuntimeException e) {
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
