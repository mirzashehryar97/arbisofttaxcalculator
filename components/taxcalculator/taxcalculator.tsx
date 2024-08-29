"use client"
import React, { useState, useEffect } from 'react';
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

function formatPercentage(num: number): string {
  return num.toFixed(2) + '%';
}

function calculateYearlyTax(yearlyIncome: number): number {
  if (yearlyIncome <= 600000) {
    return 0;
  } else if (yearlyIncome <= 1200000) {
    return (yearlyIncome - 600000) * 0.05;
  } else if (yearlyIncome <= 2200000) {
    return 30000 + (yearlyIncome - 1200000) * 0.15;
  } else if (yearlyIncome <= 3200000) {
    return 180000 + (yearlyIncome - 2200000) * 0.25;
  } else if (yearlyIncome <= 4100000) {
    return 430000 + (yearlyIncome - 3200000) * 0.30;
  } else {
    return 700000 + (yearlyIncome - 4100000) * 0.35;
  }
}

function calculateTax(monthlyIncome: number, monthlyFuelExpense: number): TaxInfo {
  const monthlyUtilitiesExpense = monthlyIncome * 0.15;
  const revisedMonthlyIncome = Math.max(0, monthlyIncome - monthlyFuelExpense - monthlyUtilitiesExpense);
  const actualYearlyIncome = monthlyIncome * 12;
  const revisedYearlyIncome = revisedMonthlyIncome * 12;
  const actualYearlyTax = calculateYearlyTax(actualYearlyIncome);
  const revisedYearlyTax = calculateYearlyTax(revisedYearlyIncome);
  const actualMonthlyTax = actualYearlyTax / 12;
  const revisedMonthlyTax = revisedYearlyTax / 12;
  const monthlySalaryAfterTax = monthlyIncome - actualMonthlyTax;
  const revisedMonthlySalaryAfterTax = revisedMonthlyIncome - revisedMonthlyTax;
  const totalMonthlyEarningsAfterTax = revisedMonthlySalaryAfterTax + monthlyFuelExpense + monthlyUtilitiesExpense;
  const totalYearlyExpenses = (monthlyFuelExpense * 12) + (monthlyUtilitiesExpense * 12)
  const revisedYearlyIncomeAfterTax = revisedYearlyIncome - revisedYearlyTax;
  const totalYearlyEarningsAfterTax = revisedYearlyIncomeAfterTax + totalYearlyExpenses;
  const yearlyTaxSavings = actualYearlyTax - revisedYearlyTax
  const yearlyTaxSavingsPercentage = actualYearlyTax > 0
    ? (yearlyTaxSavings / actualYearlyTax) * 100
    : 0;


  const actualProvidentFund = calculateProvidentFund(monthlyIncome);
  const revisedProvidentFund = calculateProvidentFund(revisedMonthlyIncome);

  return {
    monthlyIncome: monthlyIncome,
    monthlyFuelExpense: monthlyFuelExpense,
    monthlyUtilitiesExpense: monthlyUtilitiesExpense,
    revisedMonthlyIncome: revisedMonthlyIncome,
    revisedMonthlyTax: revisedMonthlyTax,
    actualMonthlyTax: actualMonthlyTax,
    monthlyTaxSavings: (actualYearlyTax - revisedYearlyTax) / 12,
    monthlyTaxSavingsPercentage: yearlyTaxSavingsPercentage,
    monthlySalaryAfterTax: monthlySalaryAfterTax,
    revisedMonthlySalaryAfterTax: revisedMonthlySalaryAfterTax,
    actualYearlyIncome: actualYearlyIncome,
    revisedYearlyIncome: revisedYearlyIncome,
    revisedYearlyTax: revisedYearlyTax,
    actualYearlyTax: actualYearlyTax,
    yearlyTaxSavings: actualYearlyTax - revisedYearlyTax,
    yearlyTaxSavingsPercentage: yearlyTaxSavingsPercentage,
    actualYearlyIncomeAfterTax: actualYearlyIncome - actualYearlyTax,
    revisedYearlyIncomeAfterTax: revisedYearlyIncomeAfterTax,
    totalMonthlyEarningsAfterTax: totalMonthlyEarningsAfterTax,
    totalYearlyEarningsAfterTax: totalYearlyEarningsAfterTax,
    actualProvidentFund: actualProvidentFund,
    revisedProvidentFund: revisedProvidentFund
  };
}

