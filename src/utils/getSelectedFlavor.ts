import { Flavor } from '../redux/markdownSlice';

export const getSelectedFlavor = (flavors: Flavor[]): Flavor => {
  return flavors.filter(flavor => flavor.selected)[0];
};
