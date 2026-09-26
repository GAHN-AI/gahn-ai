export type SubscriptionPlanId =
  | "explore"
  | "learner_plus"
  | "mastery"
  | "career_pro"
  | "classroom_ai"
  | "school_os"
  | "district_government";

export type SubscriptionEntitlements = {
  planId: SubscriptionPlanId;
  name: string;
  monthlyPrice: number | null;

  // Availability
  purchaseEnabled: boolean;

  // Learning access
  allLearningWorlds: boolean;
  multilingualLearning: boolean;
  adaptiveLearning: boolean;
  masteryAssessments: boolean;

  // AI instructor
  liveInstructor: boolean;
  liveInstructorMinutesPerMonth: number | null;

  // Learning Canvas
  learningCanvas: boolean;
  advancedLearningCanvas: boolean;
  codeWorkspace: boolean;
  browserLearning: boolean;

  // Homework / files
  homeworkHelp: boolean;
  fileUploads: boolean;
  advancedFileAnalysis: boolean;

  // Learner intelligence
  learnerMemory: boolean;
  advancedLearnerMemory: boolean;
  progressTracking: boolean;
  advancedAnalytics: boolean;

  // Study tools
  notes: boolean;
  studyGuides: boolean;
  reviewQuestions: boolean;

  // Career tools
  careerPrograms: boolean;
  careerProjects: boolean;
  careerSimulations: boolean;
  portfolioTools: boolean;
  interviewPractice: boolean;
  professionalToolTraining: boolean;

  // Credentials
  certificates: boolean;

  // School / classroom
  teacherDashboard: boolean;
  classroomAI: boolean;
  classroomDisplay: boolean;
  assignments: boolean;
  studentRosters: boolean;
  classroomAnalytics: boolean;

  // Institution
  adminDashboard: boolean;
  multipleClassrooms: boolean;
  schoolAnalytics: boolean;
  curriculumManagement: boolean;
  teacherManagement: boolean;

  // Enterprise
  districtManagement: boolean;
  customIntegrations: boolean;
  sso: boolean;
  customContracts: boolean;
};

export const SUBSCRIPTION_ENTITLEMENTS: Record<
  SubscriptionPlanId,
  SubscriptionEntitlements
