export interface PredictionInputData {
  studentId: string;
  studentName: string;
  slsELA: number;
  slsMath: number;
}

export interface PredictionResultData extends PredictionInputData {
  inhibitorsELA: string[];
  inhibitorsMath: string[];
  // Results after clicking 'Predict'
  likelihoodScoreELA?: number;
  likelihoodScoreMath?: number;
}

// For the side card on page 19
export interface PredictionStudentSummary {
  studentId: string;
  studentName: string;
  likelihoodScoreELA: number;
  likelihoodScoreMath: number;
  inhibitorsELA: string[];
  inhibitorsMath: string[];
}

export interface studentDetails {
  name:string;
  studentId:number;
  image:string;
  math_prediction:string;
  ela_prediction:string;
 
}

export interface ContributingFactor {
  label: string;
  value: number;
  color: 'green' | 'orange' | 'red'; 
}

export interface PredictionModule {
  title: string;
  likelihood: number;
  performanceLevel: string;
  contributingFactors: ContributingFactor[];
}