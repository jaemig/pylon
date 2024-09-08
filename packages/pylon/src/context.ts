import {Context as HonoContext} from 'hono'
import type {Toucan} from 'toucan-js'
import {AuthState} from './auth'
import {AsyncLocalStorage} from 'async_hooks'

export type Env = {
  Bindings: {
    NODE_ENV: string
    AUTH_PROJECT_ID?: string
    AUTH_KEY?: string
    AUTH_ISSUER?: string
  }
  Variables: {
    auth: AuthState
    sentry: Toucan
  }
}

export type Context = HonoContext<Env, string, {}>

export const asyncContext = new AsyncLocalStorage<Context>()

export const getContext = () => {
  const ctx = asyncContext.getStore()

  if (!ctx) {
    throw new Error('Context not defined')
  }

  return ctx
}

export const setContext = (context: Context) => {
  return asyncContext.enterWith(context)
}
