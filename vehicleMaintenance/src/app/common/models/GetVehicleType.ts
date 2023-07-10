export interface GetVehicleTypeResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: Results[];
}

export interface Results {
    VehicleTypeId: number;
    VehicleTypeName: string;
}
