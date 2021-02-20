package com.moyo.MOYO.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	public Map<String, Object> uploadImage(MultipartFile fileStream, String folderName) throws IOException, ServletException;

	public int deleteImage (String imageName) throws IOException, ServletException;
	
	public List<String> getPromotionImages() throws IOException, ServletException;
}
