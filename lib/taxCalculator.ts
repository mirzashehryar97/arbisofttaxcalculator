interface TaxBracket {
    min: number;
    max: number | null;
    rate: number;
    fixed: number;
  }
  
  export const taxSlabs: Record<string, TaxBracket[]> = {
    "2025-2026": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 2.5, fixed: 0 },
      { min: 1200001, max: 2200000, rate: 11, fixed: 15000 },
      { min: 2200001, max: 3200000, rate: 23, fixed: 125000 },
      { min: 3200001, max: 4100000, rate: 30, fixed: 355000 },
      { min: 4100001, max: null, rate: 35, fixed: 625000 }
    ],
    "2024-2025": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 5, fixed: 0 },
      { min: 1200001, max: 2200000, rate: 15, fixed: 30000 },
      { min: 2200001, max: 3200000, rate: 25, fixed: 180000 },
      { min: 3200001, max: 4100000, rate: 30, fixed: 430000 },
      { min: 4100001, max: null, rate: 35, fixed: 700000 }
    ],
    "2023-2024": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 2.5, fixed: 0 },
      { min: 1200001, max: 2400000, rate: 12.5, fixed: 15000 },
      { min: 2400001, max: 3600000, rate: 22.5, fixed: 165000 },
      { min: 3600001, max: 6000000, rate: 27.5, fixed: 435000 },
      { min: 6000001, max: null, rate: 35, fixed: 1095000 }
    ],
    "2022-2023": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 2.5, fixed: 0 },
      { min: 1200001, max: 2400000, rate: 12.5, fixed: 15000 },
      { min: 2400001, max: 3600000, rate: 22.5, fixed: 165000 },
      { min: 3600001, max: 6000000, rate: 27.5, fixed: 435000 },
      { min: 6000001, max: 12000000, rate: 32.5, fixed: 1005000 },
      { min: 12000001, max: null, rate: 35, fixed: 2955000 }
    ],
    "2021-2022": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 5, fixed: 0 },
      { min: 1200001, max: 1800000, rate: 10, fixed: 30000 },
      { min: 1800001, max: 2500000, rate: 15, fixed: 90000 },
      { min: 2500001, max: 3500000, rate: 17.5, fixed: 195000 },
      { min: 3500001, max: 5000000, rate: 20, fixed: 370000 },
      { min: 5000001, max: 8000000, rate: 22.5, fixed: 670000 },
      { min: 8000001, max: 12000000, rate: 25, fixed: 1345000 },
      { min: 12000001, max: 30000000, rate: 27.5, fixed: 2345000 },
      { min: 30000001, max: 50000000, rate: 30, fixed: 7295000 },
      { min: 50000001, max: 75000000, rate: 32.5, fixed: 13295000 },
      { min: 75000001, max: null, rate: 35, fixed: 21420000 }
    ],
    "2020-2021": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 5, fixed: 0 },
      { min: 1200001, max: 1800000, rate: 10, fixed: 30000 },
      { min: 1800001, max: 2500000, rate: 15, fixed: 90000 },
      { min: 2500001, max: 3500000, rate: 17.5, fixed: 195000 },
      { min: 3500001, max: 5000000, rate: 20, fixed: 370000 },
      { min: 5000001, max: 8000000, rate: 22.5, fixed: 670000 },
      { min: 8000001, max: 12000000, rate: 25, fixed: 1345000 },
      { min: 12000001, max: 30000000, rate: 27.5, fixed: 2345000 },
      { min: 30000001, max: 50000000, rate: 30, fixed: 7295000 },
      { min: 50000001, max: 75000000, rate: 32.5, fixed: 13295000 },
      { min: 75000001, max: null, rate: 35, fixed: 21420000 }
    ],
    "2019-2020": [
      { min: 0, max: 600000, rate: 0, fixed: 0 },
      { min: 600001, max: 1200000, rate: 5, fixed: 0 },
      { min: 1200001, max: 1800000, rate: 10, fixed: 30000 },
      { min: 1800001, max: 2500000, rate: 15, fixed: 90000 },
      { min: 2500001, max: 3500000, rate: 17.5, fixed: 195000 },
      { min: 3500001, max: 5000000, rate: 20, fixed: 370000 },
      { min: 5000001, max: 8000000, rate: 22.5, fixed: 670000 },
      { min: 8000001, max: 12000000, rate: 25, fixed: 1345000 },
      { min: 12000001, max: 30000000, rate: 27.5, fixed: 2345000 },
      { min: 30000001, max: 50000000, rate: 30, fixed: 7295000 },
      { min: 50000001, max: 75000000, rate: 32.5, fixed: 13295000 },
      { min: 75000001, max: null, rate: 35, fixed: 21420000 }
    ],
    "2018-2019": [
      { min: 0, max: 400000, rate: 0, fixed: 0 },
      { min: 400001, max: 800000, rate: 0, fixed: 1000 },
      { min: 800001, max: 1200000, rate: 0, fixed: 2000 },
      { min: 1200001, max: 2500000, rate: 5, fixed: 2000 },
      { min: 2500001, max: 4000000, rate: 15, fixed: 65000 },
      { min: 4000001, max: 8000000, rate: 20, fixed: 290000 },
      { min: 8000001, max: null, rate: 25, fixed: 1090000 }
    ],
    "2017-2018": [
      { min: 0, max: 400000, rate: 0, fixed: 0 },
      { min: 400001, max: 500000, rate: 2, fixed: 0 },
      { min: 500001, max: 750000, rate: 5, fixed: 2000 },
      { min: 750001, max: 1400000, rate: 10, fixed: 14500 },
      { min: 1400001, max: 1500000, rate: 12.5, fixed: 79500 },
      { min: 1500001, max: 1800000, rate: 15, fixed: 92000 },
      { min: 1800001, max: 2500000, rate: 17.5, fixed: 137000 },
      { min: 2500001, max: 3000000, rate: 20, fixed: 259500 },
      { min: 3000001, max: 3500000, rate: 22.5, fixed: 359500 },
      { min: 3500001, max: 4000000, rate: 25, fixed: 472000 },
      { min: 4000001, max: 7000000, rate: 27.5, fixed: 597000 },
      { min: 7000001, max: null, rate: 30, fixed: 1422000 }
    ],
    "2016-2017": [
      { min: 0, max: 400000, rate: 0, fixed: 0 },
      { min: 400001, max: 500000, rate: 2, fixed: 0 },
      { min: 500001, max: 750000, rate: 5, fixed: 2000 },
      { min: 750001, max: 1400000, rate: 10, fixed: 14500 },
      { min: 1400001, max: 1500000, rate: 12.5, fixed: 79500 },
      { min: 1500001, max: 1800000, rate: 15, fixed: 92000 },
      { min: 1800001, max: 2500000, rate: 17.5, fixed: 137000 },
      { min: 2500001, max: 3000000, rate: 20, fixed: 259500 },
      { min: 3000001, max: 3500000, rate: 22.5, fixed: 359500 },
      { min: 3500001, max: 4000000, rate: 25, fixed: 472000 },
      { min: 4000001, max: 7000000, rate: 27.5, fixed: 597000 },
      { min: 7000001, max: null, rate: 30, fixed: 1422000 }
    ],
    "2015-2016": [
      { min: 0, max: 400000, rate: 0, fixed: 0 },
      { min: 400001, max: 500000, rate: 2, fixed: 0 },
      { min: 500001, max: 750000, rate: 5, fixed: 2000 },
      { min: 750001, max: 1400000, rate: 10, fixed: 14500 },
      { min: 1400001, max: 1500000, rate: 12.5, fixed: 79500 },
      { min: 1500001, max: 1800000, rate: 15, fixed: 92000 },
      { min: 1800001, max: 2500000, rate: 17.5, fixed: 137000 },
      { min: 2500001, max: 3000000, rate: 20, fixed: 259500 },
      { min: 3000001, max: 3500000, rate: 22.5, fixed: 359500 },
      { min: 3500001, max: 4000000, rate: 25, fixed: 472000 },
      { min: 4000001, max: 7000000, rate: 27.5, fixed: 597000 },
      { min: 7000001, max: null, rate: 30, fixed: 1422000 }
    ],
    "2014-2015": [
      { min: 0, max: 400000, rate: 0, fixed: 0 },
      { min: 400001, max: 750000, rate: 5, fixed: 0 },
      { min: 750001, max: 1400000, rate: 10, fixed: 17500 },
      { min: 1400001, max: 1500000, rate: 12.5, fixed: 82500 },
      { min: 1500001, max: 1800000, rate: 15, fixed: 95000 },
      { min: 1800001, max: 2500000, rate: 17.5, fixed: 140000 },
      { min: 2500001, max: 3000000, rate: 20, fixed: 262500 },
      { min: 3000001, max: 3500000, rate: 22.5, fixed: 362500 },
      { min: 3500001, max: 4000000, rate: 25, fixed: 475000 },
      { min: 4000001, max: 7000000, rate: 27.5, fixed: 600000 },
      { min: 7000001, max: null, rate: 30, fixed: 1425000 }
    ]
  };
  
  interface TaxCalculation {
    monthlyIncome: number;
    monthlyTax: number;
    salaryAfterTax: number;
    yearlyIncome: number;
    yearlyTax: number;
    yearlyIncomeAfterTax: number;
    taxRate: number;
  }
  
  /**
   * Calculate tax for a specific total amount using the appropriate tax bracket
   * @param totalAmount The total income amount to calculate tax on
   * @param fiscalYear The fiscal year to use for tax brackets
   * @returns The calculated tax amount
   */
  export function calculateTaxForTotalAmount(totalAmount: number, fiscalYear: string): number {
    const slabs = taxSlabs[fiscalYear] || taxSlabs["2025-2026"];
    let tax = 0;
    
    if (fiscalYear === "2018-2019") {
      // Special handling for 2018-2019 tax year
      if (totalAmount <= 400000) {
        tax = 0;
      } else if (totalAmount <= 800000) {
        tax = 1000;
      } else if (totalAmount <= 1200000) {
        tax = 2000;
      } else if (totalAmount <= 2500000) {
        tax = Math.max(2000, (totalAmount - 1200000) * 0.05);
      } else if (totalAmount <= 4000000) {
        tax = 65000 + (totalAmount - 2500000) * 0.15;
      } else if (totalAmount <= 8000000) {
        tax = 290000 + (totalAmount - 4000000) * 0.20;
      } else {
        tax = 1090000 + (totalAmount - 8000000) * 0.25;
      }
    } else {
      // Find the appropriate tax bracket
      let taxBracket: TaxBracket | undefined;
      
      for (const slab of slabs) {
        if (totalAmount > slab.min && (!slab.max || totalAmount <= slab.max)) {
          taxBracket = slab;
          break;
        }
      }
      
      if (!taxBracket) {
        taxBracket = slabs[slabs.length - 1]; // Use the highest bracket
      }
      
      // Calculate tax using the bracket's fixed amount and rate
      tax = taxBracket.fixed + ((totalAmount - taxBracket.min) * (taxBracket.rate / 100));
    }
    
    return Math.round(tax);
  }
  
  /**
   * Calculate tax based on monthly salary
   * @param monthlySalary The monthly salary amount
   * @param fiscalYear The fiscal year to use for tax brackets
   * @param months Optional: Number of months to calculate for (defaults to 12)
   * @returns A complete tax calculation result
   */
  export function calculateTax(monthlySalary: number, fiscalYear: string, months: number = 12): TaxCalculation {
    // Calculate the total income for the specified number of months
    const totalIncome = monthlySalary * months;
    
    // Calculate tax on the total income
    const yearlyTax = calculateTaxForTotalAmount(totalIncome, fiscalYear);
    
    // Calculate monthly tax (for display purposes)
    const monthlyTax = yearlyTax / months;
    
    // Calculate tax rate
    const taxRate = (yearlyTax / totalIncome) * 100;
  
    return {
      monthlyIncome: monthlySalary,
      monthlyTax: Math.round(monthlyTax),
      salaryAfterTax: Math.round(monthlySalary - monthlyTax),
      yearlyIncome: Math.round(totalIncome),
      yearlyTax: Math.round(yearlyTax),
      yearlyIncomeAfterTax: Math.round(totalIncome - yearlyTax),
      taxRate: taxRate
    };
  }