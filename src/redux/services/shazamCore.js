import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-api7.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'a74a2af57cmshaae3dc9cb65c903p13d2dejsna70365e01559')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopChart : builder.query({
            query:(genre='POP') => 
                `/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=20`,
            transformResponse:(rawResult, meta, args) => {
                const finalResult = rawResult.data.map(song => ({
                    ...song,
                    title: song.attributes?.name
                })
            )
            return finalResult
            }}),
        getTopInTheCountry : builder.query({
            query:(genre='POP', country='US') => 
                `/charts/get-top-songs-in_country_by_genre?country_code=${country}&genre=${genre}&limit=20`,
            transformResponse:(rawResult, meta, args) => {
                const finalResult = rawResult.data.map(song => ({
                    ...song,
                    title: song.attributes?.name
                })
            )
            return finalResult
            }}),
        getSongDetails2 : builder.query({
            query : (songid) => `/songs/get_details?id=${songid}`
        }),
        getSongDetails1 : builder.query({
            query : (songid) => `/songs/get_details?id=${songid}`
        }),
        getArtistDetails : builder.query({
            query: (artistId) => `/artist/get-details?id=${artistId}`
        }),
        getArtistTopSongs : builder.query({
            query: (artistId) => `/artist/get-top-songs?id=${artistId}`
        }),
        search: builder.query({
            query : (text) => `/search?term=${text}&limit=20`,
            transformResponse:(rawResult, meta, args) => {
                const tracks = rawResult.data.tracks.hits
                tracks.forEach(song => {
                    
                    song.attributes= {
                        artwork:{
                            url: song.images.default,
                        },
                        albumName: song.subtitle,
                        composerName: song.subtitle,
                        name: song.title,
                        previews:[
                            {
                                url: song.stores[Object.keys(song.stores)[0]].actions[0].previewurl
                            }
                        ]

                    }
                })

            return rawResult.data
            } 
        })
    })
})

export const {
    useGetTopChartQuery, useGetSongDetails1Query, useGetSongDetails2Query, 
    useGetArtistDetailsQuery, useSearchQuery, useGetArtistTopSongsQuery, useGetTopInTheCountryQuery

} = shazamCoreApi;