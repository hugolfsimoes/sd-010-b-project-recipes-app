import { LINK, START_RECIPE } from './index';

export const startRecipe = (boolean) => ({
  type: START_RECIPE, isStart: boolean });

export const isLink = (boolean) => ({
  type: LINK, link: boolean });
