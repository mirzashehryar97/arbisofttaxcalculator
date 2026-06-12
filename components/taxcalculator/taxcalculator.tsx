"use client"
import React, { useState, useEffect } from 'react';
import { calculateTaxForTotalAmount } from '@/lib/taxCalculator';
import styles from './taxcalculator.module.css';

interface TaxInfo {
  monthlyIncome: number;
  monthlyFuelExpense: number;
  monthlyUtilitiesExpense: number;
  revisedMonthlyIncome: number;
  revisedMonthlyTax: number;
  actualMonthlyTax: number;
  monthlyTaxSavings: number;
  monthlyTaxSavingsPercentage: number;
  monthlySalaryAfterTax: number;
  revisedMonthlySalaryAfterTax: number;
  actualYearlyIncome: number;
  revisedYearlyIncome: number;
  revisedYearlyTax: number;
  actualYearlyTax: number;
  yearlyTaxSavings: number;
  actualYearlyIncomeAfterTax: number;
  revisedYearlyIncomeAfterTax: number;
  totalMonthlyEarningsAfterTax: number;
  totalYearlyEarningsAfterTax: number;
  yearlyTaxSavingsPercentage: number;
  actualProvidentFund: number;
  revisedProvidentFund: number;
}

const fiscalYears = [
  { value: "2026-2027", label: "2026-2027" },
  { value: "2025-2026", label: "2025-2026" },
  { value: "2024-2025", label: "2024-2025" },
  { value: "2023-2024", label: "2023-2024" },
  { value: "2022-2023", label: "2022-2023" },
  { value: "2021-2022", label: "2021-2022" },
  { value: "2020-2021", label: "2020-2021" },
  { value: "2019-2020", label: "2019-2020" },
  { value: "2018-2019", label: "2018-2019" },
  { value: "2017-2018", label: "2017-2018" },
  { value: "2016-2017", label: "2016-2017" },
  { value: "2015-2016", label: "2015-2016" },
  { value: "2014-2015", label: "2014-2015" }
];

function formatPercentage(num: number): string {
  return num.toFixed(2) + '%';
}

function calculateTax(monthlyIncome: number, monthlyFuelExpense: number, fiscalYear: string): TaxInfo {
  const monthlyUtilitiesExpense = monthlyIncome * 0.15;
  const revisedMonthlyIncome = Math.max(0, monthlyIncome - monthlyFuelExpense - monthlyUtilitiesExpense);
  const actualYearlyIncome = monthlyIncome * 12;
  const revisedYearlyIncome = revisedMonthlyIncome * 12;

  const actualYearlyTax = calculateTaxForTotalAmount(actualYearlyIncome, fiscalYear);
  const revisedYearlyTax = calculateTaxForTotalAmount(revisedYearlyIncome, fiscalYear);

  const actualMonthlyTax = actualYearlyTax / 12;
  const revisedMonthlyTax = revisedYearlyTax / 12;
  const monthlySalaryAfterTax = monthlyIncome - actualMonthlyTax;
  const revisedMonthlySalaryAfterTax = revisedMonthlyIncome - revisedMonthlyTax;
  const totalMonthlyEarningsAfterTax = revisedMonthlySalaryAfterTax + monthlyFuelExpense + monthlyUtilitiesExpense;
  const totalYearlyExpenses = (monthlyFuelExpense * 12) + (monthlyUtilitiesExpense * 12);
  const revisedYearlyIncomeAfterTax = revisedYearlyIncome - revisedYearlyTax;
  const totalYearlyEarningsAfterTax = revisedYearlyIncomeAfterTax + totalYearlyExpenses;
  const yearlyTaxSavings = actualYearlyTax - revisedYearlyTax;
  const yearlyTaxSavingsPercentage = actualYearlyTax > 0
    ? (yearlyTaxSavings / actualYearlyTax) * 100
    : 0;

  const actualProvidentFund = calculateProvidentFund(monthlyIncome);
  const revisedProvidentFund = calculateProvidentFund(revisedMonthlyIncome);

  return {
    monthlyIncome,
    monthlyFuelExpense,
    monthlyUtilitiesExpense,
    revisedMonthlyIncome,
    revisedMonthlyTax,
    actualMonthlyTax,
    monthlyTaxSavings: (actualYearlyTax - revisedYearlyTax) / 12,
    monthlyTaxSavingsPercentage: yearlyTaxSavingsPercentage,
    monthlySalaryAfterTax,
    revisedMonthlySalaryAfterTax,
    actualYearlyIncome,
    revisedYearlyIncome,
    revisedYearlyTax,
    actualYearlyTax,
    yearlyTaxSavings,
    yearlyTaxSavingsPercentage,
    actualYearlyIncomeAfterTax: actualYearlyIncome - actualYearlyTax,
    revisedYearlyIncomeAfterTax,
    totalMonthlyEarningsAfterTax,
    totalYearlyEarningsAfterTax,
    actualProvidentFund,
    revisedProvidentFund,
  };
}

