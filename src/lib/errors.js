export class AuthenticationError extends Error {
    constructor(message) {
        super(message ?? 'An authentication error occured');
        this.name = AuthenticationError.name;
    }
}
