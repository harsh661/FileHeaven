import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            throw new ConvexError("You are not authorized to upload files. Please log in to your account.")
        }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId,
        })
    },
})

export const getFiles = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            return []
        }

        return ctx.db
            .query("files")
            .withIndex('by_orgId', q => q.eq('orgId', args.orgId))
            .collect();
    }
})