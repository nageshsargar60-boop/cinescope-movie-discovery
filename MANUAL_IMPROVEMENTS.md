# Manual Review and Improvements Log

The following safeguards are present in the current source. Complete the verification column only after performing each test yourself.

| Area | Improvement in source | Test still required |
|---|---|---|
| Missing API key | Shows a clear configuration error instead of failing silently. | Run with missing and valid OMDb keys. |
| Parallel discovery | Uses `Promise.allSettled`, so one seed failure does not discard successful seed results. | Test with a valid key and inspect results. |
| Duplicates | Deduplicates by IMDb ID. | Confirm cards are not duplicated after loading. |
| Poster errors | Displays a fallback for missing or broken poster images. | Test missing/invalid poster responses. |
| Firebase setup | Detects missing config and explains why auth is unavailable. | Configure Firebase and test auth. |
| Favorites scope | Database paths include UID and IMDb ID. | Apply rules and verify isolation using two accounts. |
| Protected route | Signed-out visits to `/favorites` redirect to `/auth`. | Test in a signed-out browser session. |
| Feedback | Loading, empty, and error UI states exist. | Trigger each state. |
| Responsive design | CSS breakpoints cover tablet and mobile. | Test mobile, tablet, and desktop sizes. |

Do not describe a test as passed until you have run it. Record any additional code change, why you made it, and how you verified it.
