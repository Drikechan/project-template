
import Vue from 'vue';
import App from './App.vue';

//加入sentry捕获错误
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";




Sentry.init({
    Vue,
    dsn: "https://d4dda66dc9554215ad7007aefa155c0d@o1116963.ingest.sentry.io/6150848",
    integrations: [
        new Integrations.BrowserTracing({
            // routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});




new Vue({

    render: h => h(App)
  }).$mount('#container')
