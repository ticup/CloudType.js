var CloudTypesClient = require ('./CloudTypesClient');

var CloudTypes = {
  CInt    : require('../shared/CInt'),
  CString : require('../shared/CString'),
  CArray  : require('../shared/CArray'),
  CEntity : require('../shared/CEntity'),

  createClient: function () {
    return new CloudTypesClient();
  }
};

global.CloudTypes = CloudTypes;
module.exports = CloudTypes;