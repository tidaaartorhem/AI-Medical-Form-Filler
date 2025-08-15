import { Type } from "@google/genai";

export const DUMMY_TRANSCRIPT = `
**Physiotherapy Progress Note**

**Patient:** Johnathan Doe
**Claim Number:** ON-987654
**Date of Birth:** 1985-11-22
**Date of Assessment:** 2024-07-26
**Date of Accident:** 2024-06-15

**Patient Information:**
- Address: 123 Maple Street, Toronto, ON, M5A 1K9
- Phone: 416-555-1234
- Occupation: Warehouse Worker at 'Global Logistics Inc.'

**Employer Information:**
- Global Logistics Inc.
- Address: 789 Industrial Rd, Mississauga, ON, L5W 1N8
- Contact: Sarah Connor, HR Manager
- Phone: 905-555-5678, Fax: 905-555-5679

**Subjective:**
Mr. Doe is a 38-year-old male, status post-workplace injury on June 15, 2024. He reports straining his lower back while lifting a heavy box (approx. 15 kg). He describes a sharp pain in his lumbar region and right glute. His primary area of injury is the lumbar spine.

He reports being unable to stand for more than 20 minutes without significant discomfort. Sitting is better, but he gets stiff after about an hour. He can walk comfortably for about 150 meters before needing a rest. Lifting is significantly limited; he feels pain lifting anything heavier than 5 kg from the floor and can manage up to 8 kg from waist height. Stair climbing is okay for one flight (about 10 steps), but more is difficult. He has not tried climbing a ladder.

He takes public transit and has no issue with that. He also drives his own car without problems. His primary restriction is repetitive bending and twisting, which immediately aggravates the pain. He has no issues with his hands, grip, or pushing/pulling with his arms. His current medications (prescribed by his GP) include Robaxacet, which he notes can cause mild drowsiness, so operating heavy machinery like a forklift would not be advisable. His work environment is not subject to significant chemical, environmental, or vibration exposure.

**Objective:**
- Lumbar range of motion: Flexion limited to 45 degrees due to pain. Extension and rotation are within functional limits but guarded.
- Straight Leg Raise (SLR): Positive on the right at 60 degrees.
- Strength: Manual muscle testing reveals 4/5 strength in right hip extensors.

**Assessment & Plan:**
Lumbar strain with suspected L5 radiculopathy. The patient is showing steady improvement with physiotherapy. He is capable of returning to work with specific restrictions. We discussed a graduated return-to-work plan. I recommend he starts with modified duties, avoiding heavy lifting and repetitive bending. These restrictions should be in place for the next 2-3 weeks (let's say 14+ days to be safe) before reassessment. A follow-up is scheduled for August 9, 2024. I have provided a copy of this assessment to Mr. Doe and will fax it to his employer as requested. We have discussed the return to work plan, and he is agreeable.

**Health Professional:**
- Dr. Amanda Chen, PT
- Designation: Physiotherapist
- Address: 456 Wellness Ave, Toronto, ON, M4Y 1W5
- Phone: 416-555-9876, Fax: 416-555-9877
- WSIB ID: P-12345
- Invoice #: 789-2024
`;

