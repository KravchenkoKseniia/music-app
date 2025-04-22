import { Static, Type } from '@sinclair/typebox'
import { convertToType } from '../convertToType'

const TrackSchema = Type.Object({
    id: Type.String(),
    title: Type.String(),
    artist: Type.String(),
    album: Type.Optional(Type.String()),
    genres: Type.Array(Type.String()),
    slug: Type.String(),
    coverImage: Type.Optional(Type.String()),
    audioFile: Type.Optional(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
})

const PaginatedTracksSchema = Type.Object({
    data: Type.Array(TrackSchema),
    meta: Type.Object({
        total: Type.Number(),
        page: Type.Number(),
        limit: Type.Number(),
        totalPages: Type.Number(),
    })
})

const GenreSchema = Type.String()
const GenresSchema = Type.Array(GenreSchema)

export type Track = Static<typeof TrackSchema>
export type PaginatedTracks = Static<typeof PaginatedTracksSchema>
export type Genre = Static<typeof GenreSchema>
export type Genres = Static<typeof GenresSchema>

export const initTrackAPI = (baseUrl: string, fetchAPI: typeof fetch) => {
    const headers = () => {
        const h = new Headers()
        h.set('Content-Type', 'application/json')
        return h
    }

    const getGenres = async (): Promise<Genres> => {
        const res = await fetchAPI(`${baseUrl}/genres`, {
            headers: headers()
        })

        if (!res.ok)
            throw new Error(`Could not fetch genres: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, GenresSchema)
    }

    const getTracks = async (params?: {
        page?: number
        limit?: number
        sort?: string
        order?: 'asc' | 'desc'
        search?: string
        genre?: string
        artist?: string
    }): Promise<PaginatedTracks> => {
        const url = new URL(`${baseUrl}/tracks`)

        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined)
                    url.searchParams.set(k, String(v))
            })
        }

        const res = await fetchAPI(url.toString(), {
            headers: headers()
        })

        if (!res.ok)
            throw new Error(`Could not fetch tracks: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, PaginatedTracksSchema)
    }


    const getTrackBySlug = async (slug: string): Promise<Track> => {
        const res = await fetchAPI(`${baseUrl}/tracks/${slug}`, {
            headers: headers(),
        })

        if (res.status === 404)
            throw new Error('Track not found')
        if (!res.ok) throw new Error(`Error: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, TrackSchema)
    }

    const createTrack = async (payload: {
        title: string
        artist: string
        album?: string
        genres: string[]
        coverImage?: string
    }): Promise<Track> => {

        const res = await fetchAPI(`${baseUrl}/tracks`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(payload),
        })

        if (res.status === 409)
            throw new Error('Track already exists')
        if (!res.ok)
            throw new Error(`Error creating track: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, TrackSchema)
    }

    const updateTrack = async (
        id: string,
        payload: {
            title?: string
            artist?: string
            album?: string
            genres?: string[]
            coverImage?: string
        }
    ): Promise<Track> => {
        const res = await fetchAPI(`${baseUrl}/tracks/${id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(payload),
        })

        if (res.status === 404)
            throw new Error('Track not found')

        if (!res.ok)
            throw new Error(`Error updating track: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, TrackSchema)
    }

    const deleteTrack = async (id: string): Promise<void> => {
        const res = await fetchAPI(`${baseUrl}/tracks/${id}`, {
            method: 'DELETE',
            headers: headers(),
        })
        if (res.status === 404)
            throw new Error('Track not found')

        if (!res.ok)
            throw new Error(`Error deleting track: ${res.statusText}`)
    }

    const deleteMultipleTracks = async (ids: string[]): Promise<{
        success: string[]
        failed: string[]
    }> => {
        const res = await fetchAPI(`${baseUrl}/tracks/delete`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ ids }),
        })

        if (!res.ok)
            throw new Error(`Batch delete failed: ${res.statusText}`)

        return res.json()
    }

    const uploadTrackFile = async (
        id: string,
        file: File
    ): Promise<Track> => {
        const form = new FormData()
        form.append('file', file)
        const res = await fetchAPI(`${baseUrl}/tracks/${id}/upload`, {
            method: 'POST',
            body: form,
        })

        if (!res.ok)
            throw new Error(`Upload failed: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, TrackSchema)
    }

    const deleteTrackFile = async (id: string): Promise<Track> => {
        const res = await fetchAPI(`${baseUrl}/tracks/${id}/file`, {
            method: 'DELETE',
            headers: headers(),
        })

        if (res.status === 404)
            throw new Error('File or track not found')

        if (!res.ok)
            throw new Error(`Error deleting file: ${res.statusText}`)

        const data = await res.json()
        return convertToType(data, TrackSchema)
    }

    return {
        getGenres,
        getTracks,
        getTrackBySlug,
        createTrack,
        updateTrack,
        deleteTrack,
        deleteMultipleTracks,
        uploadTrackFile,
        deleteTrackFile,
    }
}
