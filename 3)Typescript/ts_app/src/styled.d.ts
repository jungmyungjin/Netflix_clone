// import original module declarations
import "styled-components";

// 기존 Styled-components에 내가 정의한 테마를 추가하여 정의한다.
// 약간 인터페이스 느낌
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
