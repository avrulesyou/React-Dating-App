import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const addChatPOST = (Constants, { chatroom_id, message }) =>
  fetch(`https://xwc1-ybn5-mhef.n7.xano.io/api:cQwb1cep/chat`, {
    body: JSON.stringify({ chatroom_id: chatroom_id, message: message }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useAddChatPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => addChatPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('chat', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('chat');
        queryClient.invalidateQueries('chats');
      },
    }
  );
};

export const FetchAddChatPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
  message,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddChatPOST({ chatroom_id, message }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchAddChat: refetch });
};

export const getChatroomGET = (Constants, { chatrooms_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:cQwb1cep/chatrooms/${
      chatrooms_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGetChatroomGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['chatroom', args], () => getChatroomGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['chatrooms']),
  });
};

export const FetchGetChatroomGET = ({
  children,
  onData = () => {},
  refetchInterval,
  chatrooms_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetChatroomGET(
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
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchGetChatroom: refetch });
};

export const getChatsGET = (Constants, { chatroom_id }) =>
  fetch(
    `https://xwc1-ybn5-mhef.n7.xano.io/api:cQwb1cep/chat/chatroom/${
      chatroom_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const useGetChatsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['chats', args], () => getChatsGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetChatsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  chatroom_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetChatsGET(
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
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchGetChats: refetch });
};
