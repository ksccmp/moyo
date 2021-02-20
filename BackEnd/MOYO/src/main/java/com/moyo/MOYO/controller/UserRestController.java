package com.moyo.MOYO.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import javax.servlet.ServletException;

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
import org.springframework.web.multipart.MultipartFile;

import com.moyo.MOYO.dto.User;
import com.moyo.MOYO.service.FileService;
import com.moyo.MOYO.service.JwtService;
import com.moyo.MOYO.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class UserRestController {
	
	@Autowired
	UserService uService;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	FileService fileService;
	
	@GetMapping("user/selectAll")
	public ResponseEntity<Map<String, Object>> selectAll() {
		try {
			log.trace("UserRestController - selectAll");
			return response(uService.selectAll(), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("user/selectOne/{uId}")
	public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int uId) {
		try {
			log.trace("UserRestController - selectOne");
			return response(uService.selectOne(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("user/selectOneBySocialId")
	public ResponseEntity<Map<String, Object>> selectOneBySocialId(@RequestParam("socialId") String socialId, @RequestParam("provider") int provider) {
		try {
			log.trace("UserRestController - selectOneBySocialId");
			return response(uService.selectOneBySocialId(socialId, provider), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("user/selectOneByNickname/{nickname}")
	public ResponseEntity<Map<String, Object>> selectOneByNickname(@PathVariable String nickname) {
		try {
			log.trace("UserRestController - selectOneByNickname");
			return response(uService.selectOneByNickname(nickname), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
		try {
			log.trace("UserRestController - register");
			String token = null;
			User registeredUser = uService.selectOneBySocialId(user.getSocialId(), user.getProvider());
			User nicknameUser = uService.selectOneByNickname(user.getNickname());
			if (registeredUser != null) {
				return response("이미 존재하는 회원입니다.", HttpStatus.OK, false);
			}
			if (nicknameUser != null) {
				return response("이미 존재하는 닉네임입니다.", HttpStatus.OK, false);
			}
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			user.setRegisterDate(sdf.format(new Date()));
			uService.register(user);
			User loginUser = uService.selectOneBySocialId(user.getSocialId(), user.getProvider());
			if (loginUser != null) {
				token = jwtService.createLoginToken(loginUser);
			}
			return response(token, HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@DeleteMapping("user/delete")
	public ResponseEntity<Map<String, Object>> delete(@RequestParam("uId") int uId) {
		try {
			log.trace("UserRestController - delete");
			return response(uService.delete(uId), HttpStatus.OK, true);
		} catch (RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PutMapping("user/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user, @RequestHeader(value="userToken") String userToken) throws ServletException {
		try {
			log.trace("UserRestController - update");
			User originUser = jwtService.getUser(userToken);
			if (!originUser.getNickname().equals(user.getNickname())) {
				User nicknameUser = uService.selectOneByNickname(user.getNickname());
				if (nicknameUser != null) {
					return response("이미 존재하는 닉네임입니다.", HttpStatus.OK, false);
				}
			}
			String token = null;
			int uId = originUser.getUId();
			String originImageName = originUser.getImageName();
			String newImageName = user.getImageName();
			if (originImageName != null && !originImageName.equals(newImageName)) {
				fileService.deleteImage(originImageName);
			}
			user.setUId(uId);
			SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
			user.setUpdateDate(sdf.format(new Date()));
			uService.update(user);
			User loginUser = uService.selectOne(uId);
			if (loginUser != null) {
				token = jwtService.createLoginToken(loginUser);
			}
			return response(token, HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/postImage")
	public ResponseEntity<Map<String, Object>> postImage(@RequestParam(value="imageName", required=false) String imageName, @RequestParam("file") MultipartFile[] file, @RequestHeader(value="userToken", required=false) String userToken) {
		try {
			log.trace("UserRestController - postImage");
			Map<String, Object> responseImage = fileService.uploadImage(file[0], "profile");
			if (!userToken.isEmpty()) {
				User originUser = jwtService.getUser(userToken);
				responseImage.put("uId", originUser.getUId());
				String originImageName = originUser.getImageName();
				if (imageName != null && originImageName != imageName) {
					fileService.deleteImage(imageName);
				}
			} else if (imageName != null) {
				fileService.deleteImage(imageName);
			}
			return response(responseImage, HttpStatus.OK, true);
		} catch (Exception e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@PostMapping("user/issueToken")
	public ResponseEntity<Map<String, Object>> issueToken(@RequestBody User user) {
		try {
			String token = null;
			User loginUser = uService.selectOneBySocialId(user.getSocialId(), user.getProvider());
			if (loginUser != null) {
				token = jwtService.createLoginToken(loginUser);
				return response(token, HttpStatus.OK, true);
			} else {
				return response(token, HttpStatus.OK, false);
			}
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
