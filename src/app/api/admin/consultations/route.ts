import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/jwt';
import { getConsultations, updateConsultationStatus } from '@/lib/services/consultationService';
import { ConsultationStatus } from '@/types';

export async function GET() {
  try {
    await requireAdminSession();
    const consultations = await getConsultations();
    return NextResponse.json({ success: true, consultations });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();
    const { id, status, staffNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required update fields' }, { status: 400 });
    }

    const updated = await updateConsultationStatus(id, status as ConsultationStatus, staffNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Consultation record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, consultation: updated });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