export const FUNCTIONAL_ABILITIES_FORM_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        sectionA: {
            type: Type.OBJECT,
            properties: {
                workerLastName: { type: Type.STRING, description: "Worker's last name." },
                workerFirstName: { type: Type.STRING, description: "Worker's first name." },
                claimNo: { type: Type.STRING, description: "Claim number, if available." },
                workerAddress: {
                    type: Type.OBJECT,
                    properties: {
                        street: { type: Type.STRING },
                        city: { type: Type.STRING },
                        province: { type: Type.STRING },
                        postalCode: { type: Type.STRING },
                    },
                    required: ["street", "city", "province", "postalCode"],
                },
                workerTelephone: { type: Type.STRING },
                employerName: { type: Type.STRING },
                employerAddress: {
                    type: Type.OBJECT,
                    properties: {
                        street: { type: Type.STRING },
                        city: { type: Type.STRING },
                        province: { type: Type.STRING },
                        postalCode: { type: Type.STRING },
                    },
                    required: ["street", "city", "province", "postalCode"],
                },
                dateOfBirth: { type: Type.STRING, description: "Date of birth in YYYY-MM-DD format." },
                dateOfAccident: { type: Type.STRING, description: "Date of accident in YYYY-MM-DD format." },
                employerTelephone: { type: Type.STRING },
                employerFaxNo: { type: Type.STRING },
                jobAtTimeOfAccident: { type: Type.STRING },
                areasOfInjury: { type: Type.STRING, description: "Describe the primary area(s) of injury." },
                discussedReturnToWork: { type: Type.BOOLEAN, description: "Has return to work been discussed between worker and employer? Infer if possible, otherwise null." },
                discussionDate: { type: Type.STRING, description: "Date for future discussion, if applicable (YYYY-MM-DD)." },
                employerContactName: { type: Type.STRING },
                employerContactPosition: { type: Type.STRING },
            },
        },
        sectionC: {
            type: Type.OBJECT,
            properties: {
                healthProfessionalDesignation: { type: Type.STRING, enum: ['Chiropractor', 'Physician', 'Physiotherapist', 'Registered Nurse (Extended Class)', 'Other'] },
                healthProfessionalName: { type: Type.STRING },
                healthProfessionalAddress: {
                    type: Type.OBJECT,
                    properties: {
                        street: { type: Type.STRING },
                        city: { type: Type.STRING },
                        province: { type: Type.STRING },
                        postalCode: { type: Type.STRING },
                    },
                },
                healthProfessionalTelephone: { type: Type.STRING },
                healthProfessionalFax: { type: Type.STRING },
                wsibProviderId: { type: Type.STRING },
                invoiceNumber: { type: Type.STRING },
                signatureDate: { type: Type.STRING, description: "Date health professional signed, should be same as assessment date (YYYY-MM-DD)." },
            },
        },
        sectionD: {
            type: Type.OBJECT,
            properties: {
                assessmentDate: { type: Type.STRING, description: "Date of the assessment in YYYY-MM-DD format." },
                patientReturnStatus: { type: Type.STRING, enum: ['Patient is capable of returning to work with no restrictions.', 'Patient is capable of returning to work with restrictions.', 'Patient is physically unable to return to work at this time.'] },
            },
        },
        sectionE: {
            type: Type.OBJECT,
            properties: {
                abilities: {
                    type: Type.OBJECT,
                    properties: {
                        walking: { type: Type.STRING, enum: ['Full abilities', 'Up to 100 metres', '100 - 200 metres', 'Other'] },
                        walkingOther: { type: Type.STRING, description: "Specify details if walking ability is 'Other'." },
                        standing: { type: Type.STRING, enum: ['Full abilities', 'Up to 15 minutes', '15 - 30 minutes', 'Other'] },
                        standingOther: { type: Type.STRING, description: "Specify details if standing ability is 'Other'." },
                        sitting: { type: Type.STRING, enum: ['Full abilities', 'Up to 30 minutes', '30 minutes - 1 hour', 'Other'] },
                        sittingOther: { type: Type.STRING, description: "Specify details if sitting ability is 'Other'." },
                        liftingFloorToWaist: { type: Type.STRING, enum: ['Full abilities', 'Up to 5 kilograms', '5 - 10 kilograms', 'Other'] },
                        liftingFloorToWaistOther: { type: Type.STRING, description: "Specify details if lifting from floor is 'Other'." },
                        liftingWaistToShoulder: { type: Type.STRING, enum: ['Full abilities', 'Up to 5 kilograms', '5 - 10 kilograms', 'Other'] },
                        liftingWaistToShoulderOther: { type: Type.STRING, description: "Specify details if lifting from waist is 'Other'." },
                        stairClimbing: { type: Type.STRING, enum: ['Full abilities', 'Up to 5 steps', '5 - 10 steps', 'Other'] },
                        stairClimbingOther: { type: Type.STRING, description: "Specify details if stair climbing is 'Other'." },
                        ladderClimbing: { type: Type.STRING, enum: ['Full abilities', '1 - 3 steps', '4 - 6 steps', 'Other'] },
                        ladderClimbingOther: { type: Type.STRING, description: "Specify details if ladder climbing is 'Other'." },
                        canUsePublicTransit: { type: Type.BOOLEAN },
                        canDriveCar: { type: Type.BOOLEAN },
                    },
                },
                restrictions: {
                    type: Type.OBJECT,
                    properties: {
                        bendingTwisting: { type: Type.BOOLEAN },
                        bendingTwistingDetails: { type: Type.STRING, description: "Details on bending/twisting restrictions." },
                        workAboveShoulder: { type: Type.BOOLEAN },
                        chemicalExposure: { type: Type.BOOLEAN },
                        chemicalExposureDetails: { type: Type.STRING },
                        environmentalExposure: { type: Type.BOOLEAN },
                        environmentalExposureDetails: { type: Type.STRING },
                        limitedUseOfHands: {
                            type: Type.OBJECT,
                            properties: {
                                left: { type: Type.OBJECT, properties: { gripping: { type: Type.BOOLEAN }, pinching: { type: Type.BOOLEAN }, other: { type: Type.BOOLEAN }, otherDetails: { type: Type.STRING } } },
                                right: { type: Type.OBJECT, properties: { gripping: { type: Type.BOOLEAN }, pinching: { type: Type.BOOLEAN }, other: { type: Type.BOOLEAN }, otherDetails: { type: Type.STRING } } },
                            },
                        },
                        limitedPushingPulling: {
                            type: Type.OBJECT,
                            properties: {
                                leftArm: { type: Type.BOOLEAN },
                                rightArm: { type: Type.BOOLEAN },
                                other: { type: Type.BOOLEAN },
                                otherDetails: { type: Type.STRING },
                            },
                        },
                        operatingMotorizedEquipment: { type: Type.BOOLEAN, description: "Is there a restriction on operating motorized equipment?" },
                        medicationSideEffects: { type: Type.BOOLEAN },
                        medicationSideEffectsDetails: { type: Type.STRING, description: "Describe side effects from medications." },
                        vibrationExposure: {
                            type: Type.OBJECT,
                            properties: {
                                wholeBody: { type: Type.BOOLEAN },
                                handArm: { type: Type.BOOLEAN },
                            },
                        },
                    },
                },
                additionalComments: { type: Type.STRING, description: "Summarize the assessment, plan, and key limitations." },
                restrictionsApplyFor: { type: Type.STRING, enum: ['1 - 2 days', '3 - 7 days', '8 - 14 days', '14 + days'] },
                discussedReturnToWorkWithPatient: { type: Type.BOOLEAN },
                workHoursRecommendation: { type: Type.ARRAY, items: { type: Type.STRING, enum: ['Regular full-time hours', 'Modified hours', 'Graduated hours'] } },
                workStartDate: { type: Type.STRING, description: "Recommended start date for return to work (YYYY-MM-DD)." },
            },
        },
        sectionF: {
            type: Type.OBJECT,
            properties: {
                nextAppointmentDate: { type: Type.STRING, description: "Date of the next scheduled appointment in YYYY-MM-DD format." },
                formProvidedTo: { type: Type.ARRAY, items: { type: Type.STRING, enum: ['Worker', 'Employer'] } },
            },
        },
    },
    required: ["sectionA", "sectionC", "sectionD", "sectionE", "sectionF"],
};