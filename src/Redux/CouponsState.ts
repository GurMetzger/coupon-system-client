import CouponModel from "../Models/CouponModel";

// Coupons State
export class CouponsState {
    public coupons: CouponModel[] = [];
}

// ================================

// Coupons Action Type
export enum CouponsActionType {
    CouponDownloaded = "CouponDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

// ================================

// Coupon Action
export interface CouponAction {
    type: CouponsActionType;
    payload: any;
}

// ================================

// Coupons Action Creators
export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponsActionType.CouponDownloaded, payload: coupons };
}

export function couponsAddedAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponsUpdatedAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponsDeletedAction(id: number): CouponAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}

// ================================

// Coupons Reducer
export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponAction): CouponsState {

    const newState = {...currentState };

    switch (action.type) {
        case CouponsActionType.CouponDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.CouponAdded:
            if (newState.coupons.length !== 0) {
                newState.coupons.push(action.payload);
            }
            break;
        case CouponsActionType.CouponUpdated:
            const indexUpdate = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
            if (indexUpdate !== -1) {
                newState.coupons[indexUpdate] = action.payload;
            }
            break;
        case CouponsActionType.CouponDeleted:
            const indexDelete = newState.coupons.findIndex(coupon => coupon.id === action.payload);
            if (indexDelete !== -1) {
                newState.coupons.splice(indexDelete, 1);
            }
            break;
    }

    return newState;
}
