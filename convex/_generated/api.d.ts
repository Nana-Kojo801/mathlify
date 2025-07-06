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
import type * as models_competitions_helpers from "../models/competitions/helpers.js";
import type * as models_competitions_table from "../models/competitions/table.js";
import type * as models_friendMessages_helpers from "../models/friendMessages/helpers.js";
import type * as models_friendMessages_table from "../models/friendMessages/table.js";
import type * as models_friendRequests_helpers from "../models/friendRequests/helpers.js";
import type * as models_friendRequests_table from "../models/friendRequests/table.js";
import type * as models_presets_helpers from "../models/presets/helpers.js";
import type * as models_presets_table from "../models/presets/table.js";
import type * as models_users_helpers from "../models/users/helpers.js";
import type * as models_users_table from "../models/users/table.js";
import type * as presets from "../presets.js";
import type * as serverTime from "../serverTime.js";
import type * as shared_types from "../shared/types.js";
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
  "models/competitions/helpers": typeof models_competitions_helpers;
  "models/competitions/table": typeof models_competitions_table;
  "models/friendMessages/helpers": typeof models_friendMessages_helpers;
  "models/friendMessages/table": typeof models_friendMessages_table;
  "models/friendRequests/helpers": typeof models_friendRequests_helpers;
  "models/friendRequests/table": typeof models_friendRequests_table;
  "models/presets/helpers": typeof models_presets_helpers;
  "models/presets/table": typeof models_presets_table;
  "models/users/helpers": typeof models_users_helpers;
  "models/users/table": typeof models_users_table;
  presets: typeof presets;
  serverTime: typeof serverTime;
  "shared/types": typeof shared_types;
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
