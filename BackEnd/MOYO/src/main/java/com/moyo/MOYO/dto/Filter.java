package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filter {
	private String searchDate;
	private int nId;
	private int cId;
	private int[] searchAge;
	private String searchGender;
	private int[] searchType;
	private String searchCondition;
	private String searchWord;
	private String searchSort;
}
