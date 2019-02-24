import { UserError } from './applicationError';

export class UnPremittedUserError extends UserError {
    constructor(message?: string) {
        super(message || 'User is not permitted to perform this action', 403);
    }
}

export class VideoNotFoundError extends UserError {
    constructor(message?: string) {
        super(message || 'Video not found', 404);
    }
}
