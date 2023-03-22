/* eslint-disable @typescript-eslint/indent */
/*
  898 - Includes
  -------
  by null (@kynefuk) #쉬움 #array

  ### 질문

  JavaScript의 `Array.includes` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, `true` 또는 `false`를 반환해야 합니다.

  예시:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHub에서 보기: https://tsch.js.org/898/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

// type ArrayToUnion<T> = T extends (infer TU)[] ? TU : never
// type Includes<T extends readonly any[], U> = T extends (infer TU)[]
//   ? [U] extends [TU]
//     ? [TU] extends [U]
//       ? true
//       : false
//     : false
//   : never
// type Include2<T extends any[]> = T extends (infer U)[] ? U : never

// type a = Includes<[1 | 2], 1>
// type c = true | 1 | 2 | 3 | 4

// type isEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
//   ? 1
//   : 2
//   ? true
//   : false

// type Includes<T extends readonly any[], U> = T extends [
//   infer Current,
//   ...infer Rest,
// ]
//   ? Equal<Current, U> extends true
//     ? true
//     : Includes<Rest, U>
//   : false
type Includes<T extends any[], U> = T extends [infer Cur, ...infer Rest]
  ? Equal<Cur, U> extends true
    ? true
    : Includes<Rest, U>
  : false

type a = [1, 2, 3, 5, 6, 7]
type b = 7
type check = Includes<a, b>

type Includes2<T extends any[], U> = T extends [infer Cur, ...infer Rest]
  ? Equal<Cur, U> extends true
    ? true
    : Includes2<Rest, U> extends true
    ? true
    : false
  : never
type ch2 = Includes2<a, b>
// type checkx = isEqual<'Esidisi', b>
// type cb = ArrayToUnion<['Kars', 'Esidisi', 'Wamuu', 'Santana']>
// type check = [ArrayToUnion<cb>] extends []
// type ca = Includes<cb, b>
// type d = ArrayToUnion<cb>
// type e = typeof b extends typeof d ? true : false
/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/898/answer/ko
  > 정답 보기: https://tsch.js.org/898/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
