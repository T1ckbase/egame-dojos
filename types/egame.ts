export interface MenuList {
  id: string;
  href: string;
  title: string;
  target: string;
}

// https://ap11.egame.kh.edu.tw/auth/main/?a=dojoRandom&dojoScope=all
export interface DojoRandom {
  menuList: MenuList[];
  total: number;
  perPage: number;
  pages: number;
  dojoNumList: DojoNumList[];
  dojoValue: number;
  dojoList: DojoList[];
  dojoScope: string;
  currentMenu: string;
  title: string;
  perValue: number;
}

export interface DojoNumList {
  _id: Id;
  count: number;
}

export interface Id {
  isDestroied: boolean;
  isOpen: boolean;
}

export interface DojoList {
  _id: number;
}

// https://ap11.egame.kh.edu.tw/auth/main/?a=dojoView&dojoSn=1126
export interface DojoView {
  menuList: MenuList[];
  dojoValue: number;
  isMaster: boolean;
  currentDojoComponent: string;
  notMasterMessage: string;
  currentMenu: string;
  title: string;
  /** 武館 */
  dojo: Dojo;
  perValue: number;
}

export interface Dojo {
  _id: number;
  no: number;
  /** 武館名稱 */
  dojoName: string;
  dojoType: string;
  /**武館等級 */
  level: number;
  /** 武館營運基金上限 */
  maxFund: number;
  /** 武館營運基金 */
  fund: number;
  /** 武館聲望值 */
  dojoValue: number;
  /** 是否被摧毀 */
  isDesigned: boolean;
  /** 是否公開 */
  isOpen: boolean;
  /** 挑戰成功人數 */
  winCount: number;
  /** 挑戰失敗人數 */
  loseCount: number;
  /** 積木包? */
  boxLevelId: number;
  /** 積木數量 */
  makerIdealBlockNum: number;
  /** 程式積木(積木包名稱) */
  levelName: string;
  /** 民國年 */
  y: number;
}

export interface DojoWithImage extends Dojo {
  /** Base64 encoded image */
  image: string;
}
