/**
 * Load Cashfree v3 SDK and open popup/modal checkout.
 */

const SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';

let sdkPromise = null;

function loadSdk() {
  if (window.Cashfree) {
    return Promise.resolve(window.Cashfree);
  }
  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        reject(new Error('Cashfree SDK failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Unable to load Cashfree SDK'));
    document.body.appendChild(script);
  });

  return sdkPromise;
}

/**
 * @param {string} paymentSessionId
 * @param {'sandbox'|'production'} environment
 * @returns {Promise<{error?: object, redirect?: boolean, paymentDetails?: object}>}
 */
export async function openCashfreeCheckout(paymentSessionId, environment = 'sandbox') {
  const Cashfree = await loadSdk();
  const mode = environment === 'production' ? 'production' : 'sandbox';
  const cashfree = Cashfree({ mode });

  try {
    return await cashfree.checkout({
      paymentSessionId,
      redirectTarget: '_modal',
    });
  } catch (modalError) {
    // Popup/modal blocked — fall back to same-tab redirect
    console.warn('Cashfree modal failed, falling back to redirect', modalError);
    return cashfree.checkout({
      paymentSessionId,
      redirectTarget: '_self',
    });
  }
}
