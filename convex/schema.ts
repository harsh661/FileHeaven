import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(v.literal("image"), v.literal("pdf"), v.literal("csv"), v.literal("txt"), v.literal("zip"), v.literal("any"));

export default defineSchema({
    files: defineTable({
        name: v.string(),
        orgId: v.string(),
        fileId: v.id('_storage'),
        type: fileType
    }).index("by_orgId", ['orgId']),
    favorites: defineTable({
        fileId: v.id("files"),
        orgId: v.string()
    }).index("by_orgId_fileId", ["orgId", "fileId"])
})