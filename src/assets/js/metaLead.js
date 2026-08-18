/**
 * Meta Pixel + CAPI (`meta_lead`) for Gulp/JS landings.
 *
 * Port of metaLead.ts: two events after Zoho success (`lead` + `meta_lead`),
 * fire-and-forget CAPI, never throw. Hash em/ph/fn only on PHP.
 *
 * HTTP: axios (already in the project). Cookies: js-cookie (already in the project).
 */
import axios from 'axios';
import Cookies from 'js-cookie';
import service from './service.js';

/** Shared event name for GTM (event) + Pixel + CAPI (event_name). */
export const META_LEAD_EVENT = 'meta_lead';

/** Shared CAPI connector for all landings. */
const META_CAPI_URL = 'https://services.goiteens.com/meta/meta-capi.php';

/**
 * Max time the form waits for GTM/Pixel before success/redirect.
 * CAPI does not hold the form: POST starts immediately, we wait at most HANDOFF.
 */
export const META_LEAD_MAX_WAIT_MS = 3000;

/** Catch “request never left” (CORS/network). Do not wait for PHP/Meta. */
const META_CAPI_HANDOFF_MS = 1000;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * After successful Zoho: GTM/Pixel + start CAPI.
 * Never throws. The user only sees an error if Zoho failed in the form.
 */
export async function sendMetaLead(args) {
  const payload = buildMetaLeadPayload(args);

  try {
    const capiPromise = pushMetaLeadToCapi(payload, args);
    const [gtm] = await Promise.all([
      pushMetaLeadToGtm(payload),
      waitAtMost(capiPromise, META_CAPI_HANDOFF_MS),
    ]);

    if (gtm === 'error' || gtm === 'no dataLayer') {
      void reportMetaLeadIssue(`[meta_lead] gtm=${gtm}`, args, payload, { gtm });
    }

    return {
      eventId: payload.event_id,
      gtm,
      payload,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[meta_lead] unexpected error:', error);
    void reportMetaLeadIssue(`[meta_lead] unexpected: ${message}`, args, payload);

    return {
      eventId: payload.event_id,
      gtm: 'error',
      payload,
    };
  }
}

/** Builds meta_lead payload (raw em/ph/fn — hash only on PHP). */
export function buildMetaLeadPayload({ dealId, email, phone, name, ip }) {
  const externalId = toMetaString(dealId) || service.uid();

  return {
    event: META_LEAD_EVENT,
    event_name: META_LEAD_EVENT,
    event_id: `lead_${externalId}`,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    action_source: 'website',
    user_data: {
      em: toMetaString(email).toLowerCase(),
      ph: digitsOnlyPhone(toMetaString(phone)),
      fn: toMetaString(name).toLowerCase(),
      external_id: externalId,
      client_ip_address: toMetaString(ip),
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      fbc: Cookies.get('_fbc') || '',
      fbp: Cookies.get('_fbp') || '',
    },
  };
}

/**
 * Pushes a GTM event and waits for eventCallback (up to 2s) + 2.5s spare.
 * Never throws.
 */
export function pushGtmEvent(eventName, eventData) {
  return new Promise(function (resolve) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      var payload = Object.assign({ event: eventName }, eventData || {}, {
        eventCallback: function () {
          resolve('success');
        },
        eventTimeout: 2000,
      });
      window.dataLayer.push(payload);
      setTimeout(function () {
        resolve('timeout');
      }, 2500);
      return;
    }
    resolve('no dataLayer');
  });
}

// ---------------------------------------------------------------------------
// Channels (GTM + CAPI)
// ---------------------------------------------------------------------------

async function pushMetaLeadToGtm(payload) {
  try {
    const eventName = payload.event;
    const eventData = Object.assign({}, payload);
    delete eventData.event;
    return await pushGtmEvent(eventName, eventData);
  } catch (error) {
    console.error('[meta_lead] GTM push failed:', error);
    return 'error';
  }
}

/**
 * POST to PHP without abort and without waiting for Graph API.
 * HTTP 4xx/5xx / timeout are not reported — PHP finishes Meta and sends Telegram.
 * Telegram from the landing only if the request never left (network, CORS).
 */
async function pushMetaLeadToCapi(payload, args) {
  try {
    await axios.post(META_CAPI_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function () {
        return true;
      },
    });
  } catch (error) {
    if (error && error.response) {
      return;
    }

    console.error('[meta_lead] CAPI unreachable:', error);
    void reportMetaLeadIssue('[meta_lead] capi unreachable', args, payload, {
      capi: 'unreachable',
    });
  }
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

function reportError(message, formData) {
  var errorData = {
    landingUrl: window.location.href,
    errorMessage: message || 'Unknown error',
    userData: formData || {},
    timestamp: new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };

  return fetch('https://errors.goiteens.com/tg/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData),
  }).catch(function (reportingError) {
    console.error('Failed to report error:', reportingError);
  });
}

function reportMetaLeadIssue(message, args, payload, extra) {
  return reportError(
    message,
    Object.assign(
      {
        name: toMetaString(args.name) || undefined,
        email: toMetaString(args.email) || undefined,
        phone: toMetaString(args.phone) || undefined,
        dealId: payload.user_data.external_id,
        event_id: payload.event_id,
      },
      extra || {}
    )
  );
}

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------

function toMetaString(value) {
  if (value == null || value === '') {
    return '';
  }
  return String(value).trim();
}

function digitsOnlyPhone(value) {
  return value.replace(/\D/g, '');
}

function waitAtMost(promise, ms) {
  return new Promise(resolve => {
    const timer = window.setTimeout(() => resolve(), ms);

    promise.then(
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      () => {
        window.clearTimeout(timer);
        resolve();
      }
    );
  });
}
