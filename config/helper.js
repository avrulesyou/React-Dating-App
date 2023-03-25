import React from "react";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const modelAddressFromGeoFormat = (location) => {
  if (location?.results.length) {
    const [firstLocation] = location?.results;
    return {
      accuracy: firstLocation?.accuracy,
      accuracy_type: firstLocation?.accuracy_type,
      address: firstLocation?.formatted_address,
      lat: firstLocation?.location?.lat,
      lng: firstLocation?.location?.lng,
      source: firstLocation?.source,
      city: firstLocation?.address_components?.city,
    };
  }
  return;
};

export const modelAuthCodeToMessage = (authCode) => {
  switch (authCode) {
    case "auth/invalid-verification-code":
      return {
        title: "Invalid Code",
        subTitle: "Please enter valid verification code.",
      };

    case "auth/code-expired":
      return {
        title: "Code has expired",
        subTitle: "Please re-send the verification code to try again.",
      };

    case "auth/invalid-phone-number":
      return {
        title: "Invalid Format",
        subTitle:
          "Please enter your 10 digit phone number, excluding the (+1) country code.",
      };

    case "auth/too-many-requests":
      return {
        title: "Too many requests",
        subTitle:
          "We have blocked all requests from this device due to unusual activity. Try again later.",
      };

    default:
      return {
        title: "Something went wrong",
        subTitle: "Please try again",
      };
  }
};
