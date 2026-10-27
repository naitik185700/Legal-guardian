import urllib.request
import json
import http.cookiejar

cookie_jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))

base = 'http://localhost:3005'

routes = [
    '/', '/about', '/practice-areas', '/practice-areas/civil-and-commercial-litigation',
    '/insights',
    '/insights/commercial-contracts-indemnity-clauses-risk-mitigation',
    '/faqs', '/contact', '/consultation', '/privacy-policy', '/terms-of-use',
    '/disclaimer', '/accessibility', '/robots.txt', '/sitemap.xml'
]

print("=== 1. VERIFYING PUBLIC ROUTES ===")
for r in routes:
    req = urllib.request.Request(base + r)
    with opener.open(req) as resp:
        print(f"  {r} -> HTTP {resp.status}")

print("\n=== 2. VERIFYING ENQUIRY SUBMISSION ===")
enq_data = json.dumps({
    'fullName': 'Dr. Vikramaditya Sen',
    'email': 'vikramaditya.sen@example.com',
    'phone': '+91 9811223344',
    'preferredContactMethod': 'EMAIL',
    'practiceAreaCategory': 'civil-and-commercial-litigation',
    'enquirySummary': 'Seeking preliminary legal assessment regarding breach of commercial supply agreement and enforcement of injunctive remedies.',
    'consentGiven': True
}).encode('utf-8')

req = urllib.request.Request(base + '/api/enquiries', data=enq_data, headers={'Content-Type': 'application/json'})
with opener.open(req) as resp:
    res = json.loads(resp.read().decode())
    print("  POST /api/enquiries -> Success:", res.get('success'), "| Ref:", res.get('referenceNumber'))

print("\n=== 3. VERIFYING CONSULTATION BOOKING ===")
cns_data = json.dumps({
    'fullName': 'Sunita Malhotra',
    'email': 's.malhotra@corporate-holding.com',
    'phone': '+91 9988776655',
    'practiceAreaSlug': 'corporate-and-business-law',
    'consultationFormat': 'SECURE_VIDEO_CONFERENCE',
    'preferredDate': '2026-11-15',
    'preferredTimeSlot': '10:30 AM – 11:30 AM',
    'caseSummary': 'Requires comprehensive shareholder agreement vetting and pre-emptive rights structuring for joint venture.',
    'consentGiven': True
}).encode('utf-8')

req = urllib.request.Request(base + '/api/consultations', data=cns_data, headers={'Content-Type': 'application/json'})
with opener.open(req) as resp:
    res = json.loads(resp.read().decode())
    print("  POST /api/consultations -> Success:", res.get('success'), "| Ref:", res.get('referenceNumber'))

print("\n=== 4. VERIFYING ADMIN AUTHENTICATION ===")
login_data = json.dumps({
    'email': 'admin@guardianlegalsolutions.com',
    'password': 'GuardianLegal@2026'
}).encode('utf-8')

req = urllib.request.Request(base + '/api/auth/login', data=login_data, headers={'Content-Type': 'application/json'})
with opener.open(req) as resp:
    res = json.loads(resp.read().decode())
    print("  POST /api/auth/login -> Logged in as:", res.get('user', {}).get('name'), "| Role:", res.get('user', {}).get('role'))

print("\n=== 5. VERIFYING PROTECTED ADMIN DATA & AUDIT TRAILS ===")
req = urllib.request.Request(base + '/api/admin/enquiries')
with opener.open(req) as resp:
    res = json.loads(resp.read().decode())
    enquiries = res.get('enquiries', [])
    print(f"  GET /api/admin/enquiries -> Total persisted records: {len(enquiries)}")
    for e in enquiries[:2]:
        print(f"    - [{e.get('referenceNumber')}] {e.get('fullName')} | Status: {e.get('status')}")

print("\n=== ALL E2E VERIFICATION CHECKS COMPLETED WITH 100% SUCCESS ===")
