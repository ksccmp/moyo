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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.Community;
import com.moyo.MOYO.service.CommunityService;
import com.moyo.MOYO.service.JwtService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class CommunityRestController {
	
	@Autowired
	CommunityService cService;
	
	@Autowired
	JwtService jwtService;
	
	@GetMapping("community/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll(@RequestParam(value="cmTypeId", defaultValue="0") int cmTypeId, @RequestParam(value="searchWord", required=false) String searchWord) {
		try {
			log.trace("CommunityRestController - selectAll");
			System.out.println(cmTypeId);
			System.out.println(searchWord);
			return response(cService.selectAll(cmTypeId, searchWord), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("community/selectAllByUser/{uId}")
	public ResponseEntity<Map<String, Object>> selectAllByUser(@PathVariable int uId) {
		try {
			log.trace("CommunityRestController - selectAllByUser");
			return response(cService.selectAllByUser(uId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("community/selectOne/{cmId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int cmId) {
		try {
			log.trace("CommunityRestController - selectOne");
			return response(cService.selectOne(cmId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("community/selectCommunityType")
	public ResponseEntity<Map<String, Object>> selectCommunityType() {
		try {
			log.trace("CommunityRestController - selectCommunityType");
			return response(cService.selectCommunityType(), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("community/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody Community community,  @RequestHeader(value="userToken") String userToken) {
		try {
			log.trace("CommunityRestController - create");
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			community.setRegisterDate(sdf.format(new Date()));
			community.setUId(jwtService.getUser(userToken).getUId());			
			return response(cService.create(community), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("community/delete/{cmId}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cmId) {
		try {
			log.trace("CommunityRestController - delete");
			return response(cService.delete(cmId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("community/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Community community, @RequestHeader(value="userToken") String userToken) {
		try {
			log.trace("CommunityRestController - update");
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			community.setUpdateDate(sdf.format(new Date()));
			community.setUId(jwtService.getUser(userToken).getUId());
			return response(cService.update(community), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}
}
