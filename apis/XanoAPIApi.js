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
import StorageUtils from "../services/storage";
import UserContext from "../context/UserContext";

const useAuthorizationToken = () => {
  const [user] = React.useContext(UserContext);
  return {
    AUTHORIZATION_HEADER: user?.authToken ?? "",
    USER_ID: user?.id ?? 0,
  };
};

export const ddUserImageListPOST = (
  Constants,
  {
    double_dating_teams_id,
    group_photo1,
    group_photo2,
    group_photo3,
    group_photo4,
    group_photo5,
    group_photo6,
  }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/ImageList/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
        group_photo1,
        group_photo2,
        group_photo3,
        group_photo4,
        group_photo5,
        group_photo6,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useDDUserImageListPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => ddUserImageListPOST(Constants, { ...initialArgs, ...args }),
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

export const userImageListPOST = (
  Constants,
  {
    featured_photo,
    profilePic2,
    profilePic3,
    ProfilePic4,
    ProfilePic5,
    ProfilePic6,
  }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/ImageList/{user_id}`,
    {
      body: JSON.stringify({
        featured_photo,
        profilePic2,
        profilePic3,
        ProfilePic4,
        ProfilePic5,
        ProfilePic6,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useUserImageListPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => userImageListPOST(Constants, { ...initialArgs, ...args }),
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

export const isUserEnabledLocationPOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/isLocationEnabled/{user_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useIsUserEnabledLocationPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => isUserEnabledLocationPOST(Constants, { ...initialArgs, ...args }),
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

export const userDateOfBirthPOST = (Constants, { dateOfBirth }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/dateOfBirth/{user_id}`,
    {
      body: JSON.stringify({ dateOfBirth }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useUserDateOfBirthPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => userDateOfBirthPOST(Constants, { ...initialArgs, ...args }),
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

export const DDTeamCompleteProfilePOST = (
  Constants,
  { double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/isProfileComplete/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDTeamCompleteProfilePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDTeamCompleteProfilePOST(Constants, { ...initialArgs, ...args }),
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

export const isUserIdVerifiedPOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/isIdVerified/{user_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useIsUserIdVerifiedPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => isUserIdVerifiedPOST(Constants, { ...initialArgs, ...args }),
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

export const userTeamLocationPOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/location/{double_dating_teams_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useUserTeamLocationPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => userTeamLocationPOST(Constants, { ...initialArgs, ...args }),
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

export const DDReportTeamPOST = (
  Constants,
  { double_dating_teams_id, double_dating_teams2_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/report/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ double_dating_teams2_id }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDReportTeamPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDReportTeamPOST(Constants, { ...initialArgs, ...args }),
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

export const reportUserPOST = (Constants, { user2_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/report/{user_id}`,
    {
      body: JSON.stringify({ user2_id }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useReportUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => reportUserPOST(Constants, { ...initialArgs, ...args }),
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

export const chatUnmatchUserPOST = (Constants, { user2_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/unmatch/{user_id}`,
    {
      body: JSON.stringify({ user2_id }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useChatUnmatchUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => chatUnmatchUserPOST(Constants, { ...initialArgs, ...args }),
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

export const chatBlockUserPOST = (Constants, { user2_id }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/block/{user_id}`, {
    body: JSON.stringify({ user2_id }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useChatBlockUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => chatBlockUserPOST(Constants, { ...initialArgs, ...args }),
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

export const DDChatUnmatchUserPOST = (
  Constants,
  { double_dating_teams_id, user_id, user2_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/unmatch/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ user_id, user2_id }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDChatUnmatchUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDChatUnmatchUserPOST(Constants, { ...initialArgs, ...args }),
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

export const DDChatBlockUserPOST = (
  Constants,
  { double_dating_teams_id, user_id, user2_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/block/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ user_id, user2_id }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDChatBlockUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDChatBlockUserPOST(Constants, { ...initialArgs, ...args }),
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

export const checkedVisitedBeforePOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/is_visited_before/{user_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const arePromptsCompletedGET = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/prompts/{user_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useArePromptsCompletedGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(
    ["user", args],
    () => arePromptsCompletedGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    }
  );
};

export const FetchArePromptsCompletedGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useArePromptsCompletedGET(
    {},
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
    refetchArePromptsCompleted: refetch,
  });
};

export const checkDDPhotosGET = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/photo_check/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useCheckDDPhotosGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["DDteam", args], () => checkDDPhotosGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["DDteams"]),
  });
};

export const FetchCheckDDPhotosGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useCheckDDPhotosGET(
    { double_dating_teams_id },
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

  return children({ loading, data, error, refetchCheckDDPhotos: refetch });
};

export const checkUserPhotoUploadPOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/check_photos/{user_id}`,
    {
      body: JSON.stringify({ key: "value" }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useCheckUserPhotoUploadPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => checkUserPhotoUploadPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchCheckUserPhotoUploadPOST = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCheckUserPhotoUploadPOST({}, { refetchInterval });

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
    refetchCheckUserPhotoUpload: refetch,
  });
};

export const completeProfilePOST = (Constants, { isProfileComplete }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/complete/{user_id}`,
    {
      body: JSON.stringify({ isProfileComplete }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useCompleteProfilePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => completeProfilePOST(Constants, { ...initialArgs, ...args }),
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

export const FetchCompleteProfilePOST = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCompleteProfilePOST({}, { refetchInterval });

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

  return children({ loading, data, error, refetchCompleteProfile: refetch });
};

export const dDEditProfileUpdatePOST = (
  Constants,
  { bio, double_dating_teams_id, group_sexual_interest }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/edit_profile/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
        double_dating_teams_id: double_dating_teams_id,
        bio: bio,
        group_sexual_interest: group_sexual_interest,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useDDEditProfileUpdatePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => dDEditProfileUpdatePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchDDEditProfileUpdatePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  bio,
  double_dating_teams_id,
  group_sexual_interest,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useDDEditProfileUpdatePOST(
    { bio, double_dating_teams_id, group_sexual_interest },
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
    refetchDDEditProfileUpdate: refetch,
  });
};

export const dDPromptsCheckGET = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/prompts_check/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useDDPromptsCheckGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["DDteam", args], () => dDPromptsCheckGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["DDteams"]),
  });
};

export const FetchDDPromptsCheckGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useDDPromptsCheckGET(
    { double_dating_teams_id },
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

  return children({ loading, data, error, refetchDDPromptsCheck: refetch });
};

export const deleteTeamDELETE = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "DELETE",
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

export const useDeleteTeamDELETE = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => deleteTeamDELETE(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const deleteUserDELETE = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/account/{user_id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "DELETE",
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

export const useDeleteUserDELETE = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => deleteUserDELETE(Constants, { ...initialArgs, ...args }),
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

export const deleteUser$PhoneNumberOnboarding$DELETE = (
  Constants,
  { phoneNumber }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/${phoneNumber ?? ""}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
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

export const useDeleteUser$PhoneNumberOnboarding$DELETE = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) =>
      deleteUser$PhoneNumberOnboarding$DELETE(Constants, {
        ...initialArgs,
        ...args,
      }),
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

export const dislikeDDTeamPOST = (
  Constants,
  { double_dating_teams2_id, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_dislikes`,
    {
      body: JSON.stringify({
        double_dating_teams_id: double_dating_teams_id,
        double_dating_teams2_id: double_dating_teams2_id,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useDislikeDDTeamPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => dislikeDDTeamPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchDislikeDDTeamPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams2_id,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useDislikeDDTeamPOST(
    { double_dating_teams2_id, double_dating_teams_id },
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

  return children({ loading, data, error, refetchDislikeDDTeam: refetch });
};

export const dislikeUserPOST = (Constants, { user2_id }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/dislikes`, {
    body: JSON.stringify({ user2_id: user2_id }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useDislikeUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => dislikeUserPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("dislikes", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("dislike");
        queryClient.invalidateQueries("dislikes");
      },
    }
  );
};

export const FetchDislikeUserPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  user2_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useDislikeUserPOST({ user2_id }, { refetchInterval });

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

  return children({ loading, data, error, refetchDislikeUser: refetch });
};

export const editDDSettingsPOST = (
  Constants,
  {
    double_dating_teams_id,
    group_distance_preference,
    group_maximum_age,
    group_minimum_age,
  }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/settings/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
        double_dating_teams_id: double_dating_teams_id,
        group_minimum_age: group_minimum_age,
        group_maximum_age: group_maximum_age,
        group_distance_preference: group_distance_preference,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useEditDDSettingsPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => editDDSettingsPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchEditDDSettingsPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
  group_distance_preference,
  group_maximum_age,
  group_minimum_age,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useEditDDSettingsPOST(
    {
      double_dating_teams_id,
      group_distance_preference,
      group_maximum_age,
      group_minimum_age,
    },
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

  return children({ loading, data, error, refetchEditDDSettings: refetch });
};

export const editDDPromptsPOST = (
  Constants,
  {
    double_dating_teams_id,
    group_prompt1,
    group_prompt1_response,
    group_prompt2,
    group_prompt2_response,
    group_prompt3,
    group_prompt3_response,
  }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/prompts/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
        double_dating_teams_id: double_dating_teams_id,
        group_prompt1: group_prompt1,
        group_prompt2: group_prompt2,
        group_prompt3: group_prompt3,
        group_prompt1_response: group_prompt1_response,
        group_prompt2_response: group_prompt2_response,
        group_prompt3_response: group_prompt3_response,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useEditDDPromptsPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => editDDPromptsPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchEditDDPromptsPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
  group_prompt1,
  group_prompt1_response,
  group_prompt2,
  group_prompt2_response,
  group_prompt3,
  group_prompt3_response,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useEditDDPromptsPOST(
    {
      double_dating_teams_id,
      group_prompt1,
      group_prompt1_response,
      group_prompt2,
      group_prompt2_response,
      group_prompt3,
      group_prompt3_response,
    },
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

  return children({ loading, data, error, refetchEditDDPrompts: refetch });
};

export const editProfileUserPOST = (
  Constants,
  { bio, gender, job_title, sexual_interest }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/edit_profile/{user_id}`,
    {
      body: JSON.stringify({
        job_title: job_title,
        bio: bio,
        gender: gender,
        sexual_interest: sexual_interest,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useEditProfileUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => editProfileUserPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchEditProfileUserPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  bio,
  gender,
  job_title,
  sexual_interest,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useEditProfileUserPOST(
    { bio, gender, job_title, sexual_interest },
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

  return children({ loading, data, error, refetchEditProfileUser: refetch });
};

export const editUserInfoPOST = (
  Constants,
  { company, gender, job_title, name, sexual_interest, user_city }
) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/{user_id}`, {
    body: JSON.stringify({
      name: name,
      gender: gender,
      sexual_interest: sexual_interest,
      job_title: job_title,
      company: company,
      user_city: user_city,
    }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useEditUserInfoPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => editUserInfoPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchEditUserInfoPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  company,
  gender,
  job_title,
  name,
  sexual_interest,
  user_city,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useEditUserInfoPOST(
    { company, gender, job_title, name, sexual_interest, user_city },
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

  return children({ loading, data, error, refetchEditUserInfo: refetch });
};

export const editUserSettingsPOST = (
  Constants,
  { distance_preference, maximum_age, minimum_age }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/settings/{user_id}`,
    {
      body: JSON.stringify({
        minimum_age: minimum_age,
        maximum_age: maximum_age,
        distance_preference: distance_preference,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useEditUserSettingsPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => editUserSettingsPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchEditUserSettingsPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  distance_preference,
  maximum_age,
  minimum_age,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useEditUserSettingsPOST(
    { distance_preference, maximum_age, minimum_age },
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

  return children({ loading, data, error, refetchEditUserSettings: refetch });
};

export const feedOneAtATimeGET = (Constants) =>
  StorageUtils.getAccessToken().then((token) =>
    fetch(
      `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/feed/{user_id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token ?? "",
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
      .catch(() => {})
  );

export const useFeedOneAtATimeGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => feedOneAtATimeGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchFeedOneAtATimeGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useFeedOneAtATimeGET(
    {},
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

  return children({ loading, data, error, refetchFeedOneAtATime: refetch });
};

export const getBothDDTeamsGET = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/both_double_dating_teams`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetBothDDTeamsGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["teams", args], () => getBothDDTeamsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetBothDDTeamsGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetBothDDTeamsGET(
    {},
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

  return children({ loading, data, error, refetchGetBothDDTeams: refetch });
};

export const getChatroomInfoGET = (Constants, { chatrooms_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/ably/chatrooms/${
      chatrooms_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetChatroomInfoGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(
    ["chatrooms", args],
    () => getChatroomInfoGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetChatroomInfoGET = ({
  children,
  onData = () => {},
  refetchInterval,
  chatrooms_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetChatroomInfoGET(
    { chatrooms_id },
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

  return children({ loading, data, error, refetchGetChatroomInfo: refetch });
};

export const getChatroomUserGET = (Constants, { chatroom_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/chatroom/${
      chatroom_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetChatroomUserGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => getChatroomUserGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchGetChatroomUserGET = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetChatroomUserGET(
    { chatroom_id },
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

  return children({ loading, data, error, refetchGetChatroomUser: refetch });
};

export const getDDBothLikesGET = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_both_likes/2/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetDDBothLikesGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["DDLikes", args], () => getDDBothLikesGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetDDBothLikesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetDDBothLikesGET(
    { double_dating_teams_id },
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

  return children({ loading, data, error, refetchGetDDBothLikes: refetch });
};

export const getDDMatchesGET = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/DDMatches/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetDDMatchesGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["DDMatches", args], () => getDDMatchesGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetDDMatchesGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetDDMatchesGET(
    { double_dating_teams_id },
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

  return children({ loading, data, error, refetchGetDDMatches: refetch });
};

export const getDDTeamsGET = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/DDteams/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetDDTeamsGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["teams", args], () => getDDTeamsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetDDTeamsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetDDTeamsGET(
    { double_dating_teams_id },
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

  return children({ loading, data, error, refetchGetDDTeams: refetch });
};

export const getImageGET = (Constants) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image/{user_id}`, {
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useGetImageGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => getImageGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchGetImageGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetImageGET(
    {},
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

  return children({ loading, data, error, refetchGetImage: refetch });
};

export const getLikesGET = (Constants) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/likes`, {
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useGetLikesGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["users", args], () => getLikesGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetLikesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetLikesGET(
    {},
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

  return children({ loading, data, error, refetchGetLikes: refetch });
};

export const getMatchGET = (Constants, { user_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/p/${user_id ?? ""}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetMatchGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => getMatchGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchGetMatchGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetMatchGET(
    { user_id },
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

  return children({ loading, data, error, refetchGetMatch: refetch });
};

export const getMatchesGET = (Constants) =>
  StorageUtils.getAccessToken().then((token) =>
    fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/matches`, {
      headers: {
        Accept: "application/json",
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Fetch error: " + res.status + " " + res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .catch(() => {})
  );

export const useGetMatchesGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["users", args], () => getMatchesGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetMatchesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetMatchesGET(
    {},
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

  return children({ loading, data, error, refetchGetMatches: refetch });
};

export const getOtherUserGET = (Constants, { user_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/other_user/${
      user_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetOtherUserGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => getOtherUserGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchGetOtherUserGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetOtherUserGET(
    { user_id },
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

  return children({ loading, data, error, refetchGetOtherUser: refetch });
};

export const getSingleDDTeamsRecordGET = (
  Constants,
  { double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetSingleDDTeamsRecordGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(
    ["double_dating_team", args],
    () => getSingleDDTeamsRecordGET(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(["double_dating_teams"]),
    }
  );
};

export const FetchGetSingleDDTeamsRecordGET = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetSingleDDTeamsRecordGET(
    { double_dating_teams_id },
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
    refetchGetSingleDDTeamsRecord: refetch,
  });
};

export const getSingleDDTeamsRecordByUserIdPOST = (Constants, args) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/userid/{double_dating_teams_id}`,
    {
      body: JSON.stringify(args),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch((error) => {
      console.log({ error });
    });

export const useGetSingleDDTeamsRecordByUserIdPOST = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(
    ["double_dating_team", args],
    () => getSingleDDTeamsRecordByUserIdPOST(Constants, args),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(["double_dating_teams"]),
    }
  );
};

export const FetchGetSingleDDTeamsRecordByUserIdPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  user2_id,
  user_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useGetSingleDDTeamsRecordByUserIdPOST(
      { user2_id, user_id },
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
    refetchGetSingleDDTeamsRecord: refetch,
  });
};

export const getSingleItemGET = (Constants, { authToken }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/{user_id}`, {
    headers: {
      Accept: "application/json",
      Authorization:
        authToken && authToken !== ""
          ? authToken
          : Constants["AUTHORIZATION_HEADER"],
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useGetSingleItemGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  const queryClient = useQueryClient();
  return useQuery(["user", args], () => getSingleItemGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const FetchGetSingleItemGET = ({
  children,
  onData = () => {},
  authToken,
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetSingleItemGET(
    { authToken },
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

  return children({ loading, data, error, refetchGetSingleItem: refetch });
};
export const getAllChatsGET = (Constants, { chatroom_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/chats/ably/${
      chatroom_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useGetAllChatsGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["chats", args], () => getAllChatsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetAllChatsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetAllChatsGET(
    { chatroom_id },
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

  return children({ loading, data, error, refetchGetAllChats: refetch });
};

export const iDVerificationGetURLPOST = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/IDVerification/{user_id}`,
    {
      body: JSON.stringify({ key: "value" }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useIDVerificationGetURLPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => iDVerificationGetURLPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchIDVerificationGetURLPOST = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useIDVerificationGetURLPOST({}, { refetchInterval });

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
    refetchIDVerificationGetURL: refetch,
  });
};

export const likeDDTeamPOST = (
  Constants,
  { double_dating_teams2_id, double_dating_teams_id, user_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_likes/{double_dating_likes_id}`,
    {
      body: JSON.stringify({
        user_id: user_id,
        double_dating_teams_id: double_dating_teams_id,
        double_dating_teams2_id: double_dating_teams2_id,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useLikeDDTeamPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => likeDDTeamPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchLikeDDTeamPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams2_id,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useLikeDDTeamPOST(
    { double_dating_teams2_id, double_dating_teams_id },
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

  return children({ loading, data, error, refetchLikeDDTeam: refetch });
};

export const likeAUserPOST = (Constants, { user2_id }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/likes/{likes_id}`, {
    body: JSON.stringify({ user2_id: user2_id }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useLikeAUserPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => likeAUserPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("likes", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("like");
        queryClient.invalidateQueries("likes");
      },
    }
  );
};

export const FetchLikeAUserPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  user2_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useLikeAUserPOST({ user2_id }, { refetchInterval });

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

  return children({ loading, data, error, refetchLikeAUser: refetch });
};

export const pendingTeamsCountGET = (Constants) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/pending/count`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const usePendingTeamsCountGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(
    ["DDteams", args],
    () => pendingTeamsCountGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchPendingTeamsCountGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = usePendingTeamsCountGET(
    {},
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

  return children({ loading, data, error, refetchPendingTeamsCount: refetch });
};

export const populateFeedGET = (Constants) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user`, {
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const usePopulateFeedGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["users", args], () => populateFeedGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchPopulateFeedGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = usePopulateFeedGET(
    {},
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

  return children({ loading, data, error, refetchPopulateFeed: refetch });
};

export const postChatPOST = (Constants, { chatroom_id, message }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/chat`, {
    body: JSON.stringify({ chatroom_id: chatroom_id, message: message }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const usePostChatPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => postChatPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("messages", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("message");
        queryClient.invalidateQueries("messages");
      },
    }
  );
};

export const FetchPostChatPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
  message,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = usePostChatPOST({ chatroom_id, message }, { refetchInterval });

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

  return children({ loading, data, error, refetchPostChat: refetch });
};

export const postImage2POST = (Constants, { profilePic2 }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image2/{user_id}`,
    {
      body: JSON.stringify({ image2: profilePic2 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const usePostImage2POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => postImage2POST(Constants, { ...initialArgs, ...args }),
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

export const FetchPostImage2POST = ({
  children,
  onData = () => {},
  refetchInterval,
  profilePic2,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = usePostImage2POST({ profilePic2 }, { refetchInterval });

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

  return children({ loading, data, error, refetchPostImage2: refetch });
};

export const postUserCityPOST = (Constants, { user_city }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/city/{user_id}`, {
    body: JSON.stringify({ user_city: user_city }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const usePostUserCityPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => postUserCityPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchPostUserCityPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  user_city,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = usePostUserCityPOST({ user_city }, { refetchInterval });

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

  return children({ loading, data, error, refetchPostUserCity: refetch });
};

export const postUserLocationPOST = (Constants, { lat, long }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/location/{user_id}`,
    {
      body: JSON.stringify({ location: { lat: lat, lng: long } }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const usePostUserLocationPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => postUserLocationPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchPostUserLocationPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  lat,
  long,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = usePostUserLocationPOST({ lat, long }, { refetchInterval });

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

  return children({ loading, data, error, refetchPostUserLocation: refetch });
};

export const profilePic3POST = (Constants, { ProfilePic3 }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image3/{user_id}`,
    {
      body: JSON.stringify({ image: ProfilePic3 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useProfilePic3POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => profilePic3POST(Constants, { ...initialArgs, ...args }),
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

export const FetchProfilePic3POST = ({
  children,
  onData = () => {},
  refetchInterval,
  ProfilePic3,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useProfilePic3POST({ ProfilePic3 }, { refetchInterval });

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

  return children({ loading, data, error, refetchProfilePic3: refetch });
};

export const profilePic4POST = (Constants, { profilePic4 }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image4/{user_id}`,
    {
      body: JSON.stringify({ image: profilePic4 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useProfilePic4POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => profilePic4POST(Constants, { ...initialArgs, ...args }),
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

export const FetchProfilePic4POST = ({
  children,
  onData = () => {},
  refetchInterval,
  profilePic4,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useProfilePic4POST({ profilePic4 }, { refetchInterval });

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

  return children({ loading, data, error, refetchProfilePic4: refetch });
};

export const profilePic5POST = (Constants, { profilePic5 }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image5/{user_id}`,
    {
      body: JSON.stringify({ image: profilePic5 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useProfilePic5POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => profilePic5POST(Constants, { ...initialArgs, ...args }),
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

export const FetchProfilePic5POST = ({
  children,
  onData = () => {},
  refetchInterval,
  profilePic5,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useProfilePic5POST({ profilePic5 }, { refetchInterval });

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

  return children({ loading, data, error, refetchProfilePic5: refetch });
};

export const profilePic6POST = (Constants, { profilePic6 }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image6/{user_id}`,
    {
      body: JSON.stringify({ image: profilePic6 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useProfilePic6POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => profilePic6POST(Constants, { ...initialArgs, ...args }),
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

export const FetchProfilePic6POST = ({
  children,
  onData = () => {},
  refetchInterval,
  profilePic6,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useProfilePic6POST({ profilePic6 }, { refetchInterval });

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

  return children({ loading, data, error, refetchProfilePic6: refetch });
};

export const promptsGET = (Constants) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/prompts`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const usePromptsGET = (args, { refetchInterval } = {}) => {
  const Constants = useAuthorizationToken();
  return useQuery(["prompts", args], () => promptsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchPromptsGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = usePromptsGET(
    {},
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

  return children({ loading, data, error, refetchPrompts: refetch });
};

export const sendChatPOST = (Constants, { chatroom_id, message }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/chats/ably`, {
    body: JSON.stringify({ chatroom_id: chatroom_id, message: message }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useSendChatPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => sendChatPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("chat", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("chat");
        queryClient.invalidateQueries("chats");
      },
    }
  );
};

export const FetchSendChatPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
  message,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useSendChatPOST({ chatroom_id, message }, { refetchInterval });

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

  return children({ loading, data, error, refetchSendChat: refetch });
};

export const updateContactsPOST = (Constants, { user_contacts }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/contacts/{user_id}`,
    {
      body: JSON.stringify({ contacts: user_contacts }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useUpdateContactsPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => updateContactsPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchUpdateContactsPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  user_contacts,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useUpdateContactsPOST({ user_contacts }, { refetchInterval });

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

  return children({ loading, data, error, refetchUpdateContacts: refetch });
};

export const updatePromptsPOST = (
  Constants,
  {
    prompt1,
    prompt1_response,
    prompt2,
    prompt2_response,
    prompt3,
    prompt3_response,
  }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/prompts/{user_id}`,
    {
      body: JSON.stringify({
        prompt1: prompt1,
        prompt2: prompt2,
        prompt3: prompt3,
        prompt1_response: prompt1_response,
        prompt2_response: prompt2_response,
        prompt3_response: prompt3_response,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useUpdatePromptsPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => updatePromptsPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchUpdatePromptsPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  prompt1,
  prompt1_response,
  prompt2,
  prompt2_response,
  prompt3,
  prompt3_response,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useUpdatePromptsPOST(
    {
      prompt1,
      prompt1_response,
      prompt2,
      prompt2_response,
      prompt3,
      prompt3_response,
    },
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

  return children({ loading, data, error, refetchUpdatePrompts: refetch });
};

export const updateUserSubscriptionPOST = (Constants, { subscription }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/subscription/{user_id}`,
    {
      body: JSON.stringify({ subscription: subscription }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useUpdateUserSubscriptionPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) =>
      updateUserSubscriptionPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchUpdateUserSubscriptionPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  subscription,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useUpdateUserSubscriptionPOST({ subscription }, { refetchInterval });

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
    refetchUpdateUserSubscription: refetch,
  });
};

export const uploadDDPhotosPOST = (
  Constants,
  { double_dating_teams_id, group_photo_1 }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
        group_photo_1: group_photo_1,
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useUploadDDPhotosPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => uploadDDPhotosPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchUploadDDPhotosPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
  group_pic_1,
  group_pic_2,
  group_pic_3,
  group_pic_4,
  group_pic_5,
  group_pic_6,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useUploadDDPhotosPOST(
    {
      double_dating_teams_id,
      group_pic_1,
      group_pic_2,
      group_pic_3,
      group_pic_4,
      group_pic_5,
      group_pic_6,
    },
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

  return children({ loading, data, error, refetchUploadDDPhotos: refetch });
};

export const DDGroupPic2POST = (
  Constants,
  { group_photo_2, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/group_photo_2/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ group_photo_2 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDGroupPic2POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDGroupPic2POST(Constants, { ...initialArgs, ...args }),
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

export const DDGroupPic3POST = (
  Constants,
  { group_photo_3, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/group_photo_3/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ group_photo_3 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDGroupPic3POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDGroupPic3POST(Constants, { ...initialArgs, ...args }),
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

export const DDGroupPic4POST = (
  Constants,
  { group_photo_4, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/group_photo_4/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ group_photo_4 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDGroupPic4POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDGroupPic4POST(Constants, { ...initialArgs, ...args }),
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

export const DDGroupPic5POST = (
  Constants,
  { group_photo_5, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/group_photo_5/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ group_photo_5 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDGroupPic5POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDGroupPic5POST(Constants, { ...initialArgs, ...args }),
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

export const DDGroupPic6POST = (
  Constants,
  { group_photo_6, double_dating_teams_id }
) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/group_photo_6/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({ group_photo_6 }),
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "POST",
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

export const useDDGroupPic6POST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => DDGroupPic6POST(Constants, { ...initialArgs, ...args }),
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

export const uploadFeaturedPhotoPOST = (Constants, { featured_photo }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/user/image/{user_id}`, {
    body: JSON.stringify({ featured_photo: featured_photo }),
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useUploadFeaturedPhotoPOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => uploadFeaturedPhotoPOST(Constants, { ...initialArgs, ...args }),
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

export const FetchUploadFeaturedPhotoPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  featured_photo,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useUploadFeaturedPhotoPOST({ featured_photo }, { refetchInterval });

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
    refetchUploadFeaturedPhoto: refetch,
  });
};

export const createDDTeams = (Constants) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams`, {
    headers: {
      Accept: "application/json",
      Authorization: Constants["AUTHORIZATION_HEADER"],
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

export const useCreateDDTeams = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => createDDTeams(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchCreateDDTeams = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateDDTeams({}, { refetchInterval });

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
    refetchCreateDDTeams: refetch,
  });
};

export const dDAcceptInvitePOST = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/accept_invite/${
      double_dating_teams_id ?? ""
    }`,
    {
      body: JSON.stringify({
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
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useDDAcceptInvitePOST = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => dDAcceptInvitePOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};

export const FetchDDAcceptInvitePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  double_dating_teams_id,
}) => {
  const Constants = useAuthorizationToken();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useDDAcceptInvitePOST({ double_dating_teams_id }, { refetchInterval });

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
    refetchDDAcceptInvitePOST: refetch,
  });
};

export const deleteDDTeamDenyInvite = (Constants, { double_dating_teams_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:bxqnEhYE/double_dating_teams/deny_invite/${
      double_dating_teams_id ?? ""
    }`,
    {
      headers: {
        Accept: "application/json",
        Authorization: Constants["AUTHORIZATION_HEADER"],
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  )
    .then((res) => {
      console.log("deleteDDTeamDenyInvite", deleteDDTeamDenyInvite);
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useDeleteDDTeamDenyInvite = (initialArgs) => {
  const queryClient = useQueryClient();
  const Constants = useAuthorizationToken();

  return useMutation(
    (args) => deleteDDTeamDenyInvite(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData("DDteam", previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("DDteam");
        queryClient.invalidateQueries("DDteams");
      },
    }
  );
};
