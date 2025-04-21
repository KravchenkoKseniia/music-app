import {ValueError} from '@sinclair/typebox/build/cjs/errors/errors';

export const schemaErrorToError = (error: ValueError | undefined): Error => {
    return Error(`Data is not valid: ${error?.path} (${error?.message})`);
};