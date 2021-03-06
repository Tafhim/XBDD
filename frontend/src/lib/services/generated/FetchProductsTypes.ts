/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from 'ts-interface-checker';
// tslint:disable:object-literal-key-quotes

export const ResponseDataElement = t.iface([], {
  _id: 'string',
  favourite: 'boolean',
  builds: t.array('string'),
  pinned: t.opt(t.array('string')),
  coordinates: t.iface([], {
    product: 'string',
    major: 'number',
    minor: 'number',
    servicePack: 'number',
  }),
});

export const ResponseData = t.array('ResponseDataElement');

const exportedTypeSuite: t.ITypeSuite = {
  ResponseDataElement,
  ResponseData,
};
export default exportedTypeSuite;
