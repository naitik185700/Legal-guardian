export type AdminRole = 'SUPER_ADMIN' | 'PARTNER' | 'ASSOCIATE' | 'INTAKE_OFFICER';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'CONSULTATION_REQUESTED' | 'IN_PROGRESS' | 'CLOSED';

export type ConsultationStatus = 'REQUESTED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';

export type ConsultationFormat = 'IN_PERSON_CHAMBERS' | 'SECURE_VIDEO_CONFERENCE' | 'TELEPHONIC';

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface EnquiryRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'WHATSAPP';
  practiceAreaSlug?: string;
  practiceAreaName?: string;
  enquirySummary: string;
  preferredDate?: string;
  consentGiven: boolean;
  status: LeadStatus;
  staffNotes?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  practiceAreaSlug: string;
  practiceAreaName?: string;
  consultationFormat: ConsultationFormat;
  preferredDate: string;
  preferredTimeSlot: string;
  caseSummary: string;
  consentGiven: boolean;
  status: ConsultationStatus;
  staffNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  readingTime: string;
  category: string;
  authorName: string;
  authorDesignation: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}
