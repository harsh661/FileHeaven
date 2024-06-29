import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { fileType } from './schema';

export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
        fileId: v.id('_storage'),
        type: fileType
    },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            throw new ConvexError("You are not authorized to upload files. Please log in to your account.")
        }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId,
            fileId: args.fileId,
            type: args.type,
        })
    },
})

export const getFiles = query({
    args: {
        orgId: v.string(),
        query: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            return []
        }

        let files = await ctx.db
            .query("files")
            .withIndex('by_orgId', q => q.eq('orgId', args.orgId))
            .collect();

        if (args.query?.length) {
            const query = args.query.toLowerCase();
            files = files.filter(file =>
                Object.values(file).some(value =>
                    value.toString().toLowerCase().includes(query)
                )
            );
        }

        return files;
    }
})

export const generateUploadUrl = mutation(async (ctx) => {
    const authorized = await ctx.auth.getUserIdentity();

    if (!authorized) {
        throw new ConvexError("You are not authorized to upload files. Please log in to your account.")
    };

    return ctx.storage.generateUploadUrl();
})

export const generateFileUrl = mutation({
    args: {
        fileId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            throw new ConvexError("You are not authorized to upload files. Please log in to your account.")
        };

        const url = await ctx.storage.getUrl(args.fileId);

        return url
    }
})

export const deleteFile = mutation({
    args: { fileId: v.id("files") },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            throw new ConvexError("You are not authorized to delete files. Please log in to your account.")
        }

        const file = await ctx.db.get(args.fileId)

        if (!file) {
            throw new ConvexError("File does not exist!")
        }

        await ctx.db.delete(args.fileId)
    },
})

export const toggleFavorite = mutation({
    args: { fileId: v.id("files") },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            throw new ConvexError("You are not authorized to favorite files.")
        }

        const file = await ctx.db.get(args.fileId)

        if (!file) {
            throw new ConvexError("File does not exist!")
        }

        const favorite = await ctx.db
            .query("favorites")
            .withIndex("by_orgId_fileId", (q) =>
                q.eq('orgId', file.orgId).eq('fileId', file._id))
            .first();

        // If not marked then add file to favorite, else delete from favorite
        if (!favorite) {
            await ctx.db.insert("favorites", {
                orgId: file.orgId,
                fileId: file._id
            })
        } else {
            await ctx.db.delete(favorite._id)
        }
    },
})

export const getFavorites = query({
    args: { orgId: v.string() },
    handler: async (ctx, args) => {
        const authorized = await ctx.auth.getUserIdentity();

        if (!authorized) {
            return [];
        }

        const favorites = await ctx.db
            .query("favorites")
            .withIndex("by_orgId_fileId", (q) =>
                q.eq("orgId", args.orgId)
            ).collect()

        return favorites;
    }
})