function formatNumber(num: number): string {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateProvidentFund(grossSalary: number): number {
  const eligibleSalary = grossSalary * 0.65;
  return eligibleSalary * 0.08;
}

const TaxCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyFuelExpense, setMonthlyFuelExpense] = useState<string>('');
  const [fiscalYear, setFiscalYear] = useState<string>('2025-2026');
  const [taxInfo, setTaxInfo] = useState<TaxInfo>(calculateTax(0, 0, '2025-2026'));

  useEffect(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const fuelExpense = parseFloat(monthlyFuelExpense) || 0;
    setTaxInfo(calculateTax(income, fuelExpense, fiscalYear));
  }, [monthlyIncome, monthlyFuelExpense, fiscalYear]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Arbisoft Tax Calculator</h1>
          <p className={styles.subtitle}>Fiscal Year {fiscalYear}</p>
        </div>

        {/* Input Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Input Details</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Fiscal Year</label>
              <select
                className={styles.select}
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
              >
                {fiscalYears.map((year) => (
                  <option key={year.value} value={year.value}>{year.label}</option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Monthly Income (PKR)</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.input}
                placeholder="e.g. 150,000"
                value={monthlyIncome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMonthlyIncome(e.target.value.replace(/[^0-9]/g, ''));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Monthly Fuel Expense (PKR)</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.input}
                placeholder="e.g. 20,000"
                value={monthlyFuelExpense}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMonthlyFuelExpense(e.target.value.replace(/[^0-9]/g, ''));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Monthly Utilities Expense (15%)</label>
              <input
                type="text"
                className={`${styles.input} ${styles.readOnly}`}
                value={formatNumber(taxInfo.monthlyUtilitiesExpense)}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Monthly Breakdown Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Monthly Breakdown</h2>
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <span className={styles.rowLabel}></span>
              <span className={`${styles.colHeader} ${styles.colActualHeader}`}>Actual</span>
              <span className={`${styles.colHeader} ${styles.colRevisedHeader}`}>Revised</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Income</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.monthlyIncome)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedMonthlyIncome)}</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Tax</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.actualMonthlyTax)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedMonthlyTax)}</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Salary After Tax</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.monthlySalaryAfterTax)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedMonthlySalaryAfterTax)}</span>
            </div>
          </div>
        </div>

        {/* Monthly Tax Savings Card */}
        <div className={`${styles.card} ${styles.savingsCard}`}>
          <h2 className={styles.cardTitle}>Monthly Tax Savings</h2>
          <div className={styles.savingsGrid}>
            <div className={styles.savingsStat}>
              <span className={styles.savingsLabel}>Amount Saved</span>
              <span className={styles.savingsBig}>PKR {formatNumber(taxInfo.monthlyTaxSavings)}</span>
            </div>
            <div className={styles.savingsStat}>
              <span className={styles.savingsLabel}>Percentage Saved</span>
              <span className={styles.savingsBig}>{formatPercentage(taxInfo.monthlyTaxSavingsPercentage)}</span>
            </div>
          </div>
        </div>

        {/* Monthly Take-Home Card */}
        <div className={`${styles.card} ${styles.takeHomeCard}`}>
          <h2 className={styles.cardTitle}>Monthly Take-Home</h2>
          <div className={styles.takeHomeRow}>
            <span>Total Earnings After Tax <span className={styles.tag}>Revised + Expenses</span></span>
            <span>PKR {formatNumber(taxInfo.totalMonthlyEarningsAfterTax)}</span>
          </div>
          <div className={styles.takeHomeRow}>
            <span>Provident Fund <span className={styles.tag}>Actual Salary</span></span>
            <span>− PKR {formatNumber(taxInfo.actualProvidentFund)}</span>
          </div>
          <div className={styles.takeHomeDivider} />
          <div className={`${styles.takeHomeRow} ${styles.netTakeHome}`}>
            <span>Net Take Home Salary</span>
            <span>PKR {formatNumber(taxInfo.totalMonthlyEarningsAfterTax - taxInfo.actualProvidentFund)}</span>
          </div>
        </div>

        {/* Yearly Breakdown Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Yearly Breakdown</h2>
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <span className={styles.rowLabel}></span>
              <span className={`${styles.colHeader} ${styles.colActualHeader}`}>Actual</span>
              <span className={`${styles.colHeader} ${styles.colRevisedHeader}`}>Revised</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Income</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.actualYearlyIncome)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedYearlyIncome)}</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Tax</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.actualYearlyTax)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedYearlyTax)}</span>
            </div>
            <div className={styles.comparisonRow}>
              <span className={styles.rowLabel}>Income After Tax</span>
              <span className={styles.colActual}>{formatNumber(taxInfo.actualYearlyIncomeAfterTax)}</span>
              <span className={styles.colRevised}>{formatNumber(taxInfo.revisedYearlyIncomeAfterTax)}</span>
            </div>
          </div>
        </div>

        {/* Yearly Tax Savings Card */}
        <div className={`${styles.card} ${styles.savingsCard}`}>
          <h2 className={styles.cardTitle}>Yearly Tax Savings</h2>
          <div className={styles.savingsGrid}>
            <div className={styles.savingsStat}>
              <span className={styles.savingsLabel}>Amount Saved</span>
              <span className={styles.savingsBig}>PKR {formatNumber(taxInfo.yearlyTaxSavings)}</span>
            </div>
            <div className={styles.savingsStat}>
              <span className={styles.savingsLabel}>Percentage Saved</span>
              <span className={styles.savingsBig}>{formatPercentage(taxInfo.yearlyTaxSavingsPercentage)}</span>
            </div>
          </div>
        </div>

        {/* Yearly Take-Home Card */}
        <div className={`${styles.card} ${styles.takeHomeCard}`}>
          <h2 className={styles.cardTitle}>Yearly Take-Home</h2>
          <div className={styles.takeHomeRow}>
            <span>Total Earnings After Tax <span className={styles.tag}>Revised + Expenses</span></span>
            <span>PKR {formatNumber(taxInfo.totalYearlyEarningsAfterTax)}</span>
          </div>
          <div className={styles.takeHomeRow}>
            <span>Provident Fund <span className={styles.tag}>Actual Salary</span></span>
            <span>− PKR {formatNumber(taxInfo.actualProvidentFund * 12)}</span>
          </div>
          <div className={styles.takeHomeDivider} />
          <div className={`${styles.takeHomeRow} ${styles.netTakeHome}`}>
            <span>Net Take Home Salary</span>
            <span>PKR {formatNumber(taxInfo.totalYearlyEarningsAfterTax - taxInfo.actualProvidentFund * 12)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaxCalculator;
