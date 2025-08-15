import React, { forwardRef } from 'react';
import type { FunctionalAbilitiesFormData } from '../types';
import { DownloadIcon, FormIcon } from './icons/Icons';
import {
    PatientReturnStatus,
    WalkingAbility,
    StandingAbility,
    SittingAbility,
    LiftingAbility,
    ClimbingAbility,
    Duration,
    WorkHoursRecommendation,
} from '../types';


interface PatientFormProps {
  formData: FunctionalAbilitiesFormData | null;
  onDownloadPdf: () => void;
}

const formatDate = (dateString: string) => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return { dd: '', mm: '', yyyy: '' };
    const [yyyy, mm, dd] = dateString.split('-');
    return { dd, mm, yyyy };
}

// Helper components for the form
const Field: React.FC<{ label: string; value?: string; className?: string }> = ({ label, value = '', className = ''}) => (
    <div className={`flex flex-col ${className}`}>
        <span className="text-xs text-gray-600">{label}</span>
        <div className="mt-1 p-1 min-h-[28px] border-b border-gray-400 text-sm font-medium text-black">{value}</div>
    </div>
);

const DateField: React.FC<{ label?: string; value?: string; className?: string }> = ({ label, value = '', className = '' }) => {
    const { dd, mm, yyyy } = formatDate(value);
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <span className="text-xs text-gray-600">{label}</span>}
            <div className="mt-1 flex items-center space-x-2">
                <div className="p-1 w-10 text-center border-b border-gray-400 text-sm font-medium">{dd}</div>
                <div className="p-1 w-10 text-center border-b border-gray-400 text-sm font-medium">{mm}</div>
                <div className="p-1 w-16 text-center border-b border-gray-400 text-sm font-medium">{yyyy}</div>
            </div>
        </div>
    );
};

