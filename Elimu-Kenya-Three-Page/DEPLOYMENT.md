# Deployment and integration status

## Render
1. Unzip this package and push its contents to a separate Git repository.
2. In Render, create a Blueprint from that repository. The render.yaml file builds a static site into dist.
3. Alternatively choose Static Site, build command `npm run check && npm run build`, publish directory `dist`.
4. Open the deployed site and check the application and payment availability pages on mobile and desktop.

No paid dependency or external font is required. All supplied photos are included.

## Supabase
This package does not pretend to have an active backend. Payment collection and live application submission remain disabled. No Supabase credentials are embedded.
For a future authenticated integration, use a separate Supabase project per site and run the optional migration under supabase/migrations on a fresh project. It creates private draft storage with owner-only access. A sign-in flow and application API still need implementation before the browser can use that table. The migration does not connect the frontend by itself.

The existing prototype is not a live funding service. Before enabling submissions, establish the programme operator, privacy notice, eligibility rules and approved fee policy. Use a trusted server payment integration with authenticated users, server-calculated fees, webhook signature validation, idempotency, provider reconciliation and refund handling. An SMS code or elapsed timer must never mark a payment as verified.

Never place a Supabase service-role key or payment secret in a public JS file, static build or Git repository. Render static-site environment variables do not create a private backend.

## Existing deployments
The unsafe legacy KMTC anonymous RPC schema is not included in this package. If it was previously installed, disable its anonymous function grants and audit access in that project before using it further. This package's migration is for a fresh project and does not repair previously deployed schemas.

## Verification
Run `npm run check` and `npm run build`. Test payment selection: the chosen method opens its own notice, selecting a different method closes the previous notice, and selecting it again toggles it. Keyboard focus and reduced-motion preferences are supported. There is no automatic payment-success path.

## Three-page flow
The overview is index.html. Every Apply bursary link opens apply.html, which runs application.js independently from the overview slideshow. After field validation and review, the final button navigates to pay.html. Payment notices and instructions are unchanged. No real application is submitted. Existing saved drafts remain local to the same browser and origin. Supabase live integration is still pending as described above.
