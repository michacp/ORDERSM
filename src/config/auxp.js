const Aux = {};

Aux.convert = async (data) => {
  if (data.findlike == "null") {
    data.findlike = "";
  }

  data.numperpage = Number(data.numperpage);
  data.pagination = Number(data.pagination);
  return data;
};

module.exports = Aux;
