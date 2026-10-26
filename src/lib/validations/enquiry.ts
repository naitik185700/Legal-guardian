import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(150, 'Email address is too long'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number cannot exceed 20 digits')
    .regex(/^(\+?\d{1,4}[-\s]?)?(\d{8,14})$/, 'Please enter a valid phone number'),
  preferredContactMethod: z.enum(['EMAIL', 'PHONE', 'WHATSAPP']),
  practiceAreaCategory: z.string().min(1, 'Please select a practice area'),
  enquirySummary: z
    .string()
    .min(15, 'Please provide at least a brief summary (minimum 15 characters)')
    .max(2000, 'Enquiry summary cannot exceed 2000 characters'),
  preferredDate: z.string().optional(),
  consentGiven: z.literal(true, {
    message: 'You must acknowledge the legal notice and privacy policy',
  }),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
