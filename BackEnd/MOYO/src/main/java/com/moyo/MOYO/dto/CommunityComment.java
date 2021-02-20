package com.moyo.MOYO.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityComment {
	private int cmCommentId;
	private int cmId;
	private int uId;
	private String contents;
	private String registerDate;
	private String updateDate;
	private String nickname;

}
