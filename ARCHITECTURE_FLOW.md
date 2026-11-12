# ARCHITECTURE_FLOW.md (Visual System State)

```mermaid
graph TD
    Client[Web Browser / Capacitor Android App] -->|HTTPS Requests| CloudRun[Google Cloud Run Server :8080]
    Crawler[Googlebot / Bingbot / AhrefsBot] -->|Crawl Requests| CloudRun
    Client -->|Auth / Session Storage| SupabaseAuth[Supabase Auth & Database]
    Client -->|Realtime Backup / User Profiles| Firestore[Firebase Cloud Firestore]

    subgraph SEO_SSR_Prerendering [Server-Side Micro-Prerendering & Structured Data Engine]
        CloudRun --> SeoCheck{Crawlable Route?}
        SeoCheck -->|Yes: Products/Techs/Hubs/Policies| InjectMeta[seoHelper: injectSeoMetadata]
        InjectMeta --> SchemaGraph[JSON-LD @graph: WebSite / LocalBusiness / MobileApplication / Product / Person / Breadcrumbs / Policies]
        SchemaGraph --> SendHtml[Serve Pre-populated HTML with single server-prerender-schema]
        SendHtml --> ClientHydration[Client Mount: SEOHead purges server-prerender-schema, activates smartrun-dynamic-jsonld]
        SeoCheck -->|No / Static Asset / API| NextHandler[Standard Vite/Static or API Route]
        CloudRun --> SitemapGen[GET /sitemap.xml: Dynamic Catalog + Technician Sitemap]
        CloudRun --> RssGen[GET /rss.xml: RSS 2.0 Syndication Feed]
        CloudRun --> AiOpenApi[GET /api/ai/openapi.json & /.well-known/assetlinks.json]
    end

    subgraph App_Discovery_Tracking [Web-to-App & GA4 G-E3TVJRTKRP Attribution]
        Client -->|Play Store CTAs: Footer/Modal/About/Sitemap| PlayStore[Google Play Listing in.smartrun.app]
        Client -->|Share Product Link| ShareHelper[shareProduct: smartrun.in/electrical or construction/product/:id]
        Client -->|Analytics Events| GA4[Google Analytics 4: G-E3TVJRTKRP]
        PlayStore -->|HTTPS autoVerify smartrun.in| AndroidApp[Capacitor MainActivity + network_security_config.xml]
    end

    subgraph Server_APIs [Cloud Run Server Routes]
        CloudRun --> AuthLogout[/api/auth/logout - Server Cookie Clearance/]
        CloudRun --> ResolveUser[/api/auth/resolve-phone-user/]
        CloudRun --> EmailRoutes[/api/send-email & /api/auth/send-welcome-email/]
        CloudRun --> SecurityRoutes[/api/auth/login-notification/]
    end

    subgraph Email_Dispatch_Gateways [Dedicated Resend Senders]
        EmailRoutes -->|Onboarding Welcome| WelcomeSender[welcome@smartrun.in]
        EmailRoutes -->|Order Status & PDF Invoice| OrderSender[order@smartrun.in]
        SecurityRoutes -->|Device & Security Alert| AlertSender[alert@smartrun.in]
    end

    subgraph Client_SignOut_Purge [Instant Logout Flow (<500ms)]
        Client --> ClearState[flushSync: UserProfile=null, Auth=false]
        Client --> NavigateLogin[navigate to /login]
        Client --> PurgeStorage[Clear localStorage, sessionStorage, caches, IndexedDB, cookies, Preferences]
    end
```

