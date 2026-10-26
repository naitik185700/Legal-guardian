import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/jwt';
import { getEnquiries, updateEnquiryStatus } from '@/lib/services/enquiryService';
import { LeadStatus } from '@/types';

export async function GET() {
  try {
    await requireAdminSession();
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdminSession();
    const body = await req.json();
    const { id, status, staffNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required update fields' }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status as LeadStatus, staffNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Enquiry record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
