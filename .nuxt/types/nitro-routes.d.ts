// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/message': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/message.get').default>>>>
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/message.post').default>>>>
    }
    '/api/thread': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/thread').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}