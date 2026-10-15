# Prompts Log

This document records all the user prompts submitted during the development of the Singapore Bus Arrival (SG BusPulse) application.

---

### Prompt 1: Initial App Request
> **Date/Time:** 2026-10-14 23:39 (UTC-7)  
> **Topic:** Frontend Architecture & UI Design

```text
build a singapore based bus arrival time application that tracks real-time bus data and provides accurate wait time predictions for all bus stops.  Build just the front end for now, i will include the backend connection later.
```

---

### Prompt 2: GitHub Repository Push
> **Date/Time:** 2026-10-14 23:46 (UTC-7)  
> **Topic:** Git Initialization & Remote Push

```text
git push http://<GITHUB_PERSONAL_ACCESS_TOKEN>@https://github.com/ehnged/LTA-bus-arrival-agent.git
```
*(Personal access token redacted for security scanning)*

---

### Prompt 3: Serverless Backend Integration (Cancelled Attempt)
> **Date/Time:** 2026-10-14 23:59 (UTC-7)  
> **Topic:** LTA DataMall v3 Endpoint Integration

```text
add a serverless connection that pulls live data from LTA datamall using the following endpoints: GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139
# AccountKey: <LTA_ACCOUNT_KEY>
# accept: application/json
```

---

### Prompt 4: Serverless Connection & Structure Specification
> **Date/Time:** 2026-10-15 00:06 (UTC-7)  
> **Topic:** Root `/api` Directory & Endpoint Architecture

```text
add a serverless connection that pulls live data from LTA datamall using the following endpoints: 

- store this in /api folder (project root level) not the src folder
- include /health.ts and /busarrival.ts within that subfolder
- do not hardcode any key, i will include them later

GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139
AccountKey: <LTA_ACCOUNT_KEY>
accept: application/json
```
*(Account key redacted for security scanning)*

---

### Prompt 5: Prompts Export Request
> **Date/Time:** 2026-10-15 00:54 (UTC-7)  
> **Topic:** Documentation & Prompt History Collection

```text
gather all the prompts that i have written, store them under prompt.md filr
```
