import { ApiProperty } from "@nestjs/swagger";
import { ErrorDetailsDto } from "./error-details.dto";

// common/response.dto.ts
export class ResponseDto<T> {
  @ApiProperty({ description: 'Response data', required: false })
  data?: T; // 정상 응답 데이터

  @ApiProperty({ description: 'Error details, if any', required: false, type: ErrorDetailsDto })
  error?: {
    statusSubCode: number; // 에러 상태 코드
    message: string; // 에러 메시지
    details?: any; // 추가 상세 정보
  };
  
  @ApiProperty({ example: Date.now(), description: 'Server time when the response is sent' })
  serverTime: number; // 서버 시간
}
