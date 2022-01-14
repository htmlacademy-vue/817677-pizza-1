import JwtService from '@/services/jwt.service';
import axios from '@/plugins/axios';
import { getFileName, reverseObject } from '../common/helpers';

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);

    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);

    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);

    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);

    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);

    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();

    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    const { data } = await axios.post('login', params);

    return data;
  }

  async logout() {
    const { data } = await axios.delete('logout');

    return data;
  }

  async getMe() {
    const { data } = await axios.get('whoAmI');

    return data;
  }
}

export class DoughApiService extends CrudApiService {
  constructor(notifier) {
    super('dough', notifier);
  }

  _normalize(dough) {
    return dough.map(doughItem => ({
      ...doughItem,
      value: getFileName(doughItem.image).split('-')[1]
    }));
  }

  async query(config = {}) {
    const dough = await super.query(config);

    return this._normalize(dough);
  }
}

export class MiscApiService extends CrudApiService {
  constructor(notifier) {
    super('misc', notifier);
  }

  _normalize(misc) {
    return misc.map(miscItem => {
      return {
        ...miscItem,
        count: 0
      };
    });
  }

  async query(config = {}) {
    const misc = await super.query(config);

    return this._normalize(misc);
  }
}

export class IngredientsApiService extends CrudApiService {
  constructor(notifier) {
    super('ingredients', notifier);
  }

  _normalize(ingredients) {
    return ingredients.map(ingredient => ({
      ...ingredient,
      value: getFileName(ingredient.image),
      count: 0
    }));
  }

  async query(config = {}) {
    const ingredients = await super.query(config);

    return this._normalize(ingredients);
  }
}

export class SaucesApiService extends CrudApiService {
  constructor(notifier) {
    super('sauces', notifier);
  }

  _normalize(sauces) {
    return sauces.map(sauce => {
      const values = {
        tomato: 'Томатный',
        creamy: 'Сливочный'
      };

      return {
        ...sauce,
        value: reverseObject(values)[sauce.name]
      };
    });
  }

  async query(config = {}) {
    const sauces = await super.query(config);

    return this._normalize(sauces);
  }
}

export class SizesApiService extends CrudApiService {
  constructor(notifier) {
    super('sizes', notifier);
  }

  _normalize(sizes) {
    return sizes.map(size => {
      const multiplieres = {
        1: 'small',
        2: 'normal',
        3: 'big'
      };
      return {
        ...size,
        value: multiplieres[size.multiplier]
      };
    });
  }

  async query(config = {}) {
    const sizes = await super.query(config);

    return this._normalize(sizes);
  }
}

export class AddressesApiService extends CrudApiService {
  constructor(notifier) {
    super('addresses', notifier);
  }

  // _createRequest(address) {
  //   const { ticks, comments, status, timeStatus, user, ...request } = address;
  //
  //   return request;
  // }
}

export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super('orders', notifier);
  }

  _createRequest(order) {
    const { user, pizzas, misc, address } = order;

    const pizzasResult = pizzas.reduce(
      (acc, { name, dough, ingredients, sauce, size, count }) => {
        const ingredientsResult = ingredients
          .filter(({ count }) => count > 0)
          .reduce(
            (acc, { id, count }) => [
              ...acc,
              { ingredientId: id, quantity: count }
            ],
            []
          );

        return [
          ...acc,
          {
            name,
            doughId: dough.id,
            sauceId: sauce.id,
            sizeId: size.id,
            quantity: count,
            ingredients: ingredientsResult
          }
        ];
      },
      []
    );

    const miscResult = misc
      .filter(({ count }) => count > 0)
      .reduce(
        (acc, miscItem) => [
          ...acc,
          { miscId: miscItem.id, quantity: miscItem.count }
        ],
        []
      );

    let addressResult = null;

    if (address) {
      const { id, name, street, building, flat } = address;

      if (address.test === 'new') {
        addressResult = { name, street, building, flat };
      } else {
        addressResult = { id };
      }
    }

    return {
      userId: user.id,
      pizzas: pizzasResult,
      misc: miscResult,
      address: addressResult
    };
  }

  async post(config = {}) {
    return await super.post(this._createRequest(config));
  }
}