function formatNumber(num: number): string {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateProvidentFund(grossSalary: number): number {
  const eligibleSalary = grossSalary * 0.65;
  const providentFund = eligibleSalary * 0.08;
  return providentFund;
}

const TaxCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyFuelExpense, setMonthlyFuelExpense] = useState<string>('');
  const [taxInfo, setTaxInfo] = useState<TaxInfo>(calculateTax(0, 0));

  useEffect(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const fuelExpense = parseFloat(monthlyFuelExpense) || 0;
    setTaxInfo(calculateTax(income, fuelExpense));
  }, [monthlyIncome, monthlyFuelExpense]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Arbisoft Tax Calculator 2024-2025</h1>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Monthly Income</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={styles.input}
          placeholder="Enter monthly income"
          value={monthlyIncome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setMonthlyIncome(value);
          }}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Monthly Fuel Expense</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={styles.input}
          placeholder="Enter monthly fuel expense"
          value={monthlyFuelExpense}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setMonthlyFuelExpense(value);
          }}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Monthly Utilities Expense (15% of income)</label>
        <input
          type="text"
          className={`${styles.input} ${styles.readOnly}`}
          value={formatNumber(taxInfo.monthlyUtilitiesExpense)}
          readOnly
        />
      </div>

      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Monthly Income</span>
        <span className={styles.value}>{formatNumber(taxInfo.monthlyIncome)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Monthly Income</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedMonthlyIncome)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Monthly Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.actualMonthlyTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Monthly Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedMonthlyTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Monthly Tax Savings</span>
        <span className={styles.savingValue}>{formatNumber(taxInfo.monthlyTaxSavings)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Monthly Tax Savings Percentage</span>
        <span className={styles.savingValue}>{formatPercentage(taxInfo.monthlyTaxSavingsPercentage)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Monthly Salary After Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.monthlySalaryAfterTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Monthly Salary After Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedMonthlySalaryAfterTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>{`Total Monthly Earnings After Tax (Revised + Expenses)`}</span>
        <span className={styles.value}>{formatNumber(taxInfo.totalMonthlyEarningsAfterTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>{`Monthly Provident Fund (Based on Actual Salary)`}</span>
        <span className={styles.value}>{formatNumber(taxInfo.actualProvidentFund)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Yearly Income</span>
        <span className={styles.value}>{formatNumber(taxInfo.actualYearlyIncome)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Yearly Income</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedYearlyIncome)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Yearly Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.actualYearlyTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Yearly Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedYearlyTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Yearly Tax Savings</span>
        <span className={styles.savingValue}>{formatNumber(taxInfo.yearlyTaxSavings)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Yearly Tax Savings Percentage</span>
        <span className={styles.savingValue}>{formatPercentage(taxInfo.yearlyTaxSavingsPercentage)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Actual Yearly Income After Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.actualYearlyIncomeAfterTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>Revised Yearly Income After Tax</span>
        <span className={styles.value}>{formatNumber(taxInfo.revisedYearlyIncomeAfterTax)}</span>
      </div>
      <div className={styles.resultRow}>
        <span className={styles.label}>{`Total Yearly Earnings After Tax (Revised + Expenses)`}</span>
        <span className={styles.value}>{formatNumber(taxInfo.totalYearlyEarningsAfterTax)}</span>
      </div>

    </div>
  );
};

export default TaxCalculator;