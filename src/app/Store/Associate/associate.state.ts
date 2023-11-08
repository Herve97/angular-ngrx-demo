import { AssociateModel } from '../Model/Associate.model';

export const AssociateState: AssociateModel = {
  list: [],
  associateObj: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'CUSTOMER',
    address: '',
    associategroup: 'level1',
    status: true,
  },
  errorMessage: '',
};
