package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	private int uId;
	private String nickname;
	private int age;
	private String gender;
	private String image;
	private String imageName;
	private int beforePsId;
	private int AfterPsId;
	private String socialId;
	private int provider;
	private int level;
	private String registerDate;
	private String updateDate;
}
