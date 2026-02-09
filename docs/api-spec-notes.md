# API 스펙 차이 대응 메모

## 개요
- 현재 프로젝트는 Swagger 스펙과 `SENTINEL_PoC_API.yaml` 스펙이 일부 상이합니다.
- 클라이언트는 두 스펙을 모두 수용하도록 최소 변경으로 흡수합니다.

## 차이점 및 대응
- 기업 검색 (`GET /api/companies/search`)
`Swagger`: `keyword` 쿼리
`PoC`: `name` 또는 `code` 쿼리
`대응`: `keyword` 입력 시 `name`으로 매핑하여 PoC에도 대응

- 기업 개요 (`GET /api/companies/{companyId}/overview`)
`Swagger`: `quarterKey` 쿼리 지원
`PoC`: 미기재
`대응`: `quarterKey`를 선택적으로 허용

- AI 리포트 다운로드 (`GET /api/companies/{companyCode}/ai-report/download`)
`Swagger`: 신규 엔드포인트
`PoC`: 미기재
`대응`: 클라이언트 API 추가 및 `Blob` 다운로드 처리

- AI 분석 조회 (`GET /api/companies/{companyCode}/ai-analysis`)
`Swagger`: 신규 엔드포인트
`PoC`: 미기재
`대응`: 클라이언트 API 추가

## 주의사항
- `companyCode`와 `companyId`가 혼용될 수 있으므로, 서버 구현 시 식별자 규칙을 통일하거나 변환 규칙을 명확히 해야 합니다.
