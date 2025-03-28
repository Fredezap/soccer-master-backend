import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from '../../services/tournaments/common/tournamentService.js'
import videoService from '../../services/videos/common/videoService.js'

const { INVALID_VIDEO_ID, VIDEO_NOT_FOUNDED } = errorCodes.videoErrors

const runValidateVideoExist = check('videoId', INVALID_VIDEO_ID)
    .exists().bail().isNumeric().bail()
    .custom(async(videoId, { req }) => {
        const existingVideo = await videoService.findOneById(videoId)
        if (!existingVideo) {
            throw new Error(VIDEO_NOT_FOUNDED)
        }
        req.body.video = existingVideo
    })

export default runValidateVideoExist