/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as competitions from "../competitions.js";
import type * as crons from "../crons.js";
import type * as friendMessages from "../friendMessages.js";
import type * as friendRequests from "../friendRequests.js";
import type * as matchmaking from "../matchmaking.js";
import type * as presets from "../presets.js";
import type * as queue from "../queue.js";
import type * as serverTime from "../serverTime.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  competitions: typeof competitions;
  crons: typeof crons;
  friendMessages: typeof friendMessages;
  friendRequests: typeof friendRequests;
  matchmaking: typeof matchmaking;
  presets: typeof presets;
  queue: typeof queue;
  serverTime: typeof serverTime;
  upload: typeof upload;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
