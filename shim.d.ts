import type { ProtocolWithReturn } from 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    signInWithGithub: ProtocolWithReturn<undefined, { accessToken: string, refreshToken: string, expiresAt: string } | null>
  }
}
