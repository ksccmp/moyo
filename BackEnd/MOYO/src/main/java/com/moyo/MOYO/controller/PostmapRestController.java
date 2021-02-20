package com.moyo.MOYO.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moyo.MOYO.dto.Postmap;
import com.moyo.MOYO.dto.Postmaplike;
import com.moyo.MOYO.repository.PostmapRepository;
import com.moyo.MOYO.service.PostmapService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class PostmapRestController {
	
	@Autowired
	PostmapService pService;
	
	@GetMapping("postmap/selectAll")
	@Cacheable(value="testCache", unless = "#result.shares < 500")
	private ResponseEntity<Map<String, Object>> selectAll(@RequestParam double latitude, @RequestParam double longitude, @RequestParam int uId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("latitude", latitude);
		map.put("longitude", longitude);
		map.put("uId", uId);
		try {
			log.trace("PostmapRestController - selectAll : ", latitude,longitude,uId);
			return response(pService.selectAll(map), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectAll");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/selectTop")
	private ResponseEntity<Map<String, Object>> selectTop(@RequestParam double latitude, @RequestParam double longitude, @RequestParam int uId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("latitude", latitude);
		map.put("longitude", longitude);
		map.put("uId", uId);
		map.put("top", PostmapRepository.TOP);
		try {
			log.trace("PostmapRestController - selectTop : ", latitude,longitude,uId);
			return response(pService.selectTop(map), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectTOp");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/selectExceptTop")
	private ResponseEntity<Map<String, Object>> selectExceptTop(@RequestParam double latitude, @RequestParam double longitude, @RequestParam int uId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("latitude", latitude);
		map.put("longitude", longitude);
		map.put("uId", uId);
		map.put("top", PostmapRepository.TOP);
		try {
			log.trace("PostmapRestController - selectExceptTop : ", latitude,longitude,uId);
			return response(pService.selectExceptTop(map), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectExceptTop");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/selectOne/{pmId}")
	private ResponseEntity<Map<String, Object>> selectOne(@PathVariable int pmId) {
		try {
			log.trace("PostmapRestController - selectOne : ", pmId);
			return response(pService.selectOne(pmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectOne");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("postmap/insertPostmap")
	private ResponseEntity<Map<String, Object>> insertPostmap(@RequestBody Postmap postmap) {
		try {
			log.trace("PostmapRestController - insertPostmap : ", postmap);
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			postmap.setRegisterDate(sdf.format(new Date()));
			return response(pService.insertPostmap(postmap), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - insertPostmap");
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("postmap/deletePostmap/{pmId}")
	private ResponseEntity<Map<String, Object>> deletePostmap(@PathVariable int pmId) {
		try {
			log.trace("PostmapRestController - deletePostmap : ", pmId);
			return response(pService.deletePostmap(pmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - deletePostmap : ",pmId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/checkDuration")
	private ResponseEntity<Map<String, Object>> checkDuration(@RequestParam String today) {
		try {
			log.trace("PostmapRestController - checkDuration : ", today);
			return response(pService.checkDuration(today), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - checkDuration : ", today);
			return response(e.getMessage(), HttpStatus.CONFLICT, true);
		}
	}
	
	@PutMapping("postmap/likePostmap")
	private ResponseEntity<Map<String, Object>> likePostmap(@RequestBody Postmaplike postmaplike) {
		try {
			log.trace("PostmapRestController - likePostmap : ", postmaplike);
			if(pService.checkLikeDuplicate(postmaplike)==1) {	//유저가 이미 좋아요 눌렀으면 delete
				return response(0, HttpStatus.OK, true);
			}else {	
				return response(pService.likePostmap(postmaplike), HttpStatus.OK, true);
			}
		} catch (RuntimeException e) {
			log.error("PostmapRestController - likePostmap : ",postmaplike);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("postmap/deletePostmapLike/{pmLikeId}")
	private ResponseEntity<Map<String, Object>> deletePostmapLike(@PathVariable int pmLikeId) {
		try {
			log.trace("PostmapRestController - deletePostmapLike : ", pmLikeId);
			return response(pService.deletePostmapLike(pmLikeId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - deletePostmapLike : ",pmLikeId);
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("postmap/selectPostmapLike/{pmId}")
	private ResponseEntity<Map<String, Object>> selectPostmapLike(@PathVariable int pmId) {
		try {
			log.trace("PostmapRestController - selectPostmapLike : ", pmId);
			return response(pService.selectPostmapLike(pmId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			log.error("PostmapRestController - selectPostmapLike");
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