> = {
  explore: {
    planId: "explore",
    name: "Explore",
    monthlyPrice: 0,

    purchaseEnabled: true,

    allLearningWorlds: true,
    multilingualLearning: false,
    adaptiveLearning: false,
    masteryAssessments: false,

    liveInstructor: false,
    liveInstructorMinutesPerMonth: 0,

    learningCanvas: true,
    advancedLearningCanvas: false,
    codeWorkspace: false,
    browserLearning: false,

    homeworkHelp: true,
    fileUploads: false,
    advancedFileAnalysis: false,

    learnerMemory: false,
    advancedLearnerMemory: false,
    progressTracking: false,
    advancedAnalytics: false,

    notes: true,
    studyGuides: false,
    reviewQuestions: false,

    careerPrograms: false,
    careerProjects: false,
    careerSimulations: false,
    portfolioTools: false,
    interviewPractice: false,
    professionalToolTraining: false,

    certificates: false,

    teacherDashboard: false,
    classroomAI: false,
    classroomDisplay: false,
    assignments: false,
    studentRosters: false,
    classroomAnalytics: false,

    adminDashboard: false,
    multipleClassrooms: false,
    schoolAnalytics: false,
    curriculumManagement: false,
    teacherManagement: false,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  learner_plus: {
    planId: "learner_plus",
    name: "Learner Plus",
    monthlyPrice: 29,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: false,

    liveInstructor: true,
    liveInstructorMinutesPerMonth: 30,

    learningCanvas: true,
    advancedLearningCanvas: false,
    codeWorkspace: false,
    browserLearning: false,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: false,

    learnerMemory: true,
    advancedLearnerMemory: false,
    progressTracking: true,
    advancedAnalytics: false,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: false,
    careerProjects: false,
    careerSimulations: false,
    portfolioTools: false,
    interviewPractice: false,
    professionalToolTraining: false,

    certificates: false,

    teacherDashboard: false,
    classroomAI: false,
    classroomDisplay: false,
    assignments: false,
    studentRosters: false,
    classroomAnalytics: false,

    adminDashboard: false,
    multipleClassrooms: false,
    schoolAnalytics: false,
    curriculumManagement: false,
    teacherManagement: false,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  mastery: {
    planId: "mastery",
    name: "Mastery",
    monthlyPrice: 79,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: true,

    liveInstructor: true,
    liveInstructorMinutesPerMonth: 90,

    learningCanvas: true,
    advancedLearningCanvas: true,
    codeWorkspace: true,
    browserLearning: true,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: true,

    learnerMemory: true,
    advancedLearnerMemory: true,
    progressTracking: true,
    advancedAnalytics: true,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: false,
    careerProjects: false,
    careerSimulations: false,
    portfolioTools: false,
    interviewPractice: false,
    professionalToolTraining: false,

    certificates: false,

    teacherDashboard: false,
    classroomAI: false,
    classroomDisplay: false,
    assignments: false,
    studentRosters: false,
    classroomAnalytics: false,

    adminDashboard: false,
    multipleClassrooms: false,
    schoolAnalytics: false,
    curriculumManagement: false,
    teacherManagement: false,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  career_pro: {
    planId: "career_pro",
    name: "Career Pro",
    monthlyPrice: 149,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: true,

    liveInstructor: true,
    liveInstructorMinutesPerMonth: 180,

    learningCanvas: true,
    advancedLearningCanvas: true,
    codeWorkspace: true,
    browserLearning: true,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: true,

    learnerMemory: true,
    advancedLearnerMemory: true,
    progressTracking: true,
    advancedAnalytics: true,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: true,
    careerProjects: true,
    careerSimulations: true,
    portfolioTools: true,
    interviewPractice: true,
    professionalToolTraining: true,

    certificates: true,

    teacherDashboard: false,
    classroomAI: false,
    classroomDisplay: false,
    assignments: false,
    studentRosters: false,
    classroomAnalytics: false,

    adminDashboard: false,
    multipleClassrooms: false,
    schoolAnalytics: false,
    curriculumManagement: false,
    teacherManagement: false,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  classroom_ai: {
    planId: "classroom_ai",
    name: "Classroom AI",
    monthlyPrice: 499,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: true,

    liveInstructor: true,

    // We have not finalized classroom pooled Tavus usage yet.
    liveInstructorMinutesPerMonth: null,

    learningCanvas: true,
    advancedLearningCanvas: true,
    codeWorkspace: true,
    browserLearning: true,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: true,

    learnerMemory: true,
    advancedLearnerMemory: true,
    progressTracking: true,
    advancedAnalytics: true,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: true,
    careerProjects: true,
    careerSimulations: true,
    portfolioTools: false,
    interviewPractice: false,
    professionalToolTraining: true,

    certificates: true,

    teacherDashboard: true,
    classroomAI: true,
    classroomDisplay: true,
    assignments: true,
    studentRosters: true,
    classroomAnalytics: true,

    adminDashboard: false,
    multipleClassrooms: false,
    schoolAnalytics: false,
    curriculumManagement: true,
    teacherManagement: false,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  school_os: {
    planId: "school_os",
    name: "School OS",
    monthlyPrice: 2000,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: true,

    liveInstructor: true,

    // School-wide pooled usage will be decided before launch.
    liveInstructorMinutesPerMonth: null,

    learningCanvas: true,
    advancedLearningCanvas: true,
    codeWorkspace: true,
    browserLearning: true,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: true,

    learnerMemory: true,
    advancedLearnerMemory: true,
    progressTracking: true,
    advancedAnalytics: true,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: true,
    careerProjects: true,
    careerSimulations: true,
    portfolioTools: true,
    interviewPractice: true,
    professionalToolTraining: true,

    certificates: true,

    teacherDashboard: true,
    classroomAI: true,
    classroomDisplay: true,
    assignments: true,
    studentRosters: true,
    classroomAnalytics: true,

    adminDashboard: true,
    multipleClassrooms: true,
    schoolAnalytics: true,
    curriculumManagement: true,
    teacherManagement: true,

    districtManagement: false,
    customIntegrations: false,
    sso: false,
    customContracts: false,
  },

  district_government: {
    planId: "district_government",
    name: "District / Government",
    monthlyPrice: null,

    purchaseEnabled: false,

    allLearningWorlds: true,
    multilingualLearning: true,
    adaptiveLearning: true,
    masteryAssessments: true,

    liveInstructor: true,
    liveInstructorMinutesPerMonth: null,

    learningCanvas: true,
    advancedLearningCanvas: true,
    codeWorkspace: true,
    browserLearning: true,

    homeworkHelp: true,
    fileUploads: true,
    advancedFileAnalysis: true,

    learnerMemory: true,
    advancedLearnerMemory: true,
    progressTracking: true,
    advancedAnalytics: true,

    notes: true,
    studyGuides: true,
    reviewQuestions: true,

    careerPrograms: true,
    careerProjects: true,
    careerSimulations: true,
    portfolioTools: true,
    interviewPractice: true,
    professionalToolTraining: true,

    certificates: true,

    teacherDashboard: true,
    classroomAI: true,
    classroomDisplay: true,
    assignments: true,
    studentRosters: true,
    classroomAnalytics: true,

    adminDashboard: true,
    multipleClassrooms: true,
    schoolAnalytics: true,
    curriculumManagement: true,
    teacherManagement: true,

    districtManagement: true,
    customIntegrations: true,
    sso: true,
    customContracts: true,
  },
};

export function getSubscriptionEntitlements(
  planId?: string | null
): SubscriptionEntitlements {
  if (!planId) {
    return SUBSCRIPTION_ENTITLEMENTS.explore;
  }

  if (planId in SUBSCRIPTION_ENTITLEMENTS) {
    return SUBSCRIPTION_ENTITLEMENTS[
      planId as SubscriptionPlanId
    ];
  }

  return SUBSCRIPTION_ENTITLEMENTS.explore;
}

export function hasEntitlement(
  planId: string | null | undefined,
  entitlement: keyof SubscriptionEntitlements
): boolean {
  const plan = getSubscriptionEntitlements(planId);

  return plan[entitlement] === true;
}