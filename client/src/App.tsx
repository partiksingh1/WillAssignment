import { useState } from 'react'
import './App.css'
import type { BankAccount, Beneficiary, Executors, InsurancePolicy, Jewellery, MutualFund, Property, Stock, TestatorDetails } from './types/type';
import { steps } from './types/steps';
import { TestatorDetailsComponent } from './components/TestatorDetails';
import { BeneficiariesComponent } from './components/Beneficiaries';
import { BankAccountComponent } from './components/BankAccounts';
import { PolicyComponent } from './components/Policies';
import { StockComponent } from './components/Stocks';
import { MfComponent } from './components/MutualFunds';
import { JewelleryComponent } from './components/Jewellery';
import { HouseComponent } from './components/HouseProperty';
import { LandComponet } from './components/LandProperty';
import { ExecutorsComponent } from './components/Executors';
import { ReviewComponent } from './components/Review';

function App() {
  const [testatorDetails, setTestatorDetails] = useState<TestatorDetails>({
    name: "",
    sonOf: "",
    residingAt: "",
    willDate: ""
  });
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [jewellery, setJewellery] = useState<Jewellery[]>([]);
  const [house, setHouse] = useState<Property[]>([]);
  const [land, setLand] = useState<Property[]>([]);
  const [executors, setExecutors] = useState<Executors>({
    primaryName: '',
    primarySonOf: '',
    primaryResidentOf: '',
    alternateName: '',
    alternateDaughterOf: '',
    alternateResidentOf: '',
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.min(prev - 1, steps.length - 1));
  };
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className='min-h-screen bg-gray border-2 p-4 sm:p-6 font-sans'>
      <div className='max-w-4xl mx-auto  shadow-lg rounded-lg p-6 sm:p-8'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-center text-black mb-8'>
          WILL GENERATOR
        </h1>
        <div className='mb-8'>
          <div className="flex justify-between gap-2 mb-6">
            {steps.map((step: string, index: number) => (
              <div
                key={index}
                className={`flex-1 text-center px-3 py-2 rounded-lg cursor-pointer select-none border transition-all duration-300
                    ${index === currentStep
                    ? 'bg-black text-white shadow'
                    : index < currentStep
                      ? 'bg-indigo-100 text-black border-indigo-300'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                  }`}
                onClick={() => setCurrentStep(index)}
              >
                <span className="font-semibold">{index + 1}</span>
                {index === currentStep && (
                  <span className="ml-2">{step}</span>
                )}
              </div>
            ))}
          </div>

          <div
            className="bg-black h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Testator Details */}
      {currentStep === 0 &&
        <TestatorDetailsComponent testatorDetails={testatorDetails} setTestatorDetails={setTestatorDetails} />
      }
      {/* Beneficiaries */}
      {currentStep === 1 &&
        <BeneficiariesComponent beneficiaries={beneficiaries} setBeneficiaries={setBeneficiaries} />
      }
      {/* Bank Accounts */}
      {currentStep === 2 &&
        <BankAccountComponent bankAccounts={bankAccounts} setBankAccounts={setBankAccounts} />
      }
      {/* Insurance Policies */}
      {currentStep === 3 &&
        <PolicyComponent policy={insurancePolicies} setPolicies={setInsurancePolicies} />
      }
      {/* Stocks */}
      {currentStep === 4 &&
        <StockComponent stocks={stocks} setStocks={setStocks} />
      }
      {/* Mutual Funds */}
      {currentStep === 5 &&
        <MfComponent mutualFunds={mutualFunds} setMutualFunds={setMutualFunds} />
      }
      {/* Jewellery */}
      {currentStep === 6 &&
        <JewelleryComponent jewellery={jewellery} setJewellery={setJewellery} />
      }

      {/* House Properties */}
      {currentStep === 7 &&
        <HouseComponent house={house} setHouse={setHouse} />
      }

      {/* Land Properties */}
      {currentStep === 8 &&
        <LandComponet land={land} setLand={setLand} />
      }
      {/* Executors & Guardianship */}
      {currentStep === 9 &&
        <ExecutorsComponent executors={executors} setExecutors={setExecutors} />
      }
      {/* Review & Generate Will */}
      {currentStep === 10 &&
        <ReviewComponent testatorDetails={testatorDetails} bankAccounts={bankAccounts} beneficiaries={beneficiaries} stocks={stocks} mutualFunds={mutualFunds} insurancePolicies={insurancePolicies} jewellery={jewellery} house={house} land={land} executors={executors} />
      }
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black hover:border "
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default App
