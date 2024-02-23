import {action} from "../../../../react-vault";

export const createKey = action(({ slice, payload }: any) => {
    slice.ids.push(payload.publicKey);
    slice.records[payload.publicKey] = payload;
});