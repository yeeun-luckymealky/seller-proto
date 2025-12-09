// 백엔드 엔티티 기반 타입 정의 (JSDoc 스타일)
// 백엔드: src/modules/user/entities/

/**
 * PlaceAccount (판매자 계정) - 백엔드 place-account.entity.ts 기반
 * @typedef {Object} PlaceAccount
 * @property {number} id
 * @property {string} email
 * @property {string} phoneNumber
 * @property {boolean} hasCompletedOnboarding - 온보딩 완료 여부
 * @property {number} userId
 * @property {PlaceRole[]} placeRoles
 */

/**
 * PlaceRole (직원 역할) - 백엔드 place-role.entity.ts 기반
 * @typedef {Object} PlaceRole
 * @property {number} id
 * @property {number} grade - 0: ADMIN, 1: MANAGER, 2: STAFF
 * @property {number} placeAccountId
 * @property {number} placeId
 * @property {PlaceAccount} placeAccount
 */

export {};
