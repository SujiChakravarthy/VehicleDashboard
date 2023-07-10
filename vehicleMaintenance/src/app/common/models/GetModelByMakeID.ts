export interface GetByMakeIDResponse {
    Count:          number;
    Message:        string;
    SearchCriteria: string;
    Results:        Results[];
}

export interface Results {
    Make_ID:    number;
    Make_Name:  string;
    Model_ID:   number;
    Model_Name: string;
}
