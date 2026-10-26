'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryFormData } from '@/lib/validations/enquiry';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

export function EnquiryForm() {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      preferredContactMethod: 'EMAIL',
      practiceAreaCategory: FIRM_CONFIG.practiceAreas[0]?.slug || '',
      consentGiven: true,
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setServerError(null);
    setServerSuccess(null);
    setServerRef(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry');
      }

      setServerSuccess(json.message);
      setServerRef(json.referenceNumber);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'An unexpected network error occurred.');
    }
  };

  return (
    <div className="bg-white p-5 sm:p-8 md:p-10 border border-legal-border rounded-sm shadow-card">
      <div className="mb-8 border-b border-legal-border pb-6">
        <h3 className="text-2xl font-serif text-legal-charcoal">
          Send a Confidential Enquiry
        </h3>
        <p className="text-xs text-legal-muted mt-1 leading-relaxed">
          Complete the intake form below to connect with our legal intake team. All communications are
          handled under strict professional confidentiality guidelines.
        </p>
      </div>

      {serverSuccess && (
        <div className="mb-6 p-5 bg-green-50 border border-green-200 text-green-900 rounded-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Enquiry Successfully Logged with Chambers</span>
          </div>
          <p className="text-xs text-green-800">{serverSuccess}</p>
          {serverRef && (
            <p className="text-xs font-mono bg-white p-2 border border-green-200 rounded inline-block">
              Intake Reference: <strong>{serverRef}</strong>
            </p>
          )}
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 rounded-sm flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              placeholder="e.g. Adv. Amit Saxena / Priya Verma"
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-1.5">
            <label htmlFor="preferredContactMethod" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
              Preferred Contact Channel
            </label>
            <select
              id="preferredContactMethod"
              {...register('preferredContactMethod')}
              className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
            >
              <option value="EMAIL">Email</option>
              <option value="PHONE">Telephone Call</option>
              <option value="WHATSAPP">WhatsApp Message</option>
            </select>
          </div>
        </div>

        {/* Practice Area Selection */}
        <div className="space-y-1.5">
          <label htmlFor="practiceAreaCategory" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
            Practice Area Discipline <span className="text-red-500">*</span>
          </label>
          <select
            id="practiceAreaCategory"
            {...register('practiceAreaCategory')}
            className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
          >
            {FIRM_CONFIG.practiceAreas.map((pa) => (
              <option key={pa.slug} value={pa.slug}>
                {pa.name}
              </option>
            ))}
            <option value="general-inquiry">General Legal Advisory / Unlisted Matter</option>
          </select>
          {errors.practiceAreaCategory && (
            <p className="text-xs text-red-600">{errors.practiceAreaCategory.message}</p>
          )}
        </div>

        {/* Enquiry Summary */}
        <div className="space-y-1.5">
          <label htmlFor="enquirySummary" className="block text-xs font-semibold uppercase tracking-wider text-legal-charcoal">
            Brief Summary of Legal Matter <span className="text-red-500">*</span>
          </label>
          <textarea
            id="enquirySummary"
            rows={4}
            {...register('enquirySummary')}
            placeholder="Please outline the key facts, parties involved, and primary relief sought. Do not include highly sensitive banking credentials."
            className="w-full px-4 py-2.5 text-sm bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none transition-colors"
          />
          {errors.enquirySummary && (
            <p className="text-xs text-red-600">{errors.enquirySummary.message}</p>
          )}
        </div>

        {/* Consent Checkbox & Legal Notice */}
        <div className="pt-2 space-y-3">
          <div className="flex items-start gap-2.5">
            <input
              id="consentGiven"
              type="checkbox"
              {...register('consentGiven')}
              className="mt-1 h-4 w-4 rounded border-legal-border text-legal-gold focus:ring-legal-gold"
            />
            <label htmlFor="consentGiven" className="text-xs text-legal-muted leading-relaxed">
              I acknowledge that submitting this form transmits preliminary information for conflict clearance
              purposes only and <strong>does not establish an advocate-client relationship</strong>. I have read
              and agreed to the{' '}
              <a href="/privacy-policy" className="text-legal-gold underline" target="_blank">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.consentGiven && (
            <p className="text-xs text-red-600">{errors.consentGiven.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover disabled:opacity-50 transition-colors rounded-sm shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Securely...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Confidential Enquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
