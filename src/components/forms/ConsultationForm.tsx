'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultationSchema, ConsultationFormData } from '@/lib/validations/consultation';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { Calendar, Clock, Video, Building2, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TIME_SLOTS = [
  '10:30 AM – 11:30 AM',
  '11:45 AM – 12:45 PM',
  '02:30 PM – 03:30 PM',
  '04:00 PM – 05:00 PM',
  '05:15 PM – 06:15 PM',
];

export function ConsultationForm() {
  const searchParams = useSearchParams();
  const initialPracticeArea = searchParams.get('practiceArea') || FIRM_CONFIG.practiceAreas[0]?.slug || '';

  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      practiceAreaSlug: initialPracticeArea,
      consultationFormat: 'SECURE_VIDEO_CONFERENCE',
      preferredDate: minDateStr,
      preferredTimeSlot: TIME_SLOTS[0],
      consentGiven: true,
    },
  });

  useEffect(() => {
    if (initialPracticeArea) {
      setValue('practiceAreaSlug', initialPracticeArea);
    }
  }, [initialPracticeArea, setValue]);

  const onSubmit = async (data: ConsultationFormData) => {
    setServerError(null);
    setServerSuccess(null);
    setServerRef(null);

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit consultation request');
      }

      setServerSuccess(json.message);
      setServerRef(json.referenceNumber);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-white border border-legal-border rounded-sm shadow-card p-8 sm:p-10">
      <div className="mb-8 border-b border-legal-border pb-6">
        <h3 className="text-2xl font-serif text-legal-charcoal">
          Request a Scheduled Consultation
        </h3>
        <p className="text-xs text-legal-muted mt-1 leading-relaxed">
          Please select your preferred conference format, practice area, and prospective date. Our registrar
          office will evaluate conflict checks and email a formal confirmation invite.
        </p>
      </div>

      {serverSuccess && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-900 rounded-sm space-y-3">
          <div className="flex items-center gap-2 font-semibold text-base">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Consultation Request Received (Under Registrar Review)</span>
          </div>
          <p className="text-xs text-green-800 leading-relaxed">{serverSuccess}</p>
          {serverRef && (
            <div className="pt-2">
              <span className="text-xs text-green-700">Booking Reference: </span>
              <span className="font-mono text-sm font-bold bg-white px-2.5 py-1 border border-green-200 rounded">
                {serverRef}
              </span>
            </div>
          )}
          <p className="text-[11px] text-green-700 italic pt-1">
            * Note: This request is subject to mandatory conflict clearance. Counsel will confirm availability
            via email within 24 business hours.
          </p>
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 rounded-sm flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Step 1: Format & Discipline */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal border-b border-legal-border pb-2">
            1. Consultation Format & Legal Discipline
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2.5 p-3.5 border border-legal-border rounded-sm cursor-pointer hover:border-legal-gold transition-colors">
              <input
                type="radio"
                value="SECURE_VIDEO_CONFERENCE"
                {...register('consultationFormat')}
                className="text-legal-gold focus:ring-legal-gold"
              />
              <Video className="w-4 h-4 text-legal-gold shrink-0" />
              <span className="text-xs font-medium text-legal-charcoal">Video Conference</span>
            </label>

            <label className="flex items-center gap-2.5 p-3.5 border border-legal-border rounded-sm cursor-pointer hover:border-legal-gold transition-colors">
              <input
                type="radio"
                value="IN_PERSON_CHAMBERS"
                {...register('consultationFormat')}
                className="text-legal-gold focus:ring-legal-gold"
              />
              <Building2 className="w-4 h-4 text-legal-gold shrink-0" />
              <span className="text-xs font-medium text-legal-charcoal">In-Person Chambers</span>
            </label>

            <label className="flex items-center gap-2.5 p-3.5 border border-legal-border rounded-sm cursor-pointer hover:border-legal-gold transition-colors">
              <input
                type="radio"
                value="TELEPHONIC"
                {...register('consultationFormat')}
                className="text-legal-gold focus:ring-legal-gold"
              />
              <Phone className="w-4 h-4 text-legal-gold shrink-0" />
              <span className="text-xs font-medium text-legal-charcoal">Telephonic Briefing</span>
            </label>
          </div>

          <div className="space-y-1.5 pt-2">
            <label htmlFor="practiceAreaSlug" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Target Legal Discipline <span className="text-red-500">*</span>
            </label>
            <select
              id="practiceAreaSlug"
              {...register('practiceAreaSlug')}
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
            >
              {FIRM_CONFIG.practiceAreas.map((pa) => (
                <option key={pa.slug} value={pa.slug}>
                  {pa.name}
                </option>
              ))}
              <option value="general-advisory">General Commercial Advisory</option>
            </select>
            {errors.practiceAreaSlug && (
              <p className="text-xs text-red-600">{errors.practiceAreaSlug.message}</p>
            )}
          </div>
        </div>

        {/* Step 2: Date & Slot */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal border-b border-legal-border pb-2">
            2. Preferred Date & Available Time Slot
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                id="preferredDate"
                type="date"
                min={minDateStr}
                {...register('preferredDate')}
                className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
              />
              {errors.preferredDate && (
                <p className="text-xs text-red-600">{errors.preferredDate.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="preferredTimeSlot" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
                Preferred Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                id="preferredTimeSlot"
                {...register('preferredTimeSlot')}
                className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.preferredTimeSlot && (
                <p className="text-xs text-red-600">{errors.preferredTimeSlot.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Contact & Matter Background */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal border-b border-legal-border pb-2">
            3. Contact Details & Case Background
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                placeholder="Client / Representative Name"
                className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
              />
              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
              />
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="caseSummary" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Concise Matter Background & Relief Sought <span className="text-red-500">*</span>
            </label>
            <textarea
              id="caseSummary"
              rows={4}
              {...register('caseSummary')}
              placeholder="Outline the nature of dispute, adverse parties (for conflict check), existing contractual obligations, and key dates."
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
            />
            {errors.caseSummary && (
              <p className="text-xs text-red-600">{errors.caseSummary.message}</p>
            )}
          </div>
        </div>

        {/* Consent & Ethics */}
        <div className="pt-2 space-y-3">
          <div className="flex items-start gap-2.5">
            <input
              id="consentGiven"
              type="checkbox"
              {...register('consentGiven')}
              className="mt-1 h-4 w-4 rounded border-legal-border text-legal-gold focus:ring-legal-gold"
            />
            <label htmlFor="consentGiven" className="text-xs text-legal-muted leading-relaxed">
              I understand that submitting this request is <strong>subject to conflict verification</strong> and
              does not automatically establish an advocate-client relationship. I confirm that the information
              provided is accurate to the best of my knowledge.
            </label>
          </div>
          {errors.consentGiven && (
            <p className="text-xs text-red-600">{errors.consentGiven.message}</p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover disabled:opacity-50 transition-colors rounded-sm shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting for Review...</span>
              </>
            ) : (
              <span>Submit Consultation Request</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
