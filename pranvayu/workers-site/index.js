const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const BACKEND_URL = env.BACKEND_URL;
    const pathname = url.pathname;
    console.log("📥 Request:", pathname);

    // ─── CORS Preflight ───────────────────────────────────────────
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // ─── Jira Proxy: /SEED-XXXX ───────────────────────────────────
    const jiraMatch = pathname.match(/^\/([A-Z]+-\d+)$/);
    if (jiraMatch) {
      const issueKey = jiraMatch[1]; // e.g. "SEED-1356"
      console.log("🎯 Jira request for:", issueKey);

      const JIRA_BASE_URL = "https://seedlingus.atlassian.net";
      const JIRA_EMAIL    = "kavinap@uit.ac.in";
      const JIRA_TOKEN    = env.JIRA_TOKEN;
      const basicAuth     = "Basic " + btoa(`${JIRA_EMAIL}:${JIRA_TOKEN}`);

      // GET — fetch current issue
      if (request.method === "GET") {
        const jiraRes = await fetch(
          `${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`,
          {
            method: "GET",
            headers: {
              "Authorization": basicAuth,
              "Accept": "application/json",
            },
          }
        );
        const data = await jiraRes.json();
        return new Response(JSON.stringify(data), {
          status: jiraRes.status,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }

      // PUT — update issue description
      if (request.method === "PUT") {
        const body = await request.json();
        const jiraRes = await fetch(
          `${JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`,
          {
            method: "PUT",
            headers: {
              "Authorization": basicAuth,
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        // Jira returns 204 No Content on success — no body
        if (jiraRes.status === 204) {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          });
        }

        const errData = await jiraRes.json().catch(() => ({}));
        return new Response(JSON.stringify(errData), {
          status: jiraRes.status,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }
    }

    // ─── Backend API Proxy: /api/* ────────────────────────────────
    if (pathname.startsWith("/api/")) {
      const backendUrl = BACKEND_URL + pathname + url.search;
      console.log("🔁 Proxying to backend:", backendUrl);

      const headers = new Headers(request.headers);
      headers.set("Host", new URL(BACKEND_URL).host);

      const response = await fetch(backendUrl, {
        method: request.method,
        headers,
        body: request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : undefined,
      });

      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    }

    // ─── Static Assets ────────────────────────────────────────────
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }
if (url.pathname === "/latest-ticket") {
  const jiraRes = await fetch(
    "https://seedlingus.atlassian.net/rest/api/3/search?jql=project=SEED ORDER BY created DESC&maxResults=1&fields=key",
    {
      headers: {
        "Authorization": `Basic ${env.JIRA_TOKEN}`,
        "Accept": "application/json",
      },
    }
  );
  const data = await jiraRes.json();
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
    
    console.log(`⚠️ Asset not found: ${pathname}, serving index.html`);
    return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
  },
  
};