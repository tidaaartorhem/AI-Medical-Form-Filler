
export enum PatientReturnStatus {
  NO_RESTRICTIONS = 'Patient is capable of returning to work with no restrictions.',
  WITH_RESTRICTIONS = 'Patient is capable of returning to work with restrictions.',
  UNABLE_TO_RETURN = 'Patient is physically unable to return to work at this time.',
}

export enum AbilityLevel {
  FULL = 'Full abilities',
  LIMITED = 'Limited',
  OTHER = 'Other',
}

export enum WalkingAbility {
    FULL = 'Full abilities',
    UP_TO_100M = 'Up to 100 metres',
    '100_200M' = '100 - 200 metres',
    OTHER = 'Other',
}

export enum StandingAbility {
    FULL = 'Full abilities',
    UP_TO_15_MIN = 'Up to 15 minutes',
    '15_30_MIN' = '15 - 30 minutes',
    OTHER = 'Other',
}

export enum SittingAbility {
    FULL = 'Full abilities',
    UP_TO_30_MIN = 'Up to 30 minutes',
    '30_MIN_1_HOUR' = '30 minutes - 1 hour',
    OTHER = 'Other',
}

export enum LiftingAbility {
    FULL = 'Full abilities',
    UP_TO_5_KG = 'Up to 5 kilograms',
    '5_10_KG' = '5 - 10 kilograms',
    OTHER = 'Other',
}

export enum ClimbingAbility {
    FULL = 'Full abilities',
    '1_3_STEPS' = '1 - 3 steps',
    '4_6_STEPS' = '4 - 6 steps',
    'UP_TO_5_STEPS' = 'Up to 5 steps',
    '5_10_STEPS' = '5 - 10 steps',
    OTHER = 'Other',
}

export enum Duration {
    '1_2_DAYS' = '1 - 2 days',
    '3_7_DAYS' = '3 - 7 days',
    '8_14_DAYS' = '8 - 14 days',
    '14_PLUS_DAYS' = '14 + days',
}

export enum WorkHoursRecommendation {
    REGULAR = 'Regular full-time hours',
    MODIFIED = 'Modified hours',
    GRADUATED = 'Graduated hours',
}

export interface FunctionalAbilitiesFormData {
  sectionA: {
    workerLastName: string;
    workerFirstName: string;
    claimNo: string;
    workerAddress: { street: string; city: string; province: string; postalCode: string };
    workerTelephone: string;
    employerName: string;
    employerAddress: { street: string; city: string; province: string; postalCode: string };
    dateOfBirth: string;
    dateOfAccident: string;
    employerTelephone: string;
    employerFaxNo: string;
    jobAtTimeOfAccident: string;
    areasOfInjury: string;
    discussedReturnToWork: boolean | null;
    discussionDate: string;
    employerContactName: string;
    employerContactPosition: string;
  };
  sectionC: {
    healthProfessionalDesignation: 'Chiropractor' | 'Physician' | 'Physiotherapist' | 'Registered Nurse (Extended Class)' | 'Other';
    healthProfessionalName: string;
    healthProfessionalAddress: { street: string; city: string; province: string; postalCode: string };
    healthProfessionalTelephone: string;
    healthProfessionalFax: string;
    wsibProviderId: string;
    invoiceNumber: string;
    signatureDate: string;
  };
  sectionD: {
    assessmentDate: string;
    patientReturnStatus: PatientReturnStatus;
  };
  sectionE: {
    abilities: {
      walking: WalkingAbility;
      walkingOther: string;
      standing: StandingAbility;
      standingOther: string;
      sitting: SittingAbility;
      sittingOther: string;
      liftingFloorToWaist: LiftingAbility;
      liftingFloorToWaistOther: string;
      liftingWaistToShoulder: LiftingAbility;
      liftingWaistToShoulderOther: string;
      stairClimbing: ClimbingAbility;
      stairClimbingOther: string;
      ladderClimbing: ClimbingAbility;
      ladderClimbingOther: string;
      canUsePublicTransit: boolean;
      canDriveCar: boolean;
    };
    restrictions: {
      bendingTwisting: boolean;
      bendingTwistingDetails: string;
      workAboveShoulder: boolean;
      chemicalExposure: boolean;
      chemicalExposureDetails: string;
      environmentalExposure: boolean;
      environmentalExposureDetails: string;
      limitedUseOfHands: {
        left: { gripping: boolean; pinching: boolean; other: boolean; otherDetails: string; };
        right: { gripping: boolean; pinching: boolean; other: boolean; otherDetails: string; };
      };
      limitedPushingPulling: { leftArm: boolean; rightArm: boolean; other: boolean; otherDetails: string; };
      operatingMotorizedEquipment: boolean;
      medicationSideEffects: boolean;
      medicationSideEffectsDetails: string;
      vibrationExposure: { wholeBody: boolean; handArm: boolean; };
    };
    additionalComments: string;
    restrictionsApplyFor: Duration;
    discussedReturnToWorkWithPatient: boolean | null;
    workHoursRecommendation: WorkHoursRecommendation[];
    workStartDate: string;
  };
  sectionF: {
    nextAppointmentDate: string;
    formProvidedTo: ('Worker' | 'Employer')[];
  };
}
