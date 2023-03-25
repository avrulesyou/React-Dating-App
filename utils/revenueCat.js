import { Platform, Alert } from "react-native";
import Purchases, { PurchasesOffering } from "react-native-purchases";
import * as GlobalVariables from "../config/GlobalVariableContext";

//** Purchases logIn */
const purchasesLogin = async (loggedUserID) => {
  if (!loggedUserID) {
    return;
  }
  try {
    const logInInfo = await Purchases.logIn(`${loggedUserID}`);
    console.log("logInInfo", logInInfo);
    return logInInfo;
  } catch (e) {
    return Alert.alert("Error identifying user", e.message);
  }
};

//** Purchases logOut*/
const purchasesLogout = async () => {
  try {
    return await Purchases.logOut();
  } catch (e) {
    return Alert.alert("Error logout purchases", e.message);
  }
};

//** Purchases getCustomerInfo*/
const getPurchasesCustomerDetails = async (
  loggedUserID,
  Constants,
  setGlobalVariableValue
) => {
  try {
    setGlobalVariableValue({
      key: "subscription",
      value: "",
    });
    const customerInfo = await Purchases.getCustomerInfo();
    console.log("loggedUserID", loggedUserID);
    await Purchases.getAppUserID();
    if (
      loggedUserID &&
      customerInfo &&
      customerInfo.originalAppUserId !== `${loggedUserID}`
    ) {
      const loginCustomer = await purchasesLogin(loggedUserID);
      if (loginCustomer && loginCustomer.customerInfo) {
        if (
          loginCustomer &&
          typeof loginCustomer.customerInfo.entitlements.active[
            Constants["ENTITLEMENT_ID"]
          ] !== "undefined"
        ) {
          setGlobalVariableValue({
            key: "subscription",
            value:
              loginCustomer.customerInfo.entitlements.active[
                Constants["ENTITLEMENT_ID"]
              ].productIdentifier,
          });
        }
        return loginCustomer.customerInfo;
      }
    }
    if (
      customerInfo &&
      typeof customerInfo.entitlements.active[Constants["ENTITLEMENT_ID"]] !==
        "undefined"
    ) {
      const d = setGlobalVariableValue({
        key: "subscription",
        value:
          customerInfo.entitlements.active[Constants["ENTITLEMENT_ID"]]
            .productIdentifier,
      });
    }
    return customerInfo;
  } catch (e) {
    console.error(e.message);
  }
};

//** Purchases getOfferings*/
const getPurchasesOfferings = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    console.log("offerings122", offerings);
    return offerings;
  } catch (e) {
    return Alert.alert("Error getting offers", e.message);
  }
};

//** Purchases purchasePackage*/
const purchasePackage = async (item) => {
  try {
    const purchaserInfo = await Purchases.purchasePackage(item);
    return purchaserInfo;
  } catch (e) {
    if (!e.userCancelled) {
      return Alert.alert("Error purchasing package", e.message);
    }
  }
};

//** Purchases getRestorePurchases*/
const getRestorePurchases = async () => {
  try {
    const restore = await Purchases.restorePurchases();
    console.log("restore", restore);
    return restore;
  } catch (e) {
    return Alert.alert("Error restore purchases", e.message);
  }
};

export {
  purchasesLogin,
  purchasesLogout,
  getPurchasesCustomerDetails,
  getPurchasesOfferings,
  purchasePackage,
  getRestorePurchases,
};
