import { dbStore } from '@/lib/db/store';
import { prisma } from '@/lib/db/prisma';
import { EnquiryFormData } from '@/lib/validations/enquiry';
import { EnquiryRecord, LeadStatus } from '@/types';
import { FIRM_CONFIG } from '@/lib/config/firm';

function generateReference(prefix: string = 'GLS-ENQ'): string {
  const timestamp = Date.now().toString().slice(-6);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${rand}`;
}

export async function createEnquiry(
  data: EnquiryFormData,
  ipAddress?: string
): Promise<{ success: boolean; referenceNumber: string; record: EnquiryRecord }> {
  const referenceNumber = generateReference();
  const practiceArea = FIRM_CONFIG.practiceAreas.find(
    (pa) => pa.slug === data.practiceAreaCategory
  );

  const newRecord: EnquiryRecord = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    referenceNumber,
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    preferredContactMethod: data.preferredContactMethod,
    practiceAreaSlug: data.practiceAreaCategory,
    practiceAreaName: practiceArea ? practiceArea.name : data.practiceAreaCategory,
    enquirySummary: data.enquirySummary.trim(),
    preferredDate: data.preferredDate || undefined,
    consentGiven: Boolean(data.consentGiven),
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Try Prisma first if available
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      await prisma.enquiry.create({
        data: {
          id: newRecord.id,
          referenceNumber: newRecord.referenceNumber,
          fullName: newRecord.fullName,
          email: newRecord.email,
          phone: newRecord.phone,
          preferredContactMethod: newRecord.preferredContactMethod,
          practiceAreaSlug: newRecord.practiceAreaSlug,
          enquirySummary: newRecord.enquirySummary,
          preferredDate: newRecord.preferredDate ? new Date(newRecord.preferredDate) : null,
          consentGiven: newRecord.consentGiven,
          status: 'NEW',
          ipAddress: ipAddress || null,
        },
      });
    }
  } catch (err) {
    console.warn('Prisma DB not connected or error, falling back to secure local store:', err);
  }

  // Always persist to local store for reliability & local admin inspection
  dbStore.saveEnquiry(newRecord);
  dbStore.logAction(
    'ENQUIRY_RECEIVED',
    'Enquiry',
    `New enquiry ${referenceNumber} received from ${data.fullName} (${data.practiceAreaCategory})`
  );

  return {
    success: true,
    referenceNumber,
    record: newRecord,
  };
}

export async function getEnquiries(): Promise<EnquiryRecord[]> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      const records = await prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (records && records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          referenceNumber: r.referenceNumber,
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          preferredContactMethod: r.preferredContactMethod as any,
          practiceAreaSlug: r.practiceAreaSlug || undefined,
          practiceAreaName: FIRM_CONFIG.practiceAreas.find((p) => p.slug === r.practiceAreaSlug)?.name || r.practiceAreaSlug || 'General Enquiry',
          enquirySummary: r.enquirySummary,
          preferredDate: r.preferredDate ? r.preferredDate.toISOString() : undefined,
          consentGiven: r.consentGiven,
          status: r.status as LeadStatus,
          staffNotes: r.staffNotes || undefined,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    }
  } catch {}
  return dbStore.getEnquiries();
}

export async function updateEnquiryStatus(
  id: string,
  status: LeadStatus,
  staffNotes?: string
): Promise<EnquiryRecord | null> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      await prisma.enquiry.update({
        where: { id },
        data: {
          status,
          ...(staffNotes !== undefined ? { staffNotes } : {}),
        },
      });
    }
  } catch {}

  const updated = dbStore.updateEnquiry(id, {
    status,
    ...(staffNotes !== undefined ? { staffNotes } : {}),
  });

  if (updated) {
    dbStore.logAction('ENQUIRY_STATUS_UPDATED', 'Enquiry', `Enquiry ${id} updated to ${status}`);
  }

  return updated;
}
