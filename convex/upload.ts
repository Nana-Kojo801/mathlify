import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
    handler: async (ctx) => {
      return await ctx.storage.generateUploadUrl();
    },
  });
  
  export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
      return await ctx.storage.getUrl(args.storageId);
    },
  });

export const deleteStorageId = mutation({
  args: { id: v.id("_storage")},
  handler: async (ctx, { id }) => {
    await ctx.storage.delete(id)
  }
})