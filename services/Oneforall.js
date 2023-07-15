// business logic
import axios from "axios";

const host = "https://recreate-backend-server.onrender.com";

const line = () => {
  return console.log(
    "---------------------------------------------------------------------"
  );
};

export const loginServices = async (data) => {
  console.log("data: ", data);
  const url = "/login";
  const link = host + url;

  try {
    const result = await axios.post(link, data);
    console.log("result: ", result.data);
    if (result.data.logUser) {
      const response = result.data.logUser;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const userSignUpServices = async (data) => {
  console.log("data: ", data);

  try {
    const url = "/signupUser";
    const link = host + url;

    const result = await axios.post(link, data);
    console.log("result.data.error: ", result.data);
    if (!result.data.error) {
      const response = result.data;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const editUserPassService = async ({ _id, headers, newPass }) => {
  try {
    const url = `/editPasswordUser/${_id}`;
    const link = host + url;

    const password = newPass;

    const body = { password };

    const result = await axios.put(link, body, headers);
    console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const workerSignupServices = async (data) => {
  console.log("data: ", data);
  try {
    const url = "/signupWorker";
    const link = host + url;

    const result = await axios.post(link, data);
    console.log("result: ", result.data);
    if (!result.data.error) {
      const response = result.data;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error: ", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getAllServicesApi = async () => {
  try {
    const url = "/getAllservices";
    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const newlyService = [];

    const theData = response.data.allServices;
    // console.log("theData: ", theData);

    theData.map((item) => {
      console.log("------------------------------------------------");
      console.log("item the data: ", item);
      if (!item.service) {
        console.log("service not found");
        console.log("item launched service :", item.launchedService);
        newlyService.push(item);
      }
    });

    // console.log("newlyService: ", newlyService);

    return { newlyService };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const editWorkerPassService = async ({ _id, headers, newPass }) => {
  try {
    const url = `/editPasswordWorker/${_id}`;
    const link = host + url;

    const password = newPass;

    const body = { password };

    const result = await axios.put(link, body, headers);
    console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// exceptional
export const getServicesForClickedApi = async () => {
  try {
    const url = "/getAllservices";
    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const newlyService = [];

    const theData = response.data.allServices;
    // console.log("theData: ", theData);

    theData.map((item) => {
      // console.log("item: ", item);
      if (!item.service) {
        console.log("service not found");
        console.log("item launched service :", item.launchedService);
        newlyService.push(item);
      }
    });

    // console.log("newlyService: ", newlyService);

    return { theData };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getSearchServiceApi = async ({ searchService }) => {
  console.log("searchService: ", searchService);
  try {
    const url = `/getSearchService/${searchService}`;

    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    const { isFoundLaunchedService, isFoundService } = response.data;
    // console.log("isFoundLaunchedService: ", isFoundLaunchedService);
    // console.log("isFoundService: ", isFoundService);

    return { isFoundLaunchedService, isFoundService };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getServiceCatgeory = async ({ serviceName }) => {
  try {
    const url = `/getSearchService/${serviceName}`;
    const link = host + url;
    const response = await axios.get(link);
    console.log("response: ", response);
    // console.log("carpenters: ", response.data.isFoundService);
    const { isFoundService } = response.data;

    return { isFoundService };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const getAllUsersOrder = async ({ headers }) => {
  try {
    const url = "/getMyOrders";
    const link = host + url;

    const response = await axios.get(link, headers);

    const { error } = response.data;

    if (error) {
      return { error };
    }

    const { orders } = response.data;

    return { orders };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const bookService = async ({
  headers,
  serviceId,
  request,
  serviceName,
  bookedDate,
}) => {
  try {
    const url = "/bookService";
    const link = host + url;

    if (serviceId) {
      const data = { service: serviceId, bookedDate };

      const response = await axios.post(link, data, headers);

      console.log("response.data: ", response.data);

      const { newBookedService, error } = response.data;

      if (error) {
        return { error };
      }

      return { newBookedService };
    } else if (request) {
      const data = { request, serviceName, bookedDate };

      const response = await axios.post(link, data, headers);

      const { newBookedService, error } = response.data;

      if (error) {
        return { error };
      }

      return { newBookedService };
    }
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const deleteMyOrderService = async ({ _id, headers }) => {
  try {
    const url = `/deleteMyOrder/${_id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);
    console.log("response.data: ", response.data);

    const { success, error } = response.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const workerOrderService = async ({ headers }) => {
  try {
    const url = "/getUserOrders";
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response - services: ", response.data);

    const { workerOrders, error } = response.data;

    if (error) {
      return { error };
    }

    return { workerOrders };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const getWorkerAcceptedOrder = async ({ headers }) => {
  try {
    const url = "/getWorkerOrderById";
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response: ", response.data);

    const { workerOrders, error } = response.data;

    if (error) {
      return { error };
    }

    return { workerOrders };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const acceptUserOrder = async ({ headers, id, visitDate }) => {
  try {
    const url = `/acceptOrder/${id}`;
    const link = host + url;

    const body = { visitDate };

    const resposne = await axios.put(link, body, headers);

    const { error, acceptOrder } = resposne.data;

    if (error) {
      return { error };
    }

    return { acceptOrder };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const getAllOtpsService = async ({ headers }) => {
  try {
    const url = "/getOtpUser";
    const link = host + url;

    const response = await axios.get(link, headers);

    const { error } = response.data;

    if (error) {
      return { error };
    }

    const { allOtps } = response.data;

    return { allOtps };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const verifyOtpServices = async ({
  orderid,
  userid,
  checkOtp,
  headers,
}) => {
  try {
    const url = `/verifyOtp`;
    const link = host + url;

    const otp = Number(checkOtp);

    const body = { orderid, userid, otp };

    const resposne = await axios.put(link, body, headers);

    const { verified, error } = resposne.data;

    if (error) {
      return { error };
    }

    return { verified };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const workDoneApi = async ({ headers, id, orderStatus }) => {
  try {
    const url = `/onWorkCompleted/${id}`;
    const link = host + url;

    const body = { orderStatus };

    const resposne = await axios.put(link, body, headers);

    const { error, acceptOrder } = resposne.data;

    if (error) {
      return { error };
    }

    return { acceptOrder };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const changeDateApi = async (headers, _id, bookedDate) => {
  try {
    const url = `/cancelOrder`;
    const link = host + url;

    const body = { _id, bookedDate };

    const resposne = await axios.put(link, body, headers);

    const { error, success } = resposne.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

// worker
export const getAllPaymentService = async ({ headers }) => {
  try {
    const url = "/getAllPaymentUser";
    const link = host + url;

    const response = await axios.get(link, headers);

    const { error, allPayments } = response.data;

    if (error) {
      return { error };
    }

    return { allPayments };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const askForPaymentService = async (
  serviceCost,
  userId,
  _id,
  serviceId,
  headers
) => {
  console.log("serviceId: ", serviceId);

  try {
    const url = `/askForPayment/${_id}`;
    const link = host + url;

    const data = {
      userId,
      serviceCost,
      serviceId,
      paymentInfo: "pending",
    };

    const reply = await axios.post(link, data, headers);

    const { success, error } = reply.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const askForPaymentRequest = async (
  serviceCost,
  userId,
  _id,
  headers
) => {
  try {
    const url = `/askForPayment/${_id}`;
    const link = host + url;

    const data = {
      userId,
      serviceCost,
      paymentInfo: "pending",
    };

    const reply = await axios.post(link, data, headers);

    const { success, error } = reply.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

//user payment
export const createPayemntIntentService = async ({ amount, headers }) => {
  try {
    const url = `/paymentIntent`;
    const link = host + url;

    const data = { amount };

    const reply = await axios.post(link, data, headers);

    const { paymentIntent, error } = reply.data;

    if (error) {
      return { error };
    }

    return { paymentIntent };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const payAmountService = async (_id, headers) => {
  console.log("payAmountService called: ");
  try {
    const url = `/payAmount/${_id}`;

    const link = host + url;

    const data = { paymentInfo: "paid" };

    const resposne = await axios.put(link, data, headers);

    const { success, error } = resposne.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const getWalletService = async ({ headers }) => {
  try {
    const url = `/getBalance`;
    const link = host + url;

    const reply = await axios.get(link, headers);

    const { error, myBalance } = reply.data;

    if (error) {
      return { error };
    }

    return { myBalance };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const createWalletIntentService = async ({ amount, headers }) => {
  try {
    const url = `/walletIntentWorker`;
    const link = host + url;

    const data = { amount };

    const reply = await axios.post(link, data, headers);

    const { paymentIntent, error } = reply.data;

    if (error) {
      return { error };
    }

    return { paymentIntent };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};
export const withdrawAmtService = async ({ headers, amount }) => {
  try {
    const url = `/withdrawAmount`;
    const link = host + url;

    const data = {
      withdrawlAmt: Number(amount),
    };

    const reply = await axios.put(link, data, headers);

    const { error, success } = reply.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

// >>>>>>>>>>>>> feedback

export const postFeedbackUserApi = async ({ headers, feedback }) => {
  try {
    const url = `/postUserFeedback`;
    const link = host + url;

    const data = { feedback };

    const response = await axios.post(link, data, headers);

    const { feed, error } = response.data;
    console.log("response.data: ", response.data);

    if (error) {
      return { error };
    }

    return { feed };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postFeedbackWorkerApi = async ({ headers, feedback }) => {
  try {
    const url = `/postWorkerFeedback`;
    const link = host + url;

    const data = { feedback };

    const response = await axios.post(link, data, headers);

    const { feed, error } = response.data;
    console.log("response.data: ", response.data);

    if (error) {
      return { error };
    }

    return { feed };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>> user complaint
export const postCompaintUserApi = async ({ headers, complaint }) => {
  try {
    const url = `/postUserComplaints`;
    const link = host + url;

    const data = { complaint };

    const response = await axios.post(link, data, headers);

    const { addComplaint, error } = response.data;

    if (error) {
      return { error };
    }

    return { addComplaint };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getComplaintUserApi = async ({ headers }) => {
  try {
    const url = `/getUserComplaints`;
    const link = host + url;

    const response = await axios.get(link, headers);

    const { myComplaints, error } = response.data;

    if (error) {
      return { error };
    }

    return { myComplaints };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteComplaintUserApi = async ({ id, headers }) => {
  try {
    const url = `/deleteUserComplaints/${id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);

    const { feedDeleted, error } = response.data;

    if (error) {
      return { error };
    }

    return { feedDeleted };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>> worker complaint
export const postCompaintWorkerApi = async ({ headers, complaint }) => {
  try {
    const url = `/postWorkerComplaints`;
    const link = host + url;

    const data = { complaint };

    const response = await axios.post(link, data, headers);

    const { addComplaint, error } = response.data;

    if (error) {
      return { error };
    }

    return { addComplaint };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getComplaintWorkerApi = async ({ headers }) => {
  try {
    const url = `/getWorkerComplaints`;
    const link = host + url;

    const response = await axios.get(link, headers);

    const { myComplaints, error } = response.data;
    console.log("response.data: ", response.data);
    console.log("myComplaints: ", myComplaints);

    if (error) {
      return { error };
    }

    return { myComplaints };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteComplaintWorkerApi = async ({ id, headers }) => {
  try {
    const url = `/deleteWorkerComplaints/${id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);

    const { feedDeleted, error } = response.data;

    if (error) {
      return { error };
    }

    return { feedDeleted };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};
