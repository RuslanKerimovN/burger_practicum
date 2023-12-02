import type { Middleware } from 'redux';
import { RootState } from '../../store/store.ts';
import { IwsActionTypes } from '../../types/types.ts';

export const socketMiddleware = (wsActions: IwsActionTypes): Middleware<object, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;
    let url: string = '';

    return (next) => (action)  => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsSendMessage,
        wsDisconnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage
      } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnecting());
          dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedDate = JSON.parse(data);
          dispatch(onMessage(parsedDate));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(`${event.code}`));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsSendMessage?.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }
      next(action);
    };
  });
};
