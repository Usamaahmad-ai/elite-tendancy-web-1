# Smoke Test Checklist — Elite Tendancy

Run this checklist at the end of each day.

## 1) Build + Deploy
- [ ] `npm run build` passes
- [ ] GitHub Actions workflow succeeds
- [ ] Site resolves on custom domain

## 2) Public Marketplace
- [ ] Homepage loads
- [ ] Listings grid loads
- [ ] Filters return expected results
- [ ] Listing detail page opens
- [ ] Inquiry form submits successfully

## 3) Tenant Flow
- [ ] Tenant signup/login works
- [ ] Save favorite works
- [ ] Viewing request submits
- [ ] Application status visible

## 4) Landlord Flow
- [ ] Landlord signup/login works
- [ ] Create listing works
- [ ] Edit listing works
- [ ] Publish/unpublish works
- [ ] Inquiry appears in inbox

## 5) Admin/Owner CMS
- [ ] Admin login works
- [ ] Moderation queue loads
- [ ] Approve/reject listing works
- [ ] CMS page/post publish works

## 6) Automation
- [ ] Inquiry auto-ack fires
- [ ] Follow-up reminder fires
- [ ] SLA alert fires
- [ ] Automation event logged

## 7) Data + Security
- [ ] DB writes persist correctly
- [ ] Role-based access control works
- [ ] Unauthorized action blocked
- [ ] RLS policies validated

## 8) Performance
- [ ] No white/blank screen routes
- [ ] Search latency acceptable
- [ ] Lighthouse sample run done
