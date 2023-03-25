import React from "react";
import * as Animatable from 'react-native-animatable';

//** create any animated component */
export function withAnimated(
  WrappedComponent,
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animatable.createAnimatableComponent(WithAnimated);
}


