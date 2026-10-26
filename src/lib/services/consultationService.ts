import { dbStore } from '@/lib/db/store';
import { prisma } from '@/lib/db/prisma';
import { ConsultationFormData } from '@/lib/validations/consultation';
import { ConsultationRecord, ConsultationStatus, ConsultationFormat } from '@/types';
import { FIRM_CONFIG } from '@/lib/config/firm';

function generateReference(prefix: string = 'GLS-CNS'): string {
  const timestamp = Date.now().toString().slice(-6);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${rand}`;
}

export async function createConsultation(
  data: ConsultationFormData,
  ipAddress?: string
): Promise<{ success: boolean; referenceNumber: string; record: ConsultationRecord }> {
  const referenceNumber = generateReference();
  const practiceArea = FIRM_CONFIG.practiceAreas.find(
    (pa) => pa.slug === data.practiceAreaSlug
  );

  const newRecord: ConsultationRecord = {
    id: `cns_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    referenceNumber,
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    practiceAreaSlug: data.practiceAreaSlug,
    practiceAreaName: practiceArea ? practiceArea.name : data.practiceAreaSlug,
    consultationFormat: data.consultationFormat as ConsultationFormat,
    preferredDate: data.preferredDate,
    preferredTimeSlot: data.preferredTimeSlot,
    caseSummary: data.caseSummary.trim(),
    consentGiven: Boolean(data.consentGiven),
    status: 'REQUESTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      await prisma.consultationRequest.create({
        data: {
          id: newRecord.id,
          referenceNumber: newRecord.referenceNumber,
          fullName: newRecord.fullName,
          email: newRecord.email,
          phone: newRecord.phone,
          practiceAreaSlug: newRecord.practiceAreaSlug,
          consultationFormat: newRecord.consultationFormat,
          preferredDate: new Date(newRecord.preferredDate),
          preferredTimeSlot: newRecord.preferredTimeSlot,
          caseSummary: newRecord.caseSummary,
          consentGiven: newRecord.consentGiven,
          status: 'REQUESTED',
          ipAddress: ipAddress || null,
        },
      });
    }
  } catch (err) {
    console.warn('Prisma DB fallback to local store for consultation:', err);
  }

  dbStore.saveConsultation(newRecord);
  dbStore.logAction(
    'CONSULTATION_REQUESTED',
    'Consultation',
    `Consultation request ${referenceNumber} logged for ${data.fullName} (${data.preferredDate} ${data.preferredTimeSlot})`
  );

  return {
    success: true,
    referenceNumber,
    record: newRecord,
  };
}

export async function getConsultations(): Promise<ConsultationRecord[]> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      const records = await prisma.consultationRequest.findMany({
        orderBy: { preferredDate: 'desc' },
      });
      if (records && records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          referenceNumber: r.referenceNumber,
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          practiceAreaSlug: r.practiceAreaSlug || '',
          practiceAreaName:
            FIRM_CONFIG.practiceAreas.find((p) => p.slug === r.practiceAreaSlug)?.name ||
            r.practiceAreaSlug ||
            'General Consultation',
          consultationFormat: r.consultationFormat as ConsultationFormat,
          preferredDate: r.preferredDate.toISOString().split('T')[0],
          preferredTimeSlot: r.preferredTimeSlot,
          caseSummary: r.caseSummary,
          consentGiven: r.consentGiven,
          status: r.status as ConsultationStatus,
          staffNotes: r.staffNotes || undefined,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    }
  } catch {}
  return dbStore.getConsultations();
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus,
  staffNotes?: string
): Promise<ConsultationRecord | null> {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
      await prisma.consultationRequest.update({
        where: { id },
        data: {
          status,
          ...(staffNotes !== undefined ? { staffNotes } : {}),
        },
      });
    }
  } catch {}

  const updated = dbStore.updateConsultation(id, {
    status,
    ...(staffNotes !== undefined ? { staffNotes } : {}),
  });

  if (updated) {
    dbStore.logAction('CONSULTATION_STATUS_UPDATED', 'Consultation', `Consultation ${id} set to ${status}`);
  }

  return updated;
}
