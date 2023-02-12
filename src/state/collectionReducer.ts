import { Collection } from "../models/collection.model";
import { CollectionActionEnum } from "./collectionActionEnum";

export function collectionReducer(state: Collection, action) {
    
    if (action.type === CollectionActionEnum.SELECT) {
        return action.value
    }
}