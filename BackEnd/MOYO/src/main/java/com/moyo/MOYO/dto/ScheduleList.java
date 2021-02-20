package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleList {
	private int sListId;
	private int uId;
	private int nId;
	private int cId;
	private String startDate;
	private String endDate;
	private String registerDate;
	private String updateDate;
	private String nickname;
	private String nation;
	private String city;
}
