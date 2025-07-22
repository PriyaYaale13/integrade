import { Injectable } from "@angular/core";
import { KpiData, ExtendedKpiData } from "../models/dashboard.model";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    getProgressWidth(kpi: KpiData): string {
        const extendedKpi = kpi as ExtendedKpiData;
        if (extendedKpi.progressValue !== undefined) {
            return `${extendedKpi.progressValue}%`;
        }
        // Convert the KPI value to a percentage for the progress bar
        if (typeof kpi.value === 'number') {
            // If it's already a percentage (0-100)
            if (kpi.value <= 100) {
                return `${kpi.value}%`;
            }
            // If it's a larger number, cap at 100%
            return '100%';
        }
        else if (typeof kpi.value === 'string') {
            // Try to parse as number
            const numValue = parseFloat(kpi.value);
            if (!isNaN(numValue)) {
                if (numValue <= 100) {
                    return `${numValue}%`;
                }
                return '100%';
            }
        }
        // Default value if we can't determine percentage
        return '50%';
    }

    getComparison(kpi: KpiData): string {
        const extendedKpi = kpi as ExtendedKpiData;
        return extendedKpi.comparison || 'vs last month';
    }

    // Helper methods to safely access extended properties
    getTrendValue(kpi: KpiData): string {
        const extendedKpi = kpi as ExtendedKpiData;
        return extendedKpi.trendValue || '0%';
    }
}