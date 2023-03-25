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
import UserContext from "../context/UserContext";

const useAuthorizationToken = () => {
  const [user] = React.useContext(UserContext);
  return {
    AUTHORIZATION_HEADER: user?.authToken ?? "",
    USER_ID: user?.id ?? 0,
  };
};

export const loginWithFirebasePOST = (Constants, { accessToken }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/auth/firebase`, {
    body: JSON.stringify({ id_token: accessToken }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useLoginWithFirebasePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    (args) => loginWithFirebasePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("user", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const loginSendCodePOST = (Constants, { phoneNumber }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/Log_In`, {
    body: JSON.stringify({ phoneNumber: phoneNumber }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useLoginSendCodePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    (args) => loginSendCodePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("user", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const FetchLoginSendCodePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  phoneNumber,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useLoginSendCodePOST({ phoneNumber }, { refetchInterval });

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

  return children({ loading, data, error, refetchLoginSendCode: refetch });
};

export const sendVerificationCodePOST = (Constants, { phoneNumber }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/user`, {
    body: JSON.stringify({ phoneNumber: phoneNumber }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useSendVerificationCodePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    (args) => sendVerificationCodePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("user", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const FetchSendVerificationCodePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  phoneNumber,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useSendVerificationCodePOST({ phoneNumber }, { refetchInterval });

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

  return children({
    loading,
    data,
    error,
    refetchSendVerificationCode: refetch,
  });
};

export const verifyCodePOST = (Constants, { token, authToken }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/check_verify`, {
    body: JSON.stringify({ token: token }),
    headers: {
      Accept: "application/json",
      Authorization: authToken ?? Constants["AUTHORIZATION_HEADER"],
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useVerifyCodePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => verifyCodePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("user", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const FetchVerifyCodePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useVerifyCodePOST({ token }, { refetchInterval });

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

  return children({ loading, data, error, refetchVerifyCode: refetch });
};

export const verifyLoginPOST = (Constants, { phoneNumber, token }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/VERIFY_LOG_IN`, {
    body: JSON.stringify({ phoneNumber: phoneNumber, token: token }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useVerifyLoginPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => verifyLoginPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("user", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const FetchVerifyLoginPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  phoneNumber,
  token,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useVerifyLoginPOST({ phoneNumber, token }, { refetchInterval });

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

  return children({ loading, data, error, refetchVerifyLogin: refetch });
};

export const sendDoubleTeamInviteLink = (
  Constants,
  { phoneNumber, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:c9eE1DKe/send_double_team_invite_link`,
    {
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        double_dating_teams_id: double_dating_teams_id,
      }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
    .then((res) => {
      console.log("res sendDoubleTeamInviteLink", res);

      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useSendDoubleTeamInviteLink = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => sendDoubleTeamInviteLink(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDTeamInvite", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDTeamInvite");
        queryClient.invalidateQueries("DDTeamInvite");
      },
    }
  );
};

export const FetchSendDoubleTeamInviteLink = ({
  children,
  onData = () => {},
  refetchInterval,
  phoneNumber,
  double_dating_teams_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useSendDoubleTeamInviteLink(
    { phoneNumber, double_dating_teams_id },
    { refetchInterval }
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

  return children({
    loading,
    data,
    error,
    refetchSendDoubleTeamInviteLink: refetch,
  });
};
