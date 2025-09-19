import { createStaticNavigation } from '@react-navigation/native';

import { navigationRef, Stack } from './rootNavigation';

//export const navigationRef = createNavigationContainerRef(); // För att min footer ska fungera på alla screens

const Navigation = createStaticNavigation(Stack);

export default function App() {

  return (<Navigation ref={navigationRef} />)
}


