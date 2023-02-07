export interface FestivalInitialStateType {
  status : null | string;
  festivalList : FestivalInfoType[];
  filteredFestival : FestivalInfoType[];
  optionFestival : string[];
  currentFilter : string;
}

export interface FestivalInfoType {
  ADDR1 : string;
  ADDR2 : string;
  CNTCT_TEL : string;
  GUGUN_NM : string;
  HOMEPAGE_URL : string;
  ITEMCNTNTS : string;
  LAT : number;
  LNG : number;
  MAIN_IMG_NORMAL : string;
  MAIN_IMG_THUMB : string;
  MAIN_PLACE : string;
  MAIN_TITLE : string;
  MIDDLE_SIZE_RM1 : string;
  PLACE : string;
  SUBTITLE : string;
  TITLE : string;
  TRFC_INFO : string;
  UC_SEQ : number;
  USAGE_AMOUNT : string;
  USAGE_DAY : string;
  USAGE_DAY_WEEK_AND_TIME : string;
}

export interface FestivalInitialStateType {
  status : null | string;
  festivalList : FestivalInfoType[];
  filteredFestival : FestivalInfoType[];
  optionFestival : string[];
  currentFilter : string;
}