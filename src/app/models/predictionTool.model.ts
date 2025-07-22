export interface studentDetails {
  name: string;
  studentId: number;
  image: string;
  math_prediction: string;
  ela_prediction: string;
  classTitle?: string;
  contributing_factors:string[];
}

export interface StudentDataResponse {
  title: string;
  students: studentDetails[];
}

export interface RootData {
  classes: StudentDataResponse[];
}


  export interface subjectoverview {
    
    subject:string;
    standards:string;
    approach:string;
    below:string;
  }
  export interface scoreSelector {
    score:string;
  }