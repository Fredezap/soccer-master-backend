export const isImage = (value) => {
    const imageMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/tiff',
        'image/webp',
        'image/x-icon',
        'image/heic',
        'image/avif'
    ]

    return imageMimeTypes.includes(value.mimetype)
}