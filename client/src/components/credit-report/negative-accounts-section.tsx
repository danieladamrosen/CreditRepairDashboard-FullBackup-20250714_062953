import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { ThickCheckIcon } from '@/components/ui/thick-check-icon';
import { AccountRow } from './account-row';
import { cn } from '@/lib/utils';

interface NegativeAccountsSectionProps {
  negativeAccounts: any[];
  aiViolations: { [accountId: string]: string[] };
  disputeReasons: any;
  disputeInstructions: any;
  onDisputeSaved: (accountId: string, disputeData: any) => void;
  onDisputeReset: (accountId: string) => void;
  aiScanCompleted: boolean;
  savedDisputes: {
    [accountId: string]: boolean | { reason: string; instruction: string; violations?: string[] };
  };
  showNegativeAccounts: boolean;
  setShowNegativeAccounts: (show: boolean) => void;
  expandAll: boolean;
  setExpandAll: (expand: boolean) => void;
  onExpand?: () => void;
}

export function NegativeAccountsSection({
  negativeAccounts,
  aiViolations,
  disputeReasons,
  disputeInstructions,
  onDisputeSaved,
  onDisputeReset,
  aiScanCompleted,
  savedDisputes,
  showNegativeAccounts,
  setShowNegativeAccounts,
  expandAll,
  setExpandAll,
  onExpand,
}: NegativeAccountsSectionProps) {
  const [negativeAccountsCollapsed, setNegativeAccountsCollapsed] = useState(true);
  const [showAllDetails, setShowAllDetails] = useState(false);

  // Compute summary text for saved disputes
  const totalSavedDisputes = negativeAccounts.filter((account: any) => {
    const accountId =
      account['@CreditLiabilityID'] || account['@_AccountNumber'] || account['@_AccountIdentifier'];
    return savedDisputes[accountId];
  }).length;
  const summaryText = `You've saved disputes for ${totalSavedDisputes} negative account(s) across TransUnion, Equifax, and Experian.`;

  // Check if all negative accounts have saved disputes
  const allNegativeAccountsSaved =
    negativeAccounts.length > 0 &&
    negativeAccounts.every((account: any) => {
      const accountId =
        account['@CreditLiabilityID'] ||
        account['@_AccountNumber'] ||
        account['@_AccountIdentifier'];
      return savedDisputes[accountId];
    });

  // Handle toggle for both states
  const handleToggle = () => {
    if (negativeAccountsCollapsed) {
      setNegativeAccountsCollapsed(false);
      setShowNegativeAccounts(true);
      // Trigger expand scroll when expanding
      if (onExpand) {
        onExpand();
      }
    } else {
      setNegativeAccountsCollapsed(true);
      setShowNegativeAccounts(false);
    }
  };

  return (
    <div data-section="negative-accounts">
      {negativeAccountsCollapsed ? (
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg ${
            allNegativeAccountsSaved
              ? 'bg-green-50 border border-green-500'
              : 'border-2 border-red-500 bg-rose-50'
          }`}
          onClick={() => {
            console.log("Negative Accounts header clicked — scrolling to negative-accounts");
            
            // Smooth scroll to Negative Accounts section
            const negativeAccountsSection = document.querySelector('[data-section="negative-accounts"]') as HTMLElement;
            if (negativeAccountsSection) {
              const elementTop = negativeAccountsSection.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementTop - 20;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            } else {
              console.warn("Negative Accounts section with data-section='negative-accounts' not found");
            }
            
            // Then handle toggle
            handleToggle();
          }}
        >
          <CardHeader
            className={
              allNegativeAccountsSaved
                ? 'cursor-pointer flex flex-row items-center p-6 bg-green-50 hover:bg-green-100 transition-colors duration-200'
                : 'cursor-pointer flex flex-row items-center p-6 bg-rose-50 hover:bg-red-100 transition-colors duration-200'
            }
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ${
                    allNegativeAccountsSaved ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {allNegativeAccountsSaved ? (
                    <ThickCheckIcon className="w-4 h-4" />
                  ) : (
                    negativeAccounts.length
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h3
                    className={`text-lg font-bold ${
                      allNegativeAccountsSaved ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {allNegativeAccountsSaved
                      ? 'Negative Accounts – Disputes Saved'
                      : 'Negative Accounts'}
                  </h3>
                  <p
                    className={`text-sm flex items-center gap-1 ${
                      allNegativeAccountsSaved ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {allNegativeAccountsSaved ? (
                      <span>{summaryText}</span>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        {negativeAccounts.length} negative accounts need dispute review
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm ${allNegativeAccountsSaved ? 'text-green-700' : 'text-red-700'}`}
                >
                  {negativeAccounts.length} accounts
                </span>
                <ChevronDown
                  className={`h-5 w-5 ${allNegativeAccountsSaved ? 'text-green-700' : 'text-red-700'}`}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <Card
          className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-gray-300 bg-white shadow-sm"
        >
          <CardHeader
            onClick={() => {
              console.log("Negative Accounts header clicked — scrolling to negative-accounts");
              
              // Smooth scroll to Negative Accounts section
              const negativeAccountsSection = document.querySelector('[data-section="negative-accounts"]') as HTMLElement;
              if (negativeAccountsSection) {
                const elementTop = negativeAccountsSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementTop - 20;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              } else {
                console.warn("Negative Accounts section with data-section='negative-accounts' not found");
              }
              
              // Then handle toggle
              handleToggle();
            }}
            className="flex flex-row items-center justify-between px-6 pt-2 pb-2 min-h-[92px] cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ${allNegativeAccountsSaved ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {allNegativeAccountsSaved ? (
                  <ThickCheckIcon className="w-4 h-4" />
                ) : (
                  negativeAccounts.length
                )}
              </div>
              <div>
                <h3
                  className={`text-lg font-bold m-0 ${allNegativeAccountsSaved ? 'text-green-700' : 'text-red-700'}`}
                >
                  {allNegativeAccountsSaved
                    ? 'Negative Accounts – Disputes Saved'
                    : 'Negative Accounts'}
                </h3>
                <p
                  className={`flex flex-row items-center gap-2 text-sm m-0 ${allNegativeAccountsSaved ? 'text-green-600' : 'text-red-600'}`}
                >
                  {allNegativeAccountsSaved ? (
                    <span>{summaryText}</span>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" /> {negativeAccounts.length} negative
                      accounts need dispute review
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span
                className={`text-sm ${allNegativeAccountsSaved ? 'text-green-600' : 'text-red-600'}`}
              >
                {negativeAccounts.length} accounts
              </span>
              <ChevronUp
                className={`h-5 w-5 ${allNegativeAccountsSaved ? 'text-green-600' : 'text-red-600'}`}
              />
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-2 pb-6 flex flex-col gap-6 bg-white">
            {showNegativeAccounts &&
              negativeAccounts.map((account: any, index: number) => {
                const accountId =
                  account['@CreditLiabilityID'] ||
                  account['@_AccountNumber'] ||
                  account['@_AccountIdentifier'];
                return (
                  <AccountRow
                    key={`negative-${accountId || index}`}
                    account={account}
                    aiViolations={aiViolations[account['@CreditLiabilityID']] || []}
                    disputeReasons={disputeReasons}
                    disputeInstructions={disputeInstructions}
                    onDisputeSaved={onDisputeSaved}
                    onDisputeReset={onDisputeReset}
                    expandAll={expandAll}
                    showAllDetails={showAllDetails}
                    aiScanCompleted={aiScanCompleted}
                    savedDisputes={savedDisputes}
                    isFirstInConnectedSection={index === 0}
                    allNegativeAccountsSaved={negativeAccounts.every(
                      (acc: any) =>
                        savedDisputes[
                          acc['@CreditLiabilityID'] ||
                            acc['@_AccountNumber'] ||
                            acc['@_AccountIdentifier']
                        ]
                    )}
                  />
                );
              })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
