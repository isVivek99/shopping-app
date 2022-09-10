"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapper = void 0;
class ResponseWrapper {
    constructor(response) {
        this.res = response;
    }
    handle(response, success_code, fail_code) {
        if (response.success) {
            return this.res.status(success_code).send(response);
        }
        // custom error, with status code
        if (response.status) {
            fail_code = response.status;
        }
        delete response.status;
        return this.res.status(fail_code).send(response);
    }
    created(response) {
        return this.handle(response, 201, 400);
    }
    ok(response) {
        return this.handle(response, 200, 400);
    }
    unauthorized(response) {
        return this.handle(response, 200, 401);
    }
    forbidden(response) {
        return this.handle(response, 200, 403);
    }
}
exports.ResponseWrapper = ResponseWrapper;
//# sourceMappingURL=ResponseWrapper.js.map