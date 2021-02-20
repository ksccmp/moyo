package com.moyo.MOYO.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Postmap {
	private int pmId;
	private String contents;
	private double latitude;
	private double longitude;
	private int registerId;
	private String registerDate;
	
	private int likes;
	private int pmLikeId;
}
