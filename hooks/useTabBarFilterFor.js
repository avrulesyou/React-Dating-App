import { useLayoutEffect } from "react";
import {
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const useTabBarFilterFor = (screens) => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({ tabBarVisible: !screens.includes(routeName) });
  }, [navigation, route]);
};

export default useTabBarFilterFor;
