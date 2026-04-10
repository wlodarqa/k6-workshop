import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

import { options as smokeOptions  } from './scenarios/smoke.js';
import { options as loadOptions   } from './scenarios/load.js';
import { options as stressOptions } from './scenarios/stress.js';
import { options as spikeOptions  } from './scenarios/spike.js';

const SCENARIOS = {
  smoke:  smokeOptions,
  load:   loadOptions,
  stress: stressOptions,
  spike:  spikeOptions,
};

const scenarioName = __ENV.SCENARIO || 'smoke';
export const options = SCENARIOS[scenarioName];

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3333';

const pizzaCounter     = new Counter('quickpizza_pizzas_ordered');
const ingredientsTrend = new Trend('quickpizza_ingredients_count', true);
const vegetarianRate   = new Rate('quickpizza_vegetarian_rate');

export function setup() {
  const res = http.get(BASE_URL);
  if (res.status !== 200) {
    throw new Error(`QuickPizza not responding! Status: ${res.status}`);
  }
  console.log(`=== Running scenario: "${scenarioName}" against ${BASE_URL} ===`);
  return { scenario: scenarioName };
}
export default function (data) {
  const restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian:    false,
    excludedIngredients: ['pepperoni'],
    excludedTools:       ['knife'],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2,
  };

  group('Get pizza recommendation', () => {
    const res = http.post(
      `${BASE_URL}/api/pizza`,
      JSON.stringify(restrictions),
      {
        headers: {
          'Content-Type':  'application/json',
          'X-User-ID':     __VU,
          'Authorization': 'token abcdef0123456789',
        },
      }
    );

    const ok = check(res, {
      'status is 200':    (r) => r.status === 200,
      'has pizza name':   (r) => r.json().pizza?.name?.length > 0,
      'has ingredients':  (r) => r.json().pizza?.ingredients?.length >= 2,
    });

    if (ok) {
      const pizza = res.json().pizza;
      pizzaCounter.add(1);
      ingredientsTrend.add(pizza.ingredients.length);
      vegetarianRate.add(pizza.vegetarian === true);
    }
  });

  sleep(1);
}
export function teardown(data) {
  console.log(`=== Scenario "${data.scenario}" finished ===`);
}