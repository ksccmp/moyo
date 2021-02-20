package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyMemo {
	private int dMemoId;
	private int uId;
	private String contents;
	private String day;
	private String registerDate;
	private String updateDate;
	private String nickname;
	
}
