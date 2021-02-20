package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccompanyBoard {
	private int acBoardId;
	private String title;
	private int uId;
	private int nId;
	private int cId;
	private int tTypeId;
	private String contents;
	private String startDate;
	private String endDate;
	private String wantAge;
	private String wantGender;
	private String deadlineToggle;
	private String registerDate;
	private String updateDate;
	private String nickname;
	private int age;
	private String gender;
	private String image;
	private String nation;
	private String city;
	private String type;
}
