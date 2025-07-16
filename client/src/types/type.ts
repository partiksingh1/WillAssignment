export interface TestatorDetails {
    name: string;
    sonOf: string;
    residingAt: string;
    willDate: string;
}

export interface Beneficiary {
    sn: number;
    name: string;
    relationship: string;
    panAadhar: string;
    residence: string;
    age: string;
}

export interface BankAccount {
    sn: number;
    bankName: string;
    accountNumber: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface InsurancePolicy {
    sn: number;
    nameOfPolicy: string;
    policyNumber: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface Stock {
    sn: number;
    brokerageFirm: string;
    accountNo: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface MutualFund {
    sn: number;
    mfDistributor: string;
    accountNo: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface Jewellery {
    sn: number;
    typeOfJewellery: string;
    invoiceNumber: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface Property {
    sn: number;
    nameOfProperty?: string; // Optional for house, required for land
    nameOfLand?: string; // Optional for land, required for house
    registrationNumber: string;
    typeRemark: string;
    beneficiaryName: string;
    share: string;
}

export interface Executors {
    primaryName: string;
    primarySonOf: string;
    primaryResidentOf: string;
    alternateName: string;
    alternateDaughterOf: string;
    alternateResidentOf: string;
}