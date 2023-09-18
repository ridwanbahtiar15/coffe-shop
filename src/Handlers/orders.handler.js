const {
  getAll,
  insert,
  update,
  del,
  pagination,
} = require("../Models/orders.model");

const getAllOrders = async (req, res) => {
  try {
    const { query } = req;
    let result;
    if (query.page && query.limit) {
      result = await pagination(query.page, query.limit);
    } else {
      result = await getAll();
    }

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Orders not found!",
        result: [],
      });
    }
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const addNewOrders = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total
    );
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateOrders = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total,
      params.id
    );
    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: `Data has been updated!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { params } = req;
    await del(params.id);
    res.status(200).json({
      msg: `Orders id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
};
