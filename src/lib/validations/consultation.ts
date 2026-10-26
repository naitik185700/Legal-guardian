import { z } from 'zod';

export const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(150, 'Email address is too long'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number cannot exceed 20 digits'),
  practiceAreaSlug: z.string().min(1, 'Please select a practice area'),
  consultationFormat: z.enum(['IN_PERSON_CHAMBERS', 'SECURE_VIDEO_CONFERENCE', 'TELEPHONIC']),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred date')
    .refine((val) => {
      const d = new Date(val);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return !isNaN(d.getTime()) && d >= now;
    }, 'Preferred date must be today or a future date'),
  preferredTimeSlot: z.string().min(1, 'Please select a preferred time slot'),
  caseSummary: z
    .string()
    .min(20, 'Please provide adequate background on your matter (minimum 20 characters)')
    .max(3000, 'Summary cannot exceed 3000 characters'),
  consentGiven: z.literal(true, {
    message: 'You must agree to the consultation intake terms and privacy policy',
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
