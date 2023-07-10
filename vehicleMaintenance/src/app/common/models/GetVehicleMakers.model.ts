export interface GetVehicleMakersResponse {
    Count:          number;
    Message:        string;
    SearchCriteria: null;
    Results:        Results[];
}

export interface Results {
    Make_ID:   number;
    Make_Name: string;
}