const Checkbox: React.FC<{ label: string; checked?: boolean; isRadio?: boolean }> = ({ label, checked = false, isRadio = false }) => (
    <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 border border-black flex items-center justify-center ${isRadio ? 'rounded-full' : ''}`}>
            {checked && <div className={`bg-black ${isRadio ? 'w-2 h-2 rounded-full' : 'w-3 h-3'}`}></div>}
        </div>
        <span className="text-sm">{label}</span>
    </div>
);

const CheckboxGroup: React.FC<{ options: string[]; selected?: string | string[]; legend?: string, otherValue?: string }> = ({ options, selected, legend, otherValue }) => (
    <div className="flex flex-col space-y-1">
        {legend && <span className="text-xs text-gray-600 mb-1">{legend}</span>}
        {options.map(option => (
             <div key={option}>
                <Checkbox label={option === 'Other' ? 'Other (please specify)' : option} checked={Array.isArray(selected) ? selected.includes(option) : selected === option} />
                {option === 'Other' && selected === 'Other' && otherValue && <div className="ml-6 text-sm italic border-b border-gray-400">{otherValue}</div>}
            </div>
        ))}
    </div>
);


const PatientForm = forwardRef<HTMLDivElement, PatientFormProps>(({ formData, onDownloadPdf }, ref) => {
  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <FormIcon className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Functional Abilities Form</h3>
        <p className="max-w-xs">The patient's information will appear here after the transcript is analyzed.</p>
      </div>
    );
  }

  // Guard against model returning a string instead of an array for fields that expect an array
  const workHoursRecs = Array.isArray(formData.sectionE?.workHoursRecommendation) 
      ? formData.sectionE.workHoursRecommendation 
      : (formData.sectionE?.workHoursRecommendation ? [formData.sectionE.workHoursRecommendation] : []);

  const formProvidedToArray = Array.isArray(formData.sectionF?.formProvidedTo)
      ? formData.sectionF.formProvidedTo
      : (formData.sectionF?.formProvidedTo ? [formData.sectionF.formProvidedTo] : []);
  
  return (
    <>
      <div ref={ref} className="bg-white p-4 rounded-lg flex-grow text-xs sm:text-sm overflow-auto font-serif">
        <div className="border-2 border-black p-2 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-lg font-bold">Functional Abilities Form</h1>
                <div className="text-right">
                    <Field label="Claim No." value={formData.sectionA?.claimNo}/>
                </div>
            </div>

            {/* Section A */}
            <fieldset className="border border-black p-2">
                <legend className="px-1 font-bold text-sm">A. Section A to be completed by the employer and/or worker.</legend>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                    <Field label="Worker's Last Name" value={formData.sectionA?.workerLastName} className="col-span-2"/>
                    <Field label="First Name" value={formData.sectionA?.workerFirstName} />
                    <Field label="Address (no., street, apt.)" value={formData.sectionA?.workerAddress?.street} className="col-span-3"/>
                    <Field label="City/Town" value={formData.sectionA?.workerAddress?.city} className="col-span-1"/>
                    <Field label="Province" value={formData.sectionA?.workerAddress?.province} />
                    <Field label="Postal Code" value={formData.sectionA?.workerAddress?.postalCode} />
                    <Field label="Telephone" value={formData.sectionA?.workerTelephone} />
                    <DateField label="Date of Birth (dd/mm/yyyy)" value={formData.sectionA?.dateOfBirth} className="col-span-2"/>
                    <Field label="Employer's Name" value={formData.sectionA?.employerName} className="col-span-3"/>
                    <Field label="Full Address (No., Street, Apt.)" value={formData.sectionA?.employerAddress?.street} className="col-span-3"/>
                    <Field label="City/Town" value={formData.sectionA?.employerAddress?.city} />
                    <Field label="Prov." value={formData.sectionA?.employerAddress?.province} />
                    <Field label="Postal Code" value={formData.sectionA?.employerAddress?.postalCode} />
                    <Field label="Employer Telephone" value={formData.sectionA?.employerTelephone} />
                    <DateField label="Date of Accident/Awareness of Illness (dd/mm/yyyy)" value={formData.sectionA?.dateOfAccident} className="col-span-2"/>
                    <Field label="Employer Fax No." value={formData.sectionA?.employerFaxNo} />
                    <Field label="1. Type of job at time of accident" value={formData.sectionA?.jobAtTimeOfAccident} className="col-span-2"/>
                    <Field label="Area(s) of injury(ies)/illness(es)" value={formData.sectionA?.areasOfInjury} />
                    <div className="col-span-3 grid grid-cols-3 items-end">
                        <div className="text-sm">2. Have the worker and the employer discussed Return To Work</div>
                        <div className="flex space-x-4">
                            <Checkbox label="yes" checked={formData.sectionA?.discussedReturnToWork === true} isRadio/>
                            <Checkbox label="no" checked={formData.sectionA?.discussedReturnToWork === false} isRadio/>
                        </div>
                        <DateField label="If no, will be discussed on" value={formData.sectionA?.discussionDate} />
                    </div>
                     <Field label="3. Employer contact name" value={formData.sectionA?.employerContactName} className="col-span-2"/>
                    <Field label="Position" value={formData.sectionA?.employerContactPosition} />
                </div>
            </fieldset>

            {/* Section D */}
            <fieldset className="border border-black p-2 mt-2">
                <legend className="px-1 font-bold text-sm">D. The following information should be completed by the Health Professional...</legend>
                 <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-start">
                    <Field label="Worker's Last Name" value={formData.sectionA?.workerLastName} className="col-span-2"/>
                    <Field label="First Name" value={formData.sectionA?.workerFirstName} />
                    <Field label="Claim No." value={formData.sectionA?.claimNo}/>
                    <DateField label="1. Date of Assessment" value={formData.sectionD?.assessmentDate} />
                    <div className="col-span-3">
                        <span className="font-medium text-sm">2. Please check one:</span>
                        <div className="mt-1 space-y-1">
                            <Checkbox isRadio label="Patient is capable of returning to work with no restrictions." checked={formData.sectionD?.patientReturnStatus === PatientReturnStatus.NO_RESTRICTIONS}/>
                            <Checkbox isRadio label="Patient is capable of returning to work with restrictions. Complete sections E and F." checked={formData.sectionD?.patientReturnStatus === PatientReturnStatus.WITH_RESTRICTIONS}/>
                            <Checkbox isRadio label="Patient is physically unable to return to work at this time. Complete section F." checked={formData.sectionD?.patientReturnStatus === PatientReturnStatus.UNABLE_TO_RETURN}/>
                        </div>
                    </div>
                </div>
            </fieldset>
            
            {/* Section E */}
            <fieldset className="border border-black p-2 mt-2">
                <legend className="px-1 font-bold text-sm">E. Abilities and/or Restrictions</legend>
                <div className="space-y-3">
                    <p className="font-medium text-sm">1. Please indicate <span className="font-bold">Abilities</span> that apply.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <CheckboxGroup legend="Walking:" options={Object.values(WalkingAbility)} selected={formData.sectionE?.abilities?.walking} otherValue={formData.sectionE?.abilities?.walkingOther}/>
                        <CheckboxGroup legend="Standing:" options={Object.values(StandingAbility)} selected={formData.sectionE?.abilities?.standing} otherValue={formData.sectionE?.abilities?.standingOther}/>
                        <CheckboxGroup legend="Sitting:" options={Object.values(SittingAbility)} selected={formData.sectionE?.abilities?.sitting} otherValue={formData.sectionE?.abilities?.sittingOther}/>
                        <CheckboxGroup legend="Lifting from floor to waist:" options={Object.values(LiftingAbility)} selected={formData.sectionE?.abilities?.liftingFloorToWaist} otherValue={formData.sectionE?.abilities?.liftingFloorToWaistOther}/>
                        <CheckboxGroup legend="Lifting from waist to shoulder:" options={Object.values(LiftingAbility)} selected={formData.sectionE?.abilities?.liftingWaistToShoulder} otherValue={formData.sectionE?.abilities?.liftingWaistToShoulderOther}/>
                        <CheckboxGroup legend="Stair climbing:" options={['Full abilities', 'Up to 5 steps', '5 - 10 steps', 'Other']} selected={formData.sectionE?.abilities?.stairClimbing} otherValue={formData.sectionE?.abilities?.stairClimbingOther}/>
                        <CheckboxGroup legend="Ladder climbing:" options={['Full abilities', '1 - 3 steps', '4 - 6 steps', 'Other']} selected={formData.sectionE?.abilities?.ladderClimbing} otherValue={formData.sectionE?.abilities?.ladderClimbingOther}/>
                        <div>
                            <span className="text-xs text-gray-600 mb-1">Travel to work:</span>
                            <div className="flex flex-col space-y-1 mt-1">
                                <div className="flex space-x-4"><Checkbox label="yes" checked={formData.sectionE?.abilities?.canUsePublicTransit} isRadio/><Checkbox label="no" checked={!formData.sectionE?.abilities?.canUsePublicTransit} isRadio/><span className="text-sm ml-2">Ability to use public transit</span></div>
                                <div className="flex space-x-4"><Checkbox label="yes" checked={formData.sectionE?.abilities?.canDriveCar} isRadio/><Checkbox label="no" checked={!formData.sectionE?.abilities?.canDriveCar} isRadio/><span className="text-sm ml-2">Ability to drive a car</span></div>
                            </div>
                        </div>
                    </div>
                    <p className="font-medium text-sm pt-2">2. Please indicate <span className="font-bold">Restrictions</span> that apply.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Checkbox label="Bending/twisting repetitive movement of" checked={formData.sectionE?.restrictions?.bendingTwisting} />
                         {formData.sectionE?.restrictions?.bendingTwisting && <div className="ml-6 text-sm italic border-b border-gray-400">{formData.sectionE?.restrictions?.bendingTwistingDetails}</div>}
                        </div>
                        <Checkbox label="Work at or above shoulder activity" checked={formData.sectionE?.restrictions?.workAboveShoulder} />
                         <div><Checkbox label="Chemical exposure to:" checked={formData.sectionE?.restrictions?.chemicalExposure} />
                         {formData.sectionE?.restrictions?.chemicalExposure && <div className="ml-6 text-sm italic border-b border-gray-400">{formData.sectionE?.restrictions?.chemicalExposureDetails}</div>}
                        </div>
                         <div><Checkbox label="Environmental exposure to: (e.g. heat, cold, noise or scents)" checked={formData.sectionE?.restrictions?.environmentalExposure} />
                         {formData.sectionE?.restrictions?.environmentalExposure && <div className="ml-6 text-sm italic border-b border-gray-400">{formData.sectionE?.restrictions?.environmentalExposureDetails}</div>}
                        </div>
                    </div>
                     <p className="font-medium text-sm pt-2">3. Additional Comments on Abilities and/or Restrictions.</p>
                     <div className="p-2 border border-gray-300 min-h-[50px] bg-gray-50 rounded">{formData.sectionE?.additionalComments}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                            <p className="font-medium text-sm">4. From the date of this assessment, the above will apply for approximately:</p>
                            <div className="flex space-x-4 mt-1">
                                <Checkbox isRadio label="1 - 2 days" checked={formData.sectionE?.restrictionsApplyFor === Duration['1_2_DAYS']} />
                                <Checkbox isRadio label="3 - 7 days" checked={formData.sectionE?.restrictionsApplyFor === Duration['3_7_DAYS']} />
                                <Checkbox isRadio label="8 - 14 days" checked={formData.sectionE?.restrictionsApplyFor === Duration['8_14_DAYS']} />
                                <Checkbox isRadio label="14 + days" checked={formData.sectionE?.restrictionsApplyFor === Duration['14_PLUS_DAYS']} />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-sm">5. Have you discussed return to work with your patient?</p>
                             <div className="flex space-x-4 mt-1">
                                <Checkbox isRadio label="yes" checked={formData.sectionE?.discussedReturnToWorkWithPatient === true} />
                                <Checkbox isRadio label="no" checked={formData.sectionE?.discussedReturnToWorkWithPatient === false} />
                            </div>
                        </div>
                         <div className="col-span-2">
                            <p className="font-medium text-sm">6. Recommendations for work hours and start date:</p>
                             <div className="flex items-end space-x-4 mt-1">
                                <Checkbox label="Regular full-time hours" checked={workHoursRecs.includes(WorkHoursRecommendation.REGULAR)} />
                                <Checkbox label="Modified hours" checked={workHoursRecs.includes(WorkHoursRecommendation.MODIFIED)} />
                                <Checkbox label="Graduated hours" checked={workHoursRecs.includes(WorkHoursRecommendation.GRADUATED)} />
                                <DateField label="Start Date" value={formData.sectionE?.workStartDate} />
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Section F */}
            <fieldset className="border border-black p-2 mt-2">
                <legend className="px-1 font-bold text-sm">F. Date of Next Appointment</legend>
                 <div className="flex items-end space-x-4">
                    <span className="font-medium">Recommended date of next appointment to review Abilities and/or Restrictions.</span>
                    <DateField value={formData.sectionF?.nextAppointmentDate} />
                </div>
            </fieldset>

            <div className="flex items-center space-x-4 justify-center py-2">
                <span className="font-medium">I have provided this completed Functional Abilities Form to:</span>
                <Checkbox label="Worker" checked={formProvidedToArray.includes('Worker')} />
                <span className="font-bold">and/or</span>
                <Checkbox label="Employer" checked={formProvidedToArray.includes('Employer')} />
            </div>

        </div>
      </div>
      <button
        onClick={onDownloadPdf}
        className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <DownloadIcon className="w-5 h-5 mr-2 -ml-1"/>
        Download as PDF
      </button>
    </>
  );
});

export default PatientForm;