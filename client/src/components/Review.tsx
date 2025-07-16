import { useState } from "react";
import { generateWillHTML } from "../helper/pdfHelper";
import type { BankAccount, Beneficiary, Executors, InsurancePolicy, Jewellery, MutualFund, Property, Stock, TestatorDetails } from "../types/type";
interface ReviewProps {
    testatorDetails: TestatorDetails,
    beneficiaries: Beneficiary[],
    bankAccounts: BankAccount[]
    insurancePolicies: InsurancePolicy[]
    stocks: Stock[]
    mutualFunds: MutualFund[],
    jewellery: Jewellery[],
    house: Property[],
    land: Property[],
    executors: Executors

}
export const ReviewComponent: React.FC<ReviewProps> = ({ testatorDetails, beneficiaries, bankAccounts, insurancePolicies, stocks, mutualFunds, jewellery, house, land, executors }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleGenerateWill = async () => {
        try {
            setLoading(true)
            await generateWillHTML(testatorDetails, bankAccounts, beneficiaries, insurancePolicies, stocks, mutualFunds, jewellery, house, land, executors)
        } catch (error) {
            console.error("Error generating will:", error);
        } finally {
            setLoading(false)
        }
    }
    {
        loading && (
            <div className="flex justify-center items-center mt-4">
                <svg className="animate-spin h-6 w-6 text-green-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span className="text-green-700 font-medium">Generating Will Document...</span>
            </div>
        )
    }
    return (

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black my-4">Review & Generate Will</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-800">Testator Details</h3>
                <p><strong>Name:</strong> {testatorDetails.name}</p>
                <p><strong>Son/Daughter of:</strong> {testatorDetails.sonOf}</p>
                <p><strong>Residing At:</strong> {testatorDetails.residingAt}</p>
                <p><strong>Will Date:</strong> {testatorDetails.willDate}</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6">Beneficiaries</h3>
                {beneficiaries.length > 0 ? (
                    <ul className="list-disc list-inside ml-4">
                        {beneficiaries.map((b: Beneficiary, i: number) => (
                            <li key={i}>
                                {b.name} ({b.relationship}), PAN/Aadhar: {b.panAadhar}, Residence: {b.residence}, Age: {b.age}
                            </li>
                        ))}
                    </ul>
                ) : <p>No beneficiaries added.</p>}

                <h3 className="text-xl font-semibold text-gray-800 mt-6">Movable Assets (Financial)</h3>
                {bankAccounts.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">Bank Accounts:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {bankAccounts.map((ba: BankAccount, i: number) => (
                                <li key={i}>{ba.bankName}, Acc: {ba.accountNumber}, Remark: {ba.typeRemark}, Beneficiary: {ba.beneficiaryName}, Share: {ba.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {insurancePolicies.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">Insurance Policies:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {insurancePolicies.map((ip: InsurancePolicy, i: number) => (
                                <li key={i}>{ip.nameOfPolicy}, Policy No: {ip.policyNumber}, Remark: {ip.typeRemark}, Beneficiary: {ip.beneficiaryName}, Share: {ip.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {stocks.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">Stocks:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {stocks.map((s: Stock, i: number) => (
                                <li key={i}>{s.brokerageFirm}, Acc: {s.accountNo}, Remark: {s.typeRemark}, Beneficiary: {s.beneficiaryName}, Share: {s.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {mutualFunds.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">Mutual Funds:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {mutualFunds.map((mf: MutualFund, i: number) => (
                                <li key={i}>{mf.mfDistributor}, Acc: {mf.accountNo}, Remark: {mf.typeRemark}, Beneficiary: {mf.beneficiaryName}, Share: {mf.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {(bankAccounts.length === 0 && insurancePolicies.length === 0 && stocks.length === 0 && mutualFunds.length === 0) && <p>No financial assets added.</p>}


                <h3 className="text-xl font-semibold text-gray-800 mt-6">Movable Assets (Physical)</h3>
                {jewellery.length > 0 ? (
                    <>
                        <h4 className="font-medium text-gray-700">Jewellery:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {jewellery.map((j: Jewellery, i: number) => (
                                <li key={i}>{j.typeOfJewellery}, Invoice: {j.invoiceNumber}, Remark: {j.typeRemark}, Beneficiary: {j.beneficiaryName}, Share: {j.share}%</li>
                            ))}
                        </ul>
                    </>
                ) : <p>No physical assets added.</p>}

                <h3 className="text-xl font-semibold text-gray-800 mt-6">Immovable Assets</h3>
                {house.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">House Properties:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {house.map((h: Property, i: number) => (
                                <li key={i}>{h.nameOfProperty}, Reg No: {h.registrationNumber}, Remark: {h.typeRemark}, Beneficiary: {h.beneficiaryName}, Share: {h.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {land.length > 0 && (
                    <>
                        <h4 className="font-medium text-gray-700">Land Properties:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {land.map((l: Property, i: number) => (
                                <li key={i}>{l.nameOfLand}, Reg No: {l.registrationNumber}, Remark: {l.typeRemark}, Beneficiary: {l.beneficiaryName}, Share: {l.share}%</li>
                            ))}
                        </ul>
                    </>
                )}
                {(house.length === 0 && land.length === 0) && <p>No immovable assets added.</p>}

                <h3 className="text-xl font-semibold text-gray-800 mt-6">Executors</h3>
                <p><strong>Primary Executor:</strong> {executors.primaryName}, son of {executors.primarySonOf}, resident of {executors.primaryResidentOf}.</p>
                <p><strong>Alternate Executor:</strong> {executors.alternateName}, daughter of {executors.alternateDaughterOf}, resident of {executors.alternateResidentOf}.</p>
            </div>

            <button
                onClick={handleGenerateWill}
                disabled={loading}
                className={`mt-6 w-full py-3 px-6 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 
        ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"}`}
            >
                {loading ? "Processing..." : "Generate Will HTML"}
            </button>
        </div>
    )
}