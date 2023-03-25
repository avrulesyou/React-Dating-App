import * as React from "react";
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from "react-query";
import useFetch from "react-fetch-hook";
import { useIsFocused } from "@react-navigation/native";
import usePrevious from "../utils/usePrevious";
import * as GlobalVariables from "../config/GlobalVariableContext";

export const reverseGeocodeGET = (Constants, { api_key, lat, long }) =>
  fetch(
    `https://api.geocod.io/v1.7/reverse?api_key=${api_key ?? ""}&limit=1&q=${
      lat ?? ""
    },${long ?? ""}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useReverseGeocodeGET = ({ api_key, lat, long }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://api.geocod.io/v1.7/reverse?api_key=${
      api_key ?? ""
    }&format=simple&limit=1&q=${lat ?? ""},${long ?? ""}`,
    {
      depends: [isFocused],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export const FetchReverseGeocodeGET = ({
  children,
  onData = () => {},
  refetchInterval,
  api_key,
  lat,
  long,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://api.geocod.io/v1.7/reverse?api_key=${
      api_key ?? ""
    }&format=simple&limit=1&q=${lat ?? ""},${long ?? ""}`,
    {
      depends: [isFocused],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error("Fetch error: " + error.status + " " + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchReverseGeocode: refetch });
};
