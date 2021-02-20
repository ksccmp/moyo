package com.moyo.MOYO.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class DMRestController {
	
	@Autowired
	UserService uService;
	
	@GetMapping("/DM/getUser")
	public ResponseEntity<Map<String, Object>> getUser(@RequestParam int uid) {
		try {
			log.trace("DMRestController - getUser");
			return response(uService.selectOne(uid), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/DM/getTime")
	public ResponseEntity<Map<String, Object>> getTime() {
		try {
			log.trace("DMRestController - getTime");
			return response(new Date(), HttpStatus.OK, true);
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
