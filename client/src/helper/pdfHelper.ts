import type { BankAccount, Beneficiary, Executors, InsurancePolicy, Jewellery, MutualFund, Property, Stock, TestatorDetails } from "../types/type";

export const generateWillHTML = async (
    testatorDetails: TestatorDetails,
    bankAccounts: BankAccount[],
    beneficiaries: Beneficiary[],
    insurancePolicies: InsurancePolicy[],
    stocks: Stock[],
    mutualFunds: MutualFund[],
    jewellery: Jewellery[],
    house: Property[],
    land: Property[],
    executors: Executors
) => {
    try {
        const response = await fetch("http://localhost:3000/generate-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                testatorDetails,
                bankAccounts,
                beneficiaries,
                insurancePolicies,
                stocks,
                mutualFunds,
                jewellery,
                house,
                land,
                executors,
            }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "will.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (err) {
        console.error("Failed to generate PDF:", err);
    }
};
