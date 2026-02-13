# [공지 반영 결과] REST 엔드포인트 정규화 및 관리자 API 전환 보고

안녕하세요, 프런트엔드 팀입니다.

백엔드에서 공유해주신 **REST 엔드포인트 정규화 및 관리자 API 신규 반영 요청**에 대해  
프런트 코드 기준 반영 결과를 아래와 같이 공유드립니다.

---

## 1. 반영 원칙

- **신규 경로 우선 적용 완료**
- 기존 경로(Old)는 프런트 주요 호출부에서 제거/치환
- 응답 스키마는 기존 동일 가정(`success/data`)으로 유지

---

## 2. 엔드포인트 반영 매핑 (요청 대비 결과)

### 📌 Posts (게시글)

| 기능 | 요청 New 경로 | 프런트 반영 결과 | 상태 |
|------|----------------|------------------|------|
| 목록 조회 | `GET /api/posts?categoryName={...}` | `apiGet('/api/posts', { categoryName, ...params })` | 완료 |
| 상세 조회 | `GET /api/posts/{postId}` | `apiGet(\`/api/posts/${postId}\`)` | 완료 |
| 생성 | `POST /api/posts` + Body `categoryName` | `apiPost('/api/posts', { categoryName, title, content })` | 완료 |
| 수정 | `PATCH /api/posts/{postId}` | `apiPatch(\`/api/posts/${postId}\`, payload)` | 완료 |
| 삭제 | `DELETE /api/posts/{postId}` | `apiDelete(\`/api/posts/${postId}\`)` | 완료 |

---

### 📌 Company / Search (기업 및 검색)

| 기능 | 요청 New 경로 | 프런트 반영 결과 | 상태 |
|------|----------------|------------------|------|
| 기업 검색 | `GET /api/companies/search?query=...` | 입력값(`keyword/name/code`)을 `query`로 매핑 호출 | 완료 |
| 개요 조회 | `GET /api/companies/{companyId}` | 일반 사용자 경로를 `/{companyId}`로 전환 | 완료 |
| 워치리스트 | `GET /api/companies/me` | 일반 사용자 목록 조회를 `/api/companies/me`로 전환 | 완료 |

---

### 📌 AI / News / Reports

| 도메인 | 요청 New 경로 | 프런트 반영 결과 | 상태 |
|--------|----------------|------------------|------|
| AI Analysis | `GET .../analysis` | `.../analysis`로 전환 | 완료 |
| AI Report Request | `POST .../ai-reports/requests` | 신규 경로로 전환 | 완료 |
| AI Report Status | `GET .../ai-reports/requests/{id}` | 신규 경로로 전환 | 완료 |
| AI Report File | `GET .../ai-reports/file` | 신규 경로로 전환 | 완료 |
| News Sync | `POST .../news/sync` | 현재 프런트 사용처 없음 | 미사용 |
| News List | `GET .../news` | 현재 프런트 사용처 없음 | 미사용 |
| File URL | `GET /api/files/{id}/download-url` | 신규 경로로 전환 | 완료 |

---

## 3. [신규] 관리자(Admin) 전용 API 반영 결과

### 👥 사용자 / 기업 관리

- `GET /api/admin/users`  
  관리자 사용자 전환 목록 조회에 사용 중 (**기존 유지**)

- `GET /api/admin/companies`  
  관리자 모드 협력사 목록 조회에 사용하도록 전환 완료

- `GET /api/admin/companies/{companyId}/overview`  
  관리자 모드 협력사 개요 조회에 사용하도록 전환 완료

- `GET /api/admin/companies/{companyId}/insights`  
  관리자 모드 협력사 인사이트 조회에 사용하도록 전환 완료

### 📊 대시보드

- `GET /api/admin/dashboard/summary`  
  관리자 모드 대시보드 요약 조회에 사용하도록 전환 완료

---

## 4. 반영 파일

- `src/api/posts.ts`
- `src/api/companies.ts`
- `src/services/qna/userQnaApi.ts`

---

## 5. 확인/공유 요청 사항

- 관리자 전용 API(`admin/companies`, `admin/dashboard/summary`)에서 `userId` 쿼리 파라미터 사용 여부를 백엔드와 최종 확정 부탁드립니다.
- News Sync/List는 현재 프런트 사용처가 없어 미연동 상태이며, 기능 추가 시 즉시 신규 경로 기준으로 반영하겠습니다.

