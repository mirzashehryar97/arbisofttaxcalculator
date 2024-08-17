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

function calculateTax(monthlyIncome: number, monthlyFuelExpense: number, monthlyUtilitiesExpense: number): TaxInfo {
  const revisedMonthlyIncome = Math.max(0, monthlyIncome - monthlyFuelExpense - monthlyUtilitiesExpense);
  const actualYearlyIncome = monthlyIncome * 12;
  const revisedYearlyIncome = revisedMonthlyIncome * 12;
  const actualYearlyTax = calculateYearlyTax(actualYearlyIncome);
  const revisedYearlyTax = calculateYearlyTax(revisedYearlyIncome);
  const revisedMonthlySalaryAfterTax = revisedMonthlyIncome - (revisedYearlyTax / 12)
  const totalMonthlyEarningsAfterTax = revisedMonthlySalaryAfterTax + monthlyFuelExpense + monthlyUtilitiesExpense;
  const totalYearlyExpenses = (monthlyFuelExpense * 12) + (monthlyUtilitiesExpense * 12)
  const revisedYearlyIncomeAfterTax = revisedYearlyIncome - revisedYearlyTax;
  const totalYearlyEarningsAfterTax = revisedYearlyIncomeAfterTax + totalYearlyExpenses;
  
  return {
    monthlyIncome: monthlyIncome,
    monthlyFuelExpense: monthlyFuelExpense,
    monthlyUtilitiesExpense: monthlyUtilitiesExpense,
    revisedMonthlyIncome: revisedMonthlyIncome,
    revisedMonthlyTax: revisedYearlyTax / 12,
    actualMonthlyTax: actualYearlyTax / 12,
    monthlyTaxSavings: (actualYearlyTax - revisedYearlyTax) / 12,
    monthlySalaryAfterTax: monthlyIncome - (actualYearlyTax / 12),
    revisedMonthlySalaryAfterTax: revisedMonthlySalaryAfterTax,
    actualYearlyIncome: actualYearlyIncome,
    revisedYearlyIncome: revisedYearlyIncome,
    revisedYearlyTax: revisedYearlyTax,
    actualYearlyTax: actualYearlyTax,
    yearlyTaxSavings: actualYearlyTax - revisedYearlyTax,
    actualYearlyIncomeAfterTax: actualYearlyIncome - actualYearlyTax,
    revisedYearlyIncomeAfterTax: revisedYearlyIncomeAfterTax,
    totalMonthlyEarningsAfterTax: totalMonthlyEarningsAfterTax,
    totalYearlyEarningsAfterTax: totalYearlyEarningsAfterTax
  };
}

function formatNumber(num: number): string {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TaxCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyFuelExpense, setMonthlyFuelExpense] = useState<string>('');
  const [monthlyUtilitiesExpense, setMonthlyUtilitiesExpense] = useState<string>('');
  const [taxInfo, setTaxInfo] = useState<TaxInfo>(calculateTax(0, 0, 0));

  useEffect(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const fuelExpense = parseFloat(monthlyFuelExpense) || 0;
    const utilitiesExpense = parseFloat(monthlyUtilitiesExpense) || 0;
    setTaxInfo(calculateTax(income, fuelExpense, utilitiesExpense));
  }, [monthlyIncome, monthlyFuelExpense, monthlyUtilitiesExpense]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Arbisoft Tax Calculator 2024-2025</h1>
      
      <input
        type="number"
        className={styles.input}
        placeholder="Enter monthly income"
        value={monthlyIncome}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyIncome(e.target.value)}
      />
      <input
        type="number"
        className={styles.input}
        placeholder="Enter monthly fuel expense"
        value={monthlyFuelExpense}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyFuelExpense(e.target.value)}
      />
      <input
        type="number"
        className={styles.input}
        placeholder="Enter monthly utilities expense"
        value={monthlyUtilitiesExpense}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyUtilitiesExpense(e.target.value)}
      />
      